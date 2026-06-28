// ============================================================
//  Japan 2026 — all content. coords.js loads first.
// ============================================================
function S(name, key, q) {
  var c = (window.COORDS || {})[key] || { lat: 0, lng: 0 };
  return { name: name, lat: c.lat, lng: c.lng, q: q || name };
}

window.TRIP = {
  titleJp: "日本",
  title: "JAPAN ’26",
  subtitle: "Tokyo · Kyoto · Hakone",
  dateRange: "Nov 19 – Dec 4, 2026",
  summary:
    "James + Sasha · 15 nights · Tokyo as home base with a Kyoto leg and a Hakone onsen night. " +
    "Late November = peak autumn leaves (kōyō), crisp clear days, and the best of the city after dark.",
  notionUrl: "https://app.notion.com/p/38d8319b49c181838efec05155afc495",

  bookAhead: [
    { name: "Hakone ryokan (11/30)", note: "Book NOW — the best onsen ryokan fill 2–3 months out, peak foliage.", level: "now" },
    { name: "Airbnbs ×3", note: "Tokyo #1, Kyoto, Tokyo #2. Fall is high season.", level: "now" },
    { name: "Shinkansen", note: "Reserved seats open exactly 1 month before — set reminders Oct 25 & Oct 27 (SmartEX).", level: "soon" },
    { name: "Muscle Girls Bar", note: "Klook, a few weeks out. Closed Tue → go Sat 11/28.", level: "soon" },
    { name: "Bar Benfiddich + SG Club", note: "Reservations drop ~monthly. Benfiddich closed Sun/Mon; SG closed Mon.", level: "soon" },
    { name: "Visit Japan Web", note: "Immigration + customs QR, done ≥6h before landing 11/20.", level: "before" },
  ],

  timeline: [
    { date: "Thu 11/19", text: "Fly NYC → Toronto → Haneda", city: "tokyo" },
    { date: "Fri 11/20", text: "Land Haneda 4:40p — konbini + curry", city: "tokyo" },
    { date: "Sat 11/21", text: "Yoyogi · Harajuku · Shibuya", city: "tokyo" },
    { date: "Sun 11/22", text: "Shimokitazawa · Sangenjaya", city: "tokyo" },
    { date: "Mon 11/23", text: "Shinjuku · Nakano", city: "tokyo" },
    { date: "Tue 11/24", text: "Nakameguro · Ebisu", city: "tokyo" },
    { date: "Wed 11/25", text: "Shinkansen → Kyoto", city: "kyoto" },
    { date: "Thu 11/26", text: "Kyoto — Higashiyama + kaiseki", city: "kyoto" },
    { date: "Fri 11/27", text: "Kyoto AM → back to Tokyo", city: "kyoto" },
    { date: "Sat 11/28", text: "Kichijoji · Muscle Girls Bar", city: "tokyo" },
    { date: "Sun 11/29", text: "Asakusa · Ueno · Yanesen", city: "tokyo" },
    { date: "Mon 11/30", text: "Hakone — ryokan + onsen", city: "hakone" },
    { date: "Tue 12/1", text: "Back to Tokyo · Akihabara · Kagurazaka", city: "tokyo" },
    { date: "Wed 12/2", text: "Yokohama day trip", city: "tokyo" },
    { date: "Thu 12/3", text: "Ginza · Nihonbashi", city: "tokyo" },
    { date: "Fri 12/4", text: "Depart Narita ~3p → Vancouver", city: "tokyo" },
  ],

  cities: [
    // ===================================================== TOKYO
    {
      id: "tokyo", flag: "🗼", name: "Tokyo", jp: "東京",
      dates: "Nov 20–25 & 27–Dec 4", nights: 11, accent: "#ff2d95",
      currency: "¥ yen · $1 ≈ ¥162",
      blurb: "Home base. West-side neighborhoods by day (Harajuku, Shimokita, Nakameguro), the world's best cocktail bars by night, with two stints around the Kyoto leg.",
      map: { stops: [
        S("Meiji Jingu", "tk_meiji"), S("Shibuya Crossing", "tk_shibuya"),
        S("Shibuya Sky", "tk_shibuyasky"), S("Shimokitazawa", "tk_shimokita"),
        S("Nakameguro", "tk_nakameguro"), S("Shinjuku Golden Gai", "tk_golden"),
        S("Omoide Yokocho", "tk_omoide"), S("Nakano Broadway", "tk_nakano"),
        S("teamLab Planets", "tk_teamlab"), S("Senso-ji", "tk_sensoji"),
        S("Yanaka Ginza", "tk_yanaka"), S("Ueno", "tk_ueno"),
        S("Akihabara", "tk_akihabara"), S("Ginza", "tk_ginza"),
        S("Tokyo Tower", "tk_tokyotower"), S("Inokashira Park (Kichijoji)", "tk_kichijoji"),
      ] },
      days: [
        { date: "Fri 11/20", area: "Arrival · Haneda 4:40p", note: "Land, clear immigration with the Visit Japan Web QR, grab a Suica/Welcome Suica + a pocket of cash. First-night ritual: a konbini run (7-Eleven egg sando, FamilyMart famichiki, a Strong Zero) on the way to the apartment.", cards: [
          { kind: "eat", name: "Coco Ichibanya", blurb: "Warm customizable curry, open late, zero decision fatigue after 20h of travel.", tags: ["dinner"], query: "Coco Ichibanya Tokyo" },
        ] },
        { date: "Sat 11/21", area: "Yoyogi · Harajuku · Shibuya", cards: [
          { kind: "sight", name: "Meiji Jingu", blurb: "Start here early — the forest approach is a calm reset before Harajuku. Free.", query: "Meiji Jingu Tokyo" },
          { kind: "activity", name: "Ki-Re-I ID Photo Booth (Kitasando)", blurb: "Your retro ID-photo-booth stop near Kitasando.", query: "Ki-Re-I photo booth Kitasando Tokyo" },
          { kind: "sight", name: "Cat Street", blurb: "The walkable shopping spine between Harajuku and Shibuya.", query: "Cat Street Harajuku Tokyo" },
          { kind: "sight", name: "Hachiko + Miyashita Park", blurb: "The famous statue, then the rooftop park-on-a-mall with a rooftop bar.", query: "Hachiko Statue Shibuya" },
          { kind: "activity", name: "Shibuya Sky", blurb: "Open-air rooftop over the Crossing — go for sunset. Book ahead.", tags: ["~¥2,500"], url: "https://www.shibuya-scramble-square.com/sky/" },
          { kind: "shop", name: "Vivienne Westwood Red Label", blurb: "LaForet Harajuku 1F, 1-11-6 Jingumae.", tags: ["your pick"], query: "Vivienne Westwood LaForet Harajuku" },
          { kind: "shop", name: "Closet Child (Harajuku)", blurb: "Used/secondhand brand pieces — strong for archive Vivienne. 1-7-6 Jingumae.", tags: ["vintage"], query: "Closet Child Harajuku" },
          { kind: "shop", name: "LaForet Harajuku", blurb: "The fashion building itself — floors of indie & designer labels.", query: "LaForet Harajuku" },
          { kind: "shop", name: "Kensscratch Jewelry", blurb: "5-28-7 Jingumae.", query: "Kensscratch Jewelry Jingumae" },
          { kind: "shop", name: "OAO Footwear", blurb: "14-23 Sarugakucho 3F — appointment only, book before you go.", tags: ["★ appt only"], query: "OAO Footwear Sarugakucho Tokyo" },
          { kind: "shop", name: "Nearby: BERBERJIN · RAGTAG · Kindal", blurb: "Top-tier vintage, designer secondhand & archive — all walkable off Cat Street.", tags: ["vintage lane"], query: "BERBERJIN Harajuku" },
          { kind: "eat", name: "AFURI Harajuku", blurb: "Famous yuzu-shio ramen, bright and clean, kiosk ordering.", tags: ["lunch", "~¥1,500"], url: "https://afuri.com/" },
          { kind: "eat", name: "Gyukatsu Motomura", blurb: "Rare beef cutlet you finish on a hot stone. ★4.9, tiny — go at open.", tags: ["alt lunch"], query: "Gyukatsu Motomura Shibuya" },
          { kind: "eat", name: "d47 Shokudo", blurb: "Regional teishoku from all 47 prefectures, big windows over the Shibuya tracks (Hikarie).", tags: ["dinner"], query: "d47 Shokudo Shibuya Hikarie" },
          { kind: "bar", name: "The SG Club", blurb: "Shingo Gokan's World's-50-Best bar — two floors. Reserve. Closed Mon (Sat is fine).", tags: ["★ bar"], url: "https://sg-management.jp/" },
        ] },
        { date: "Sun 11/22", area: "Shimokitazawa · Sangenjaya", cards: [
          { kind: "sight", name: "Gorilla building (Sangenjaya)", blurb: "The quirky Sangenjaya landmark on your list.", query: "Gorilla building Sangenjaya Tokyo" },
          { kind: "coffee", name: "Bear Pond Espresso", blurb: "Cult Shimokita espresso bar, famously serious about the shot.", query: "Bear Pond Espresso Shimokitazawa" },
          { kind: "eat", name: "Magic Spice", blurb: "The Hokkaido soup-curry original — deep and spicy, a Shimokita institution.", tags: ["lunch"], query: "Magic Spice Shimokitazawa" },
          { kind: "eat", name: "Shirube", blurb: "The quintessential izakaya — fatty sashimi, oden, tableside blowtorch crème brûlée. Reserve.", tags: ["★ dinner"], query: "Shirube Shimokitazawa" },
          { kind: "bar", name: "LIVE HAUS", blurb: "Live venue, B1F 2-14-2 Kitazawa — catch a show, then graze the tiny natural-wine bars.", tags: ["live"], query: "LIVE HAUS Shimokitazawa" },
        ] },
        { date: "Mon 11/23", area: "Shinjuku · Nakano", cards: [
          { kind: "shop", name: "BEAMS JAPAN (Shinjuku)", blurb: "The flagship — floors of BEAMS lines plus Japanese craft & souvenirs. 3-32-6 Shinjuku.", tags: ["★ pick"], query: "BEAMS JAPAN Shinjuku" },
          { kind: "shop", name: "The Four Eyed (Kabukicho)", blurb: "Clothes + photo booth, Palais Dor 1F, 2-8-2 Kabukicho.", tags: ["your pick"], query: "The Four Eyed Kabukicho" },
          { kind: "shop", name: "Custom pillow fitting", blurb: "Main fitting is Nishikawa (Thu 12/3); or do it here at Tokyu Hands / Bic Camera Shinjuku.", query: "Tokyu Hands Shinjuku" },
          { kind: "shop", name: "Nakano Broadway", blurb: "Mandarake floors + vintage-watch dealers (Jackroad / Betty Road). Steamed dumplings at the east entrance.", query: "Nakano Broadway" },
          { kind: "shop", name: "Nearby: Disk Union · Isetan Shinjuku", blurb: "Records by genre floor; Isetan depachika + designer.", query: "Disk Union Shinjuku" },
          { kind: "eat", name: "Nakano Broadway basement", blurb: "Grab the famous steamed dumplings, then dig the watch & Mandarake floors.", tags: ["lunch"], query: "Nakano Broadway" },
          { kind: "eat", name: "Omoide Yokocho (Memory Lane)", blurb: "Smoky lantern-lit yakitori alley by Shinjuku station. Bounce between counters.", tags: ["dinner"], query: "Omoide Yokocho Shinjuku" },
          { kind: "bar", name: "Shinjuku Golden Gai", blurb: "200+ tiny themed bars in six alleys, small covers. (SG & Benfiddich closed Mon.)", tags: ["★ bars"], query: "Shinjuku Golden Gai" },
        ] },
        { date: "Tue 11/24", area: "Nakameguro · Ebisu", cards: [
          { kind: "shop", name: "Daikanyama T-Site (Tsutaya Books)", blurb: "The architectural bookstore complex — magazines, design titles, a café.", tags: ["your pick"], query: "Daikanyama T-Site" },
          { kind: "shop", name: "Nearby: Okura · Bonjour Records · A.P.C.", blurb: "Indigo-dyed Japanese wear, records, and the riverside Nakameguro boutiques.", query: "Okura Daikanyama" },
          { kind: "coffee", name: "Sidewalk Stand / Onibus Coffee", blurb: "Canal-side third-wave coffee by the Meguro River. Perfect mid-morning.", query: "Onibus Coffee Nakameguro" },
          { kind: "eat", name: "Shodai (white curry udon)", blurb: "Silky potato-foam curry udon, minimalist room, rarely a wait. Your Ebisu pick.", tags: ["dinner"], query: "Shodai white curry udon Ebisu" },
          { kind: "eat", name: "Ebisu Yokocho", blurb: "Rowdy indoor food alley of tiny stalls — the izakaya-crawl version.", tags: ["alt dinner"], query: "Ebisu Yokocho" },
          { kind: "bar", name: "Bar Trench / Bar Martha (Ebisu)", blurb: "Dark intimate cocktails / vinyl & whisky next door.", tags: ["cocktails"], query: "Bar Trench Ebisu" },
        ] },
        { bridge: { to: "kyoto", text: "Wed 11/25 – Fri 11/27 · Kyoto leg →" } },
        { date: "Fri 11/27", area: "Back to Tokyo (out with JP)", note: "Easy re-entry — drop bags. Optional activities below if you have energy, then a low-key Shimokita/Shibuya evening; let JP pick the bar.", cards: [
          { kind: "activity", name: "teamLab Planets (Toyosu)", blurb: "Immersive digital-art + water rooms on the bay. Timed tickets, book online. Open late.", tags: ["~¥3,800", "optional"], url: "https://www.teamlab.art/e/planets/" },
          { kind: "activity", name: "Tokyo Bay Bike Tour", blurb: "Saved Airbnb experience — bayside ride. Reserve a few weeks out.", tags: ["optional"], url: "https://www.airbnb.com/experiences/6763380?adults=2&checkin=2026-11-20&checkout=2026-11-24" },
          { kind: "activity", name: "'Weird Tokyo' Bike Tour", blurb: "Saved Airbnb experience.", tags: ["optional"], url: "https://www.airbnb.com/experiences/92154?adults=2&checkin=2026-11-20&checkout=2026-11-24" },
          { kind: "eat", name: "Low-key Shimokita izakaya / Shibuya yakitori", blurb: "Keep dinner relaxed after the train back.", tags: ["dinner"], query: "Shimokitazawa izakaya" },
          { kind: "bar", name: "Bar Benfiddich", blurb: "Open Fri (Tue–Sat) if you want a heavy hitter. Reserve via their Instagram drop.", tags: ["★ bar"], query: "Bar Benfiddich Shinjuku" },
        ] },
        { date: "Sat 11/28", area: "Kichijoji · Koganei", cards: [
          { kind: "sight", name: "Edo-Tokyo Open Air Architectural Museum", blurb: "Relocated historic buildings (the inspiration for Spirited Away's bathhouse street). Koganei.", tags: ["~¥400"], url: "https://www.tatemonoen.jp/english/" },
          { kind: "eat", name: "Satou (Kichijoji)", blurb: "Legendary Wagyu menchi-katsu from the takeaway window — the line moves fast.", tags: ["lunch"], query: "Satou Kichijoji" },
          { kind: "sight", name: "Harmonica Yokocho", blurb: "Wander the warren of tiny stalls and bars by Kichijoji station.", query: "Harmonica Yokocho Kichijoji" },
          { kind: "eat", name: "Iseya (Inokashira)", blurb: "Smoky old-school yakitori by Inokashira Park if you want to sit down.", tags: ["alt"], query: "Iseya Kichijoji Inokashira" },
          { kind: "activity", name: "Muscle Girls Bar (Ikebukuro)", blurb: "¥6,000pp, ~90 min, all-you-can-drink + pole shows + flexing. Book on Klook. Closed Tue → tonight's the night.", tags: ["★ RESERVE", "Sat only"], url: "https://www.klook.com/en-US/activity/168642-muscle-women-bar-strong-women-and-high-energy-interactions/" },
        ] },
        { date: "Sun 11/29", area: "Asakusa · Ueno · Yanesen", cards: [
          { kind: "sight", name: "Senso-ji + Nakamise", blurb: "Tokyo's oldest temple — go near dusk when crowds thin and it's lit up. Free.", url: "https://www.senso-ji.jp/about/" },
          { kind: "sight", name: "Asakusa Underground Street", blurb: "The retro subterranean shotengai under Asakusa station — your pick.", query: "Asakusa Underground Street" },
          { kind: "shop", name: "Marukichiya Mizutani (Ueno)", blurb: "Vintage watches — your pick.", tags: ["watches"], query: "Marukichiya Mizutani Ueno" },
          { kind: "shop", name: "Nearby: Ameyoko · Kappabashi", blurb: "Ameyoko market watch/jewelry dealers; Kappabashi Kitchen Town for knives & plastic food samples.", query: "Ameyoko Ueno" },
          { kind: "eat", name: "Asakusa Imahan", blurb: "Historic sukiyaki/shabu-shabu, a proper old-Tokyo sit-down. (Imahan or Aoi-Marushin > touristy Daikokuya.)", tags: ["lunch"], query: "Asakusa Imahan" },
          { kind: "bar", name: "Hoppy Street (Asakusa)", blurb: "Daytime-drinking alley of motsu-nikomi and hoppy. Cheap and fun.", tags: ["day drink"], query: "Hoppy Street Asakusa" },
          { kind: "sight", name: "Yanaka Ginza (Yanesen)", blurb: "Old shotengai for menchi-katsu and pre-war Tokyo. Great late-afternoon before Ueno.", query: "Yanaka Ginza" },
        ] },
        { bridge: { to: "hakone", text: "Mon 11/30 · Hakone onsen night →" } },
        { date: "Tue 12/1", area: "Akihabara · Kagurazaka", note: "(Muscle Girls Bar is closed Tuesdays — it's on 11/28. Tuesday is the perfect Benfiddich night.)", cards: [
          { kind: "sight", name: "Akihabara", blurb: "Electronics, retro games, gachapon.", query: "Akihabara Tokyo" },
          { kind: "eat", name: "Kanda Matsuya", blurb: "Historic hand-cut soba near Akihabara for a real lunch.", tags: ["lunch"], query: "Kanda Matsuya soba Tokyo" },
          { kind: "sight", name: "Kagurazaka", blurb: "Cobblestone 'little Paris' — hidden lanes, teahouses, French bistros.", query: "Kagurazaka Tokyo" },
          { kind: "eat", name: "Le Bretagne (Kagurazaka)", blurb: "Galettes and cider, or a Kagurazaka izakaya for dinner.", tags: ["dinner"], query: "Le Bretagne Kagurazaka Tokyo" },
          { kind: "bar", name: "Bar Benfiddich", blurb: "Open Tue — Hiroyasu Kayama grinds herbs at the bar, top-20 in the world. Reserve.", tags: ["★ bar"], query: "Bar Benfiddich Shinjuku" },
        ] },
        { date: "Wed 12/2", area: "Yokohama day trip", cards: [
          { kind: "eat", name: "Yokohama Chinatown", blurb: "Japan's biggest — dim sum and street snacks (Manchinro for a sit-down).", tags: ["lunch"], query: "Yokohama Chinatown" },
          { kind: "activity", name: "CupNoodles Museum", blurb: "Design your own custom Cup Noodle. Genuinely fun.", tags: ["~¥500"], url: "https://www.cupnoodles-museum.jp/en/yokohama/" },
          { kind: "sight", name: "Minato Mirai + Red Brick Warehouse", blurb: "Waterfront, the Air Cabin gondola, craft beer — great at night with the Ferris wheel lit.", query: "Yokohama Red Brick Warehouse" },
        ] },
        { date: "Thu 12/3", area: "Ginza · Chuo · Nihonbashi", cards: [
          { kind: "activity", name: "Nishikawa custom pillow (Nihonbashi)", blurb: "Your dedicated custom-pillow fitting — appointment only.", tags: ["★ appt"], query: "Nishikawa Nihonbashi Tokyo" },
          { kind: "shop", name: "Vin-Time (Ginza)", blurb: "Vintage watches inside Hankyu Men's Tokyo, 2-5-1 Yurakucho.", tags: ["watches"], query: "Vin-Time Hankyu Mens Ginza" },
          { kind: "shop", name: "Watch CTI (Ginza)", blurb: "Ginza watch dealer.", tags: ["watches"], query: "Watch CTI Ginza" },
          { kind: "shop", name: "Nearby: Quark · Commit · Komehyo · DSM", blurb: "Vintage Rolex (Quark/Commit), luxury secondhand (Komehyo), Ginza Six & Dover Street Market — all minutes apart.", query: "Quark Ginza watches" },
          { kind: "eat", name: "Tsujihan (Nihonbashi)", blurb: "Legendary kaisendon — seafood over rice finished with sea-bream dashi. Queue 45–60 min, cheap. Steps from the pillow shop.", tags: ["★ lunch"], query: "Tsujihan Nihonbashi" },
          { kind: "sight", name: "Tokyo Tower at sunset", blurb: "The classic red-and-white icon — go up around dusk for day-to-night views.", url: "https://www.tokyotower.co.jp/en/" },
          { kind: "eat", name: "Dinner: Bird Land / Kagari", blurb: "Michelin yakitori (Bird Land) or simple, great Kagari ramen; or graze the Mitsukoshi depachika.", tags: ["dinner"], query: "Kagari ramen Ginza" },
          { kind: "bar", name: "Bar High Five (Ginza)", blurb: "Hidetsugu Ueno's no-menu temple of the classic cocktail. Closed Wed/Sun → Thu works. Reserve.", tags: ["★ bar"], query: "Bar High Five Ginza" },
          { kind: "bar", name: "Planetarium Bar (Ginza)", blurb: "Cocktails under a projected starfield. Your pick.", tags: ["★ pick"], query: "Planetarium Bar Ginza Tokyo" },
          { kind: "bar", name: "Anomaly (Nihonbashi)", blurb: "'Near-future concept' cocktail bar in Nihonbashi (4F). Your pick — bar time from 6pm, no res needed.", tags: ["★ pick"], url: "https://anomalytokyo.com/en/" },
        ] },
        { date: "Fri 12/4", area: "Departure · Narita ~3p", note: "Last konbini haul + final depachika souvenirs (Ginza Mitsukoshi or Tokyo Station's Daimaru). You land Haneda but LEAVE from Narita — allow 90+ min (N'EX ~80 min). Moving by ~2:30–3p for the 6:15p to Vancouver.", cards: [
          { kind: "shop", name: "Depachika souvenirs", blurb: "Ginza Mitsukoshi or Tokyo Station's Daimaru food hall for the last gifts.", query: "Daimaru Tokyo Station depachika" },
        ] },
      ],
      sections: [],
    },

    // ===================================================== KYOTO
    {
      id: "kyoto", flag: "⛩️", name: "Kyoto", jp: "京都",
      dates: "Nov 25–27", nights: 2, accent: "#19e3ff",
      currency: "¥ yen · $1 ≈ ¥162",
      blurb: "Two nights downtown by Pontocho. Peak autumn foliage — the most beautiful and busiest time. Temples at dawn, kaiseki at night, torii gates in golden light.",
      map: { stops: [
        S("Fushimi Inari Taisha", "ky_fushimi"), S("Kiyomizu-dera", "ky_kiyomizu"),
        S("Nishiki Market", "ky_nishiki"), S("Pontocho", "ky_pontocho"),
        S("Gion", "ky_gion"), S("Arashiyama Bamboo Grove", "ky_arashiyama"),
        S("Kamo River", "ky_kamo"),
      ] },
      days: [
        { date: "Wed 11/25", area: "Arrive · Nishiki · Pontocho · Gion", note: "Early Shinkansen out (book Oct 25), drop bags, then ease in.", cards: [
          { kind: "eat", name: "Nishiki Market grazing", blurb: "'Kyoto's Kitchen' — soy-milk donuts, tamagoyaki, wagyu skewers. Eat at each stall (it's the rule).", tags: ["lunch"], query: "Nishiki Market Kyoto" },
          { kind: "shop", name: "Kuoe Watches", blurb: "Downtown watch shop — your pick, easy to fold in after Nishiki.", tags: ["watches"], query: "Kuoe Kyoto" },
          { kind: "shop", name: "Teramachi & Shinkyogoku arcades", blurb: "Covered shopping arcades off Nishiki — vintage, secondhand watches, records, kimono.", query: "Teramachi shopping street Kyoto" },
          { kind: "shop", name: "Daimaru Kyoto (depachika)", blurb: "Department-store food hall for Kyoto food gifts.", query: "Daimaru Kyoto" },
          { kind: "sight", name: "Fushimi Inari Taisha", blurb: "The endless vermilion torii. Open 24h — arrive late afternoon and climb past the crowds as light goes gold.", tags: ["★ free"], url: "https://inari.jp/en/" },
          { kind: "sight", name: "Pontocho + Kamo River", blurb: "Lantern-lit alley one block off the river (indoor dining in Nov). Dinner at a Pontocho izakaya.", query: "Pontocho Alley Kyoto" },
          { kind: "sight", name: "Gion (evening)", blurb: "Stroll Hanamikoji and Shirakawa — stick to main streets (Kyoto fines tourists in private alleys).", query: "Gion Kyoto" },
          { kind: "bar", name: "Bee's Knees", blurb: "Hidden, consistently rated Kyoto's best cocktail bar — downtown.", tags: ["★ cocktails"], query: "Bees Knees bar Kyoto" },
          { kind: "bar", name: "L'Escamoteur", blurb: "Theatrical, candle-lit French-run cocktail den near Shijo.", query: "L'Escamoteur Kyoto" },
          { kind: "bar", name: "Sake bar Yoramu", blurb: "Tiny, expert-led sake flights for the obsessive — central.", tags: ["sake"], query: "Yoramu sake Kyoto" },
        ] },
        { date: "Thu 11/26", area: "E-bike · Higashiyama · Kamo sunset", cards: [
          { kind: "activity", name: "Kyoto e-bike tour", blurb: "Great for the spread-out sights — many run through Arashiyama or a temple loop. Book ahead.", tags: ["~¥10,000"], query: "Kyoto ebike tour" },
          { kind: "sight", name: "Arashiyama Bamboo Grove", blurb: "The bamboo grove + Togetsukyo bridge — often part of the e-bike loop.", query: "Arashiyama Bamboo Grove Kyoto" },
          { kind: "eat", name: "Kyogoku Kaneyo", blurb: "100-year unagi house — eel over rice under a giant fluffy omelette. Closed Wed → Thu lunch.", tags: ["lunch"], query: "Kyogoku Kaneyo Kyoto" },
          { kind: "sight", name: "Higashiyama foliage walk", blurb: "Kiyomizu-dera → Sannenzaka/Ninenzaka → Kodai-ji. Peak color — go before 10am.", tags: ["★", "~¥500"], url: "https://www.kiyomizudera.or.jp/en/" },
          { kind: "sight", name: "Kamo River at sunset", blurb: "Walk the riverbank as the light drops; locals sit spaced along the water. Free.", query: "Kamo River Kyoto" },
          { kind: "eat", name: "Roan Kikunoi (kaiseki)", blurb: "The relaxed sister of 3-Michelin-star Kikunoi — exquisite seasonal Kyoto kaiseki. Book 2–4 weeks out.", tags: ["★ dinner"], query: "Roan Kikunoi Kyoto" },
        ] },
        { date: "Fri 11/27", area: "Morning, then Shinkansen back", cards: [
          { kind: "coffee", name: "% Arabica / Weekenders Coffee", blurb: "Riverside coffee in Higashiyama, or the hidden Weekenders downtown (behind a parking lot, worth it).", query: "Weekenders Coffee Tominokoji Kyoto" },
          { kind: "transit", name: "Shinkansen Kyoto → Tokyo", blurb: "Book the early train (reservation opens Oct 27). ~2h15 to Tokyo.", tags: ["SmartEX"], query: "Kyoto Station" },
        ] },
      ],
      sections: [],
    },

    // ===================================================== HAKONE
    {
      id: "hakone", flag: "♨️", name: "Hakone", jp: "箱根",
      dates: "Nov 30 (1 night)", nights: 1, accent: "#b96bff",
      currency: "¥ yen · $1 ≈ ¥162",
      blurb: "The ryokan + onsen splurge. A light loop on the way in — sculpture park, a steaming volcanic valley, a torii in a lake — then check in mid-afternoon and surrender to the bath.",
      map: { stops: [
        S("Hakone Open-Air Museum", "hk_openair"), S("Owakudani", "hk_owakudani"),
        S("Lake Ashi", "hk_ashi"), S("Hakone Shrine", "hk_shrine"),
        S("Hakone-Yumoto Station", "hk_yumoto"), S("Gora", "hk_gora"),
      ] },
      days: [
        { date: "Mon 11/30", area: "The loop, then the onsen", note: "One night — light loop in, check in mid-afternoon, do nothing but soak. Forward big bags from Tokyo by takkyubin (~¥2,000/bag) and carry only an overnight bag.", cards: [
          { kind: "transit", name: "Get there: Odakyu Romancecar", blurb: "Shinjuku → Hakone-Yumoto (~85 min, reserve a seat). Buy a Hakone Free Pass for the loop transport.", tags: ["Free Pass"], url: "https://www.odakyu.jp/english/passes/hakone/" },
          { kind: "sight", name: "Hakone Open-Air Museum", blurb: "Hillside sculpture park (Henry Moore, a Picasso pavilion) with a hot-spring foot bath. The standout stop.", tags: ["★", "~¥2,000"], url: "https://www.hakone-oam.or.jp/en/" },
          { kind: "sight", name: "Owakudani", blurb: "Steaming volcanic valley — ride the ropeway up, eat a black egg (adds 7 years), Fuji views on a clear day.", query: "Owakudani Hakone" },
          { kind: "sight", name: "Lake Ashi + Hakone Shrine torii", blurb: "The 'pirate ship' cruise to the red torii standing in the water. Best Fuji views if skies are clear.", query: "Lake Ashi Hakone" },
        ] },
      ],
      sections: [
        { title: "The ryokan — book NOW", icon: "🏯", cards: [
          { kind: "stay", name: "Ryokan Hakone Ginyu", blurb: "Clifftop — every room has a private open-air onsen over the gorge. The sunrise soak is the whole experience. Romantic pick.", tags: ["★ romantic", "~$370–555"], url: "https://www.hakoneginyu.co.jp/en/" },
          { kind: "stay", name: "Gora Kadan", blurb: "Former imperial-family retreat, one of Japan's most celebrated ryokan. Impeccable service. Book a private-onsen room.", tags: ["icon / splurge", "~$555–925"], url: "https://www.gorakadan.com/hakone/?lang=en" },
          { kind: "stay", name: "Odakyu Hotel Hatsuhana", blurb: "Modern ryokan-hotel with a rooftop infinity onsen + in-room open-air baths, excellent kaiseki. Best value of the three.", tags: ["value", "~$250–370"], url: "https://www.hakone-hotelhatsuhana.jp/en/" },
        ] },
      ],
      tipNote: "Tattoo note: communal baths often restrict tattoos — a room with a private onsen sidesteps it entirely.",
    },

    // ===================================================== LOGISTICS
    {
      id: "logistics", flag: "🧳", name: "Logistics", jp: "手配",
      dates: "Before you fly", nights: 0, accent: "#9dff3c", info: true,
      currency: "",
      blurb: "Everything operational: trains, connectivity, money, entry, and the apps to grab before you fly.",
      sections: [
        { title: "Getting around", icon: "🚇", cards: [
          { kind: "transit", name: "Suica in Apple Wallet", blurb: "Add before you go, top up with your card, tap on every train/subway/bus/konbini. Welcome Suica is the paper backup.", tags: ["★ do first"] },
          { kind: "transit", name: "Navigation", blurb: "Google Maps is excellent for Tokyo transit; Navitime / Japan Travel is the backup for platforms and transfers.", tags: ["apps"] },
          { kind: "transit", name: "Skip the JR Pass", blurb: "For this trip (in-city + two Tokyo–Kyoto runs) the nationwide pass isn't worth it post-2023. Buy single Shinkansen tickets.", tags: ["money-saver"] },
        ] },
        { title: "Shinkansen (Tokyo ↔ Kyoto)", icon: "🚄", cards: [
          { kind: "transit", name: "Route + fare", blurb: "Tokaido Shinkansen, ~2h15 each way. Reserved Nozomi ~¥14,170 (~$88) one way.", tags: ["~$88"] },
          { kind: "transit", name: "Book on SmartEX", blurb: "Reserved seats open EXACTLY 1 month before — set reminders Oct 25 (for 11/25) and Oct 27 (for 11/27). Reserve in peak foliage.", tags: ["★ Oct 25 & 27"] },
          { kind: "transit", name: "Oversized luggage", blurb: "Bags 160–250cm need an oversized-baggage seat or risk a fine. Better: forward big bags by takkyubin and travel light.", tags: ["takkyubin"] },
        ] },
        { title: "Connectivity & money", icon: "💴", cards: [
          { kind: "transit", name: "eSIM (Airalo / Ubigi)", blurb: "~10–20GB for two weeks. Install before you fly, switch on when you land. Cheaper than pocket wifi for two phones.", url: "https://www.airalo.com/japan-esim" },
          { kind: "transit", name: "Yen", blurb: "Don't pre-order at home. Withdraw on arrival from 7-Eleven (7Bank) or Japan Post ATMs (24/7, take foreign cards). Carry ¥10–20k cash.", tags: ["7Bank ATM"] },
          { kind: "transit", name: "Tax-free (changing Nov 2026)", blurb: "Moving to refund-at-departure at more stores. Keep receipts, claim at the airport. No tipping.", tags: ["keep receipts"] },
        ] },
        { title: "Entry & apps", icon: "🛂", cards: [
          { kind: "transit", name: "Visit Japan Web", blurb: "One QR for immigration + customs — fill BOTH sections (skipping customs is the #1 mistake). Done ≥6h before landing. Screenshot the QR.", tags: ["★ before 11/20"], url: "https://www.vjw.digital.go.jp/" },
          { kind: "transit", name: "Apps to download", blurb: "Suica · SmartEX · Google Maps + Navitime · Google Translate (offline JP) · Tabelog (3.5+ is good) · Klook · Ecbo Cloak · Airalo · FLUSH · Yurekuru Call.", tags: ["checklist"] },
          { kind: "transit", name: "Good to know (late 2026)", blurb: "No using power banks in-flight (charge before boarding). Kyoto fines tourists in Gion's private alleys. Cold, crisp, clear — pack warm layers + broken-in shoes.", tags: ["heads up"] },
        ] },
      ],
    },
  ],
};
