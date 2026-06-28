// ============================================================
//  app.js — Japan 2026. coords.js + trip.js + config.js first.
//  <body data-page="index|city" data-city="...">
// ============================================================
(function () {
  "use strict";
  var TRIP = window.TRIP;
  var KEY = window.GOOGLE_MAPS_API_KEY;
  var HAS_KEY = !!KEY && KEY !== "YOUR_MAPS_JS_API_KEY_HERE";

  var KIND_EMOJI = {
    sight: "⛩", eat: "🍜", coffee: "☕", bar: "🍸", stay: "🏨",
    transit: "🚄", activity: "🎟", shop: "🛍",
  };
  var LEVEL = { now: "BOOK NOW", soon: "BOOK SOON", before: "BEFORE YOU FLY" };

  // dark Google Maps style — neon-night vibe
  var MAP_STYLE = [
    { elementType: "geometry", stylers: [{ color: "#10121a" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#10121a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8a8fa3" }] },
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#16231c" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#222533" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "road.highline", elementType: "geometry", stylers: [{ color: "#2a2e40" }] },
    { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a0c12" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2a2e40" }] },
  ];

  var MAPS_TO_INIT = [];

  function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; }
  function enc(s) { return encodeURIComponent(s); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function mapsSearch(q) { return "https://www.google.com/maps/search/?api=1&query=" + enc(q); }
  function cityById(id) { return TRIP.cities.filter(function (c) { return c.id === id; })[0]; }

  // ---- Maps -------------------------------------------------
  function renderMap(canvas, stops, accent, link) {
    var pts = stops.filter(function (s) { return s.lat && s.lng; });
    if (!pts.length) { canvas.innerHTML = '<div class="map__notice">no map points</div>'; return; }
    var map = new google.maps.Map(canvas, {
      mapTypeControl: false, streetViewControl: false, fullscreenControl: true,
      gestureHandling: "cooperative", backgroundColor: "#10121a", styles: MAP_STYLE,
    });
    var b = new google.maps.LatLngBounds();
    pts.forEach(function (s, i) {
      var pos = { lat: s.lat, lng: s.lng };
      var m = new google.maps.Marker({
        position: pos, map: map, title: (i + 1) + ". " + s.name,
        label: { text: String(i + 1), color: "#0a0c12", fontFamily: "sans-serif", fontWeight: "700", fontSize: "12px" },
        icon: { path: google.maps.SymbolPath.CIRCLE, scale: 13, fillColor: accent, fillOpacity: 1, strokeColor: "#0a0c12", strokeWeight: 2 },
      });
      var href = (link && s.cityId) ? s.cityId + ".html" : mapsSearch(s.q || s.name);
      var iw = new google.maps.InfoWindow({ content: '<div style="font:700 14px system-ui;color:#111;margin-bottom:4px">' + (i + 1) + ". " + esc(s.name) + '</div><a href="' + href + '"' + (link && s.cityId ? "" : ' target="_blank" rel="noopener"') + ' style="font:700 12px monospace;color:#c81d6b">' + (link && s.cityId ? "Open page →" : "Open in Maps ↗") + "</a>" });
      m.addListener("click", function () { if (link && s.cityId) window.location.href = s.cityId + ".html"; else iw.open(map, m); });
      b.extend(pos);
    });
    if (pts.length > 1) map.fitBounds(b, 56); else { map.setCenter(pts[0]); map.setZoom(13); }
  }

  function mapBlock(stops, accent, opts) {
    opts = opts || {};
    var wrap = el("div", "map");
    if (!HAS_KEY) wrap.appendChild(el("div", "map__notice", "🔑 Add your Maps JavaScript API key to <code>config.js</code>"));
    else { var c = el("div", "map__canvas"); wrap.appendChild(c); MAPS_TO_INIT.push({ canvas: c, stops: stops, accent: accent, link: !!opts.linkToCity }); }
    if (opts.legend && stops.length > 1) {
      var lg = el("div", "map__legend");
      stops.forEach(function (s, i) {
        var a = el("a", "map__legend-item", "<b>" + (i + 1) + "</b> " + esc(s.name));
        a.href = (opts.linkToCity && s.cityId) ? s.cityId + ".html" : mapsSearch(s.q || s.name);
        if (!(opts.linkToCity && s.cityId)) { a.target = "_blank"; a.rel = "noopener"; }
        lg.appendChild(a);
      });
      wrap.appendChild(lg);
    }
    return wrap;
  }

  function loadMaps() {
    if (!HAS_KEY || !MAPS_TO_INIT.length) return;
    window.__initJP = function () { MAPS_TO_INIT.forEach(function (m) { try { renderMap(m.canvas, m.stops, m.accent, m.link); } catch (e) { m.canvas.innerHTML = '<div class="map__notice">map failed</div>'; } }); };
    var s = document.createElement("script");
    s.src = "https://maps.googleapis.com/maps/api/js?key=" + enc(KEY) + "&callback=__initJP&v=weekly&loading=async";
    s.async = true;
    s.onerror = function () { MAPS_TO_INIT.forEach(function (m) { m.canvas.innerHTML = '<div class="map__notice">Couldn\'t load Google Maps — check the key &amp; Maps JavaScript API.</div>'; }); };
    document.head.appendChild(s);
  }

  // ---- Pieces -----------------------------------------------
  function topnav(currentId) {
    var nav = el("nav", "topnav");
    var home = el("a", "topnav__home" + (currentId ? "" : " is-active"), "日本 HOME");
    home.href = "index.html"; nav.appendChild(home);
    TRIP.cities.forEach(function (c) {
      var a = el("a", "topnav__chip" + (c.id === currentId ? " is-active" : ""), c.flag + " " + esc(c.name));
      a.href = c.id + ".html"; a.style.setProperty("--accent", c.accent); nav.appendChild(a);
    });
    return nav;
  }

  function card(c) {
    var href = c.url || mapsSearch(c.query || c.name);
    var a = el("a", "card"); a.href = href; a.target = "_blank"; a.rel = "noopener";
    var top = el("div", "card__top");
    top.appendChild(el("div", "card__kind", KIND_EMOJI[c.kind] || "📍"));
    top.appendChild(el("div", "card__name", esc(c.name)));
    a.appendChild(top);
    if (c.blurb) a.appendChild(el("div", "card__blurb", esc(c.blurb)));
    if (c.tags && c.tags.length) { var t = el("div", "card__tags"); c.tags.forEach(function (x) { t.appendChild(el("span", "card__tag", esc(x))); }); a.appendChild(t); }
    var go = c.url ? (/airbnb/.test(c.url) ? "Airbnb" : /booking\.com/.test(c.url) ? "Booking" : /klook/.test(c.url) ? "Klook" : "Open link") : "Maps";
    a.appendChild(el("div", "card__go", go + " ↗"));
    return a;
  }

  function cardsGrid(list) { var g = el("div", "cards"); list.forEach(function (c) { g.appendChild(card(c)); }); return g; }

  function footer() {
    var f = el("footer", "footer");
    f.appendChild(el("p", "footer__big", "また ね ✦ SEE YOU IN JAPAN"));
    f.appendChild(el("p", "footer__small", TRIP.notionUrl ? 'James + wife · Nov 2026 · <a href="' + TRIP.notionUrl + '" target="_blank" rel="noopener">full plan ↗</a>' : "James + wife · Nov 2026"));
    return f;
  }

  // ---- Index ------------------------------------------------
  function buildIndex(app) {
    app.appendChild(topnav(null));
    var hero = el("header", "hero reveal");
    hero.appendChild(el("div", "hero__jp", esc(TRIP.titleJp)));
    hero.appendChild(el("h1", "hero__title", esc(TRIP.title)));
    hero.appendChild(el("p", "hero__kicker", esc(TRIP.subtitle)));
    hero.appendChild(el("p", "hero__dates", esc(TRIP.dateRange)));
    hero.appendChild(el("p", "hero__summary", esc(TRIP.summary)));
    app.appendChild(hero);

    // book ahead
    var ba = el("section", "section reveal");
    ba.appendChild(el("h2", "section__title", "⚡ Book Ahead"));
    var bag = el("div", "ba-grid");
    TRIP.bookAhead.forEach(function (b) {
      var d = el("div", "ba ba--" + b.level);
      d.appendChild(el("div", "ba__level", LEVEL[b.level] || ""));
      d.appendChild(el("div", "ba__name", esc(b.name)));
      d.appendChild(el("div", "ba__note", esc(b.note)));
      bag.appendChild(d);
    });
    ba.appendChild(bag); app.appendChild(ba);

    // map
    var ms = el("section", "section reveal");
    ms.appendChild(el("h2", "section__title", "🗺️ The Map"));
    var stops = ["tokyo", "kyoto", "hakone"].map(function (id) {
      var co = (window.COORDS || {})["city_" + id] || {}; var c = cityById(id);
      return { name: c.name, lat: co.lat, lng: co.lng, cityId: id, q: c.name };
    });
    ms.appendChild(mapBlock(stops, "#ff2d95", { legend: true, linkToCity: true }));
    app.appendChild(ms);

    // timeline
    var tl = el("section", "section reveal");
    tl.appendChild(el("h2", "section__title", "📅 Day by Day"));
    var box = el("div", "timeline");
    TRIP.timeline.forEach(function (t) {
      var ci = cityById(t.city); var r = el("a", "tl-row"); r.href = t.city + ".html";
      if (ci) r.style.setProperty("--accent", ci.accent);
      r.appendChild(el("span", "tl-date", esc(t.date)));
      r.appendChild(el("span", "tl-text", esc(t.text)));
      r.appendChild(el("span", "tl-flag", ci ? ci.flag : ""));
      box.appendChild(r);
    });
    tl.appendChild(box); app.appendChild(tl);

    // city grid
    var cs = el("section", "section reveal");
    cs.appendChild(el("h2", "section__title", "📖 The Legs"));
    var grid = el("div", "city-grid");
    TRIP.cities.forEach(function (c) {
      var a = el("a", "city-card"); a.href = c.id + ".html"; a.style.setProperty("--accent", c.accent);
      a.appendChild(el("div", "city-card__flag", c.flag));
      a.appendChild(el("div", "city-card__jp", esc(c.jp || "")));
      a.appendChild(el("div", "city-card__name", esc(c.name)));
      a.appendChild(el("div", "city-card__meta", esc(c.dates) + (c.nights ? " · " + c.nights + (c.nights === 1 ? " night" : " nights") : "")));
      a.appendChild(el("div", "city-card__blurb", esc(c.blurb)));
      a.appendChild(el("div", "city-card__go", "Open →"));
      grid.appendChild(a);
    });
    cs.appendChild(grid); app.appendChild(cs);
    app.appendChild(footer());
  }

  // ---- City -------------------------------------------------
  function buildCity(app, city) {
    app.appendChild(topnav(city.id));
    app.style.setProperty("--accent", city.accent);
    var hero = el("header", "hero hero--city reveal");
    hero.style.setProperty("--accent", city.accent);
    hero.appendChild(el("div", "hero__jp", esc(city.jp || "")));
    hero.appendChild(el("p", "hero__kicker", city.flag + " " + esc(city.dates)));
    hero.appendChild(el("h1", "hero__title", esc(city.name)));
    hero.appendChild(el("p", "hero__summary", esc(city.blurb)));
    if (city.currency) hero.appendChild(el("p", "hero__cur", "💱 " + esc(city.currency)));
    app.appendChild(hero);

    if (city.map) {
      var ms = el("section", "section reveal");
      ms.appendChild(el("h2", "section__title", "🗺️ The Map"));
      ms.appendChild(mapBlock(city.map.stops, city.accent, { legend: true }));
      app.appendChild(ms);
    }

    if (city.days) {
      var ds = el("section", "section reveal");
      ds.appendChild(el("h2", "section__title", "🗓️ Day by Day"));
      city.days.forEach(function (d) {
        if (d.bridge) {
          var br = el("a", "bridge"); br.href = d.bridge.to + ".html";
          br.appendChild(el("span", "bridge__text", esc(d.bridge.text)));
          ds.appendChild(br); return;
        }
        var blk = el("div", "day");
        var head = el("div", "day__head");
        head.appendChild(el("span", "day__date", esc(d.date)));
        if (d.area) head.appendChild(el("span", "day__area", esc(d.area)));
        blk.appendChild(head);
        if (d.note) blk.appendChild(el("p", "day__note", esc(d.note)));
        if (d.cards && d.cards.length) blk.appendChild(cardsGrid(d.cards));
        ds.appendChild(blk);
      });
      app.appendChild(ds);
    }

    (city.sections || []).forEach(function (sec) {
      var s = el("section", "section reveal");
      s.appendChild(el("h2", "section__title", (sec.icon ? sec.icon + " " : "") + esc(sec.title)));
      s.appendChild(cardsGrid(sec.cards));
      app.appendChild(s);
    });

    if (city.tipNote) { var tn = el("p", "tipnote reveal", "💡 " + esc(city.tipNote)); app.appendChild(tn); }

    // prev / next
    var idx = TRIP.cities.indexOf(city);
    var pn = el("div", "prevnext");
    if (idx > 0) { var p = el("a", "prevnext__a", "← " + TRIP.cities[idx - 1].flag + " " + esc(TRIP.cities[idx - 1].name)); p.href = TRIP.cities[idx - 1].id + ".html"; pn.appendChild(p); } else pn.appendChild(el("span"));
    if (idx < TRIP.cities.length - 1) { var n = el("a", "prevnext__a prevnext__a--next", esc(TRIP.cities[idx + 1].name) + " " + TRIP.cities[idx + 1].flag + " →"); n.href = TRIP.cities[idx + 1].id + ".html"; pn.appendChild(n); }
    app.appendChild(pn);
    app.appendChild(footer());
  }

  function wireReveals() {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });
  }

  function init() {
    var app = document.getElementById("app");
    if (document.body.dataset.page === "city") {
      var c = cityById(document.body.dataset.city);
      if (c) { document.title = c.name + " · Japan 2026"; buildCity(app, c); }
    } else { document.title = "Japan 2026 · Nov 19 – Dec 4"; buildIndex(app); }
    wireReveals(); loadMaps();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
