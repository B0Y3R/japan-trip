// ============================================================
//  app.js — Japan 2026. coords.js + trip.js + config.js first.
//  <body data-page="index|city" data-city="...">
// ============================================================
(function () {
  "use strict";
  var TRIP = window.TRIP;
  var KEY = window.GOOGLE_MAPS_API_KEY;
  var HAS_KEY = !!KEY && KEY !== "YOUR_MAPS_JS_API_KEY_HERE";

  // kind -> [big background kanji, small category label]
  var KIND = {
    eat: ["食", "Eat"], bar: ["酒", "Drink"], drink: ["酒", "Drink"], coffee: ["珈", "Coffee"],
    stay: ["宿", "Stay"], sight: ["観", "See"], transit: ["駅", "Transit"],
    activity: ["遊", "Do"], shop: ["買", "Shop"],
  };
  var LEVEL = { now: "BOOK NOW", soon: "BOOK SOON", before: "BEFORE YOU FLY" };

  var DARK_MAP_STYLE = [
    { elementType: "geometry", stylers: [{ color: "#10121a" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#10121a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8a8fa3" }] },
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#16231c" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#222533" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a0c12" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2a2e40" }] },
  ];
  var LIGHT_MAP_STYLE = [
    { elementType: "geometry", stylers: [{ color: "#f1ece0" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#7a7263" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f6f1e6" }] },
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d8e2c4" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#bcd4dd" }] },
  ];

  // Theme registry: map mode + per-city accent palette. CSS lives in /themes.
  var THEMES = {
    sumi:   { label: "Sumi-e", map: "light", def: "#c4382b", accents: { tokyo: "#c4382b", kyoto: "#4f6f54", hakone: "#7a5a44", logistics: "#6b6357" } },
    koyo:   { label: "Kōyō",   map: "light", def: "#b3402a", accents: { tokyo: "#b3402a", kyoto: "#c8741f", hakone: "#9a6b2e", logistics: "#6b7a3a" } },
    indigo: { label: "Ai",     map: "light", def: "#20407a", accents: { tokyo: "#20407a", kyoto: "#2f6f5e", hakone: "#5b4a8f", logistics: "#7a6a3a" } },
    neon:   { label: "Neon",   map: "dark",  def: "#ff2d95", accents: { tokyo: "#ff2d95", kyoto: "#19e3ff", hakone: "#b96bff", logistics: "#9dff3c" } },
  };
  var THEME_ORDER = ["sumi", "koyo", "indigo", "neon"];
  var DEFAULT_THEME = "sumi";
  var THEME = (function () {
    try { var t = localStorage.getItem("jp-theme"); if (t && THEMES[t]) return t; } catch (e) {}
    return DEFAULT_THEME;
  })();
  var CARD_STYLES = { burst: "Burst", tilt: "Tilt", minimal: "Minimal" };
  var CARD_ORDER = ["burst", "tilt", "minimal"];
  var CARDS = (function () {
    try { var c = localStorage.getItem("jp-cards"); if (c && CARD_STYLES[c]) return c; } catch (e) {}
    return "burst";
  })();
  var ACCENTS = THEMES[THEME].accents;
  var ACCENT_DEFAULT = THEMES[THEME].def;
  var MAP_STYLE = THEMES[THEME].map === "dark" ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;
  function accentOf(id) { return ACCENTS[id] || ACCENT_DEFAULT; }

  var MAPS_TO_INIT = [];

  function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; }
  function enc(s) { return encodeURIComponent(s); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function mapsSearch(q) { return "https://www.google.com/maps/search/?api=1&query=" + enc(q); }
  function cityById(id) { return TRIP.cities.filter(function (c) { return c.id === id; })[0]; }

  // ---- Done-tracking (per itinerary item, saved in localStorage) ----
  var DONE = (function () { try { return JSON.parse(localStorage.getItem("jp-done") || "{}"); } catch (e) { return {}; } })();
  function saveDone() { try { localStorage.setItem("jp-done", JSON.stringify(DONE)); } catch (e) {} }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 44); }
  function doneIdFor(cityId, date, name) { return cityId + "|" + slug(date) + "|" + slug(name); }
  function dayProgress(dayEl) {
    var total = dayEl.querySelectorAll("[data-done-id]").length;
    var done = dayEl.querySelectorAll("[data-done-id].is-done").length;
    var chip = dayEl.querySelector(".day__progress");
    if (!chip) return;
    chip.textContent = done + " / " + total + " done";
    chip.classList.toggle("is-complete", total > 0 && done === total);
  }

  // Day items grouped into glanceable subsections.
  var DAY_GROUPS = [
    { title: "Activities", kinds: ["sight", "activity", "transit"] },
    { title: "Shop", kinds: ["shop"] },
    { title: "Food", kinds: ["eat", "coffee"] },
    { title: "Bars", kinds: ["bar", "drink"] },
  ];

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
      a.href = c.id + ".html"; a.style.setProperty("--accent", accentOf(c.id)); nav.appendChild(a);
    });
    return nav;
  }

  function card(c, doneId) {
    var k = KIND[c.kind] || ["・", ""];
    var href = c.url || mapsSearch(c.query || c.name);
    var a = el("a", "card"); a.href = href; a.target = "_blank"; a.rel = "noopener";
    a.appendChild(el("span", "card__kanji", k[0]));
    if (doneId) {
      a.setAttribute("data-done-id", doneId);
      if (DONE[doneId]) a.className = "card is-done";
      var btn = el("button", "card__done", "✓"); btn.type = "button"; btn.setAttribute("aria-label", "Mark done");
      btn.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        var on = !a.classList.contains("is-done");
        a.classList.toggle("is-done", on);
        if (on) DONE[doneId] = 1; else delete DONE[doneId];
        saveDone();
        var day = a.closest ? a.closest(".day") : null; if (day) dayProgress(day);
      });
      a.appendChild(btn);
    }
    if (k[1]) a.appendChild(el("div", "card__cat", k[1]));
    a.appendChild(el("div", "card__name", esc(c.name)));
    if (c.blurb) a.appendChild(el("div", "card__blurb", esc(c.blurb)));
    if (c.tags && c.tags.length) { var t = el("div", "card__tags"); c.tags.forEach(function (x) { t.appendChild(el("span", "card__tag", esc(x))); }); a.appendChild(t); }
    var go = c.url ? (/airbnb/.test(c.url) ? "Airbnb" : /booking\.com/.test(c.url) ? "Booking" : /klook/.test(c.url) ? "Klook" : "Open link") : "Maps";
    a.appendChild(el("div", "card__go", go + " ↗"));
    return a;
  }

  function cardsGrid(list) { var g = el("div", "cards"); list.forEach(function (c) { g.appendChild(card(c)); }); return g; }

  // Compact list row for day-by-day itinerary items.
  function listItem(c, doneId) {
    var href = c.url || mapsSearch(c.query || c.name);
    var a = el("a", "ditem"); a.href = href; a.target = "_blank"; a.rel = "noopener";
    if (doneId) {
      a.setAttribute("data-done-id", doneId);
      if (DONE[doneId]) a.className = "ditem is-done";
      var btn = el("button", "ditem__check", "✓"); btn.type = "button"; btn.setAttribute("aria-label", "Mark done");
      btn.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        var on = !a.classList.contains("is-done");
        a.classList.toggle("is-done", on);
        if (on) DONE[doneId] = 1; else delete DONE[doneId];
        saveDone();
        var day = a.closest ? a.closest(".day") : null; if (day) dayProgress(day);
      });
      a.appendChild(btn);
    }
    var body = el("div", "ditem__body");
    var line = el("div", "ditem__line");
    line.appendChild(el("span", "ditem__name", esc(c.name)));
    if (c.tags && c.tags.length) c.tags.forEach(function (t) { line.appendChild(el("span", "ditem__tag", esc(t))); });
    body.appendChild(line);
    if (c.blurb) body.appendChild(el("div", "ditem__blurb", esc(c.blurb)));
    a.appendChild(body);
    a.appendChild(el("span", "ditem__go", "↗"));
    return a;
  }

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

    // book ahead — tear-off tickets
    var ba = el("section", "section reveal");
    ba.appendChild(el("h2", "section__title", "🎫 Book Ahead"));
    var bag = el("div", "ticket-grid");
    TRIP.bookAhead.forEach(function (b, i) {
      var num = ("0" + (i + 1)).slice(-2);
      var t = el("div", "ticket ticket--" + b.level);
      var main = el("div", "ticket__main");
      var head = el("div", "ticket__head");
      head.appendChild(el("span", "ticket__class", LEVEL[b.level] || ""));
      head.appendChild(el("span", "ticket__sub", "PRIORITY · 優先"));
      main.appendChild(head);
      main.appendChild(el("div", "ticket__title", esc(b.name)));
      main.appendChild(el("div", "ticket__note", esc(b.note)));
      main.appendChild(el("div", "ticket__barcode"));
      main.appendChild(el("div", "ticket__code", "JP–26–" + ("00" + (i + 1)).slice(-3) + "  ·  NRT"));
      var stub = el("div", "ticket__stub");
      stub.appendChild(el("div", "ticket__admit", "ADMIT ONE"));
      stub.appendChild(el("div", "ticket__no", "NO." + num));
      t.appendChild(main); t.appendChild(stub);
      bag.appendChild(t);
    });
    ba.appendChild(bag); app.appendChild(ba);

    // map
    var ms = el("section", "section reveal");
    ms.appendChild(el("h2", "section__title", "🗺️ The Map"));
    var stops = ["tokyo", "kyoto", "hakone"].map(function (id) {
      var co = (window.COORDS || {})["city_" + id] || {}; var c = cityById(id);
      return { name: c.name, lat: co.lat, lng: co.lng, cityId: id, q: c.name };
    });
    ms.appendChild(mapBlock(stops, ACCENT_DEFAULT, { legend: true, linkToCity: true }));
    app.appendChild(ms);

    // timeline
    var tl = el("section", "section reveal");
    tl.appendChild(el("h2", "section__title", "📅 Day by Day"));
    var box = el("div", "timeline");
    TRIP.timeline.forEach(function (t) {
      var ci = cityById(t.city); var r = el("a", "tl-row"); r.href = t.city + ".html";
      if (ci) r.style.setProperty("--accent", accentOf(ci.id));
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
      var a = el("a", "city-card"); a.href = c.id + ".html"; a.style.setProperty("--accent", accentOf(c.id));
      a.appendChild(el("div", "city-card__flag", c.flag));
      var jp = el("div", "city-card__jp", esc(c.jp || "")); jp.style.viewTransitionName = "k-" + c.id; a.appendChild(jp);
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
    app.style.setProperty("--accent", accentOf(city.id));
    var hero = el("header", "hero hero--city reveal");
    hero.style.setProperty("--accent", accentOf(city.id));
    var hjp = el("div", "hero__jp", esc(city.jp || "")); hjp.style.viewTransitionName = "k-" + city.id; hero.appendChild(hjp);
    hero.appendChild(el("p", "hero__kicker", city.flag + " " + esc(city.dates)));
    hero.appendChild(el("h1", "hero__title", esc(city.name)));
    hero.appendChild(el("p", "hero__summary", esc(city.blurb)));
    if (city.currency) hero.appendChild(el("p", "hero__cur", "💱 " + esc(city.currency)));
    app.appendChild(hero);

    if (city.map) {
      var ms = el("section", "section reveal");
      ms.appendChild(el("h2", "section__title", "🗺️ The Map"));
      ms.appendChild(mapBlock(city.map.stops, accentOf(city.id), { legend: true }));
      app.appendChild(ms);
    }

    if (city.days) {
      var ds = el("section", "section reveal");
      ds.appendChild(el("h2", "section__title", "🗓️ Day by Day"));
      var tabs = el("div", "daytabs");
      var panels = el("div", "daypanels");
      var dayEls = [], tabEls = [];

      function selectDay(i) {
        dayEls.forEach(function (p, j) { p.classList.toggle("is-active", j === i); });
        tabEls.forEach(function (t, j) { t.classList.toggle("is-active", j === i); });
        if (tabEls[i] && tabEls[i].scrollIntoView) tabEls[i].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        try { localStorage.setItem("jp-day-" + city.id, String(i)); } catch (e) {}
      }

      city.days.forEach(function (d) {
        if (d.bridge) {
          var bchip = el("a", "daytab daytab--bridge", esc(d.bridge.text)); bchip.href = d.bridge.to + ".html";
          tabs.appendChild(bchip); return;
        }
        var idx = dayEls.length;
        var tab = el("button", "daytab"); tab.type = "button"; tab.textContent = d.date;
        tab.addEventListener("click", function () { selectDay(idx); });
        tabs.appendChild(tab); tabEls.push(tab);

        var blk = el("div", "day");
        var head = el("div", "day__head");
        head.appendChild(el("span", "day__date", esc(d.date)));
        if (d.area) head.appendChild(el("span", "day__area", esc(d.area)));
        if (d.cards && d.cards.length) head.appendChild(el("span", "day__progress", ""));
        blk.appendChild(head);
        if (d.note) blk.appendChild(el("p", "day__note", esc(d.note)));
        var cards = d.cards || [];
        var grouped = el("div", "day__groups");
        DAY_GROUPS.forEach(function (g) {
          var items = cards.filter(function (c) { return g.kinds.indexOf(c.kind) >= 0; });
          if (!items.length) return;
          var grp = el("details", "day__group"); grp.setAttribute("open", "");
          grp.appendChild(el("summary", "day__grouptitle", g.title + ' <span class="day__groupcount">' + items.length + "</span>"));
          var list = el("div", "ditems");
          items.forEach(function (c) { list.appendChild(listItem(c, doneIdFor(city.id, d.date, c.name))); });
          grp.appendChild(list);
          grouped.appendChild(grp);
        });
        blk.appendChild(grouped);
        panels.appendChild(blk); dayEls.push(blk);
        dayProgress(blk);
      });

      ds.appendChild(tabs); ds.appendChild(panels); app.appendChild(ds);
      var start = 0;
      try { var s = parseInt(localStorage.getItem("jp-day-" + city.id), 10); if (!isNaN(s) && s >= 0 && s < dayEls.length) start = s; } catch (e) {}
      if (dayEls.length) selectDay(start);
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

  function applyTheme() {
    document.documentElement.dataset.theme = THEME;
    document.documentElement.dataset.cards = CARDS;
    var link = document.getElementById("theme-css");
    if (link) link.setAttribute("href", "themes/" + THEME + ".css?v=8");
  }

  function switchRow(label, order, labels, current, storeKey) {
    var row = el("div", "theme-switch__row");
    row.appendChild(el("span", "theme-switch__label", label));
    order.forEach(function (k) {
      var b = el("button", "theme-switch__btn" + (k === current ? " is-active" : ""), labels[k]);
      b.type = "button";
      b.addEventListener("click", function () {
        if (k === current) return;
        try { localStorage.setItem(storeKey, k); } catch (e) {}
        location.reload();
      });
      row.appendChild(b);
    });
    return row;
  }

  // pointer-reactive cards: glow follows cursor, tilt rotates toward it
  function enhanceCards() {
    if (CARDS !== "tilt") return;
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -9;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
        card.style.transform = "perspective(720px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-6px)";
      });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    });
  }

  function buildSwitcher() {
    var bar = el("div", "theme-switch");
    var themeLabels = {}; THEME_ORDER.forEach(function (t) { themeLabels[t] = THEMES[t].label; });
    bar.appendChild(switchRow("Theme", THEME_ORDER, themeLabels, THEME, "jp-theme"));
    bar.appendChild(switchRow("Cards", CARD_ORDER, CARD_STYLES, CARDS, "jp-cards"));
    document.body.appendChild(bar);
  }

  function init() {
    applyTheme();
    var app = document.getElementById("app");
    if (document.body.dataset.page === "city") {
      var c = cityById(document.body.dataset.city);
      if (c) { document.title = c.name + " · Japan 2026"; buildCity(app, c); }
    } else { document.title = "Japan 2026 · Nov 19 – Dec 4"; buildIndex(app); }
    enhanceCards(); wireReveals(); loadMaps();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
