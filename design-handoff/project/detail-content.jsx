// Content for the three detail pages

/* ─── Tours ─────────────────────────────────────────────────── */
const TOURS_CONTENT = {
  hero: {
    kicker: "Tours with Mom",
    title: "Places she\u2019d take her own kids.",
    lead:  "A day out with Eunjung isn\u2019t a tour \u2014 it\u2019s her showing you the corner of Korea she loves most, at her own pace. She speaks gentle English, drives you herself, and always knows where to eat.",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&q=80",
    alt:   "A quiet Seoul street",
  },
  subnav: [
    ["overview", "Overview"],
    ["courses",  "Four days"],
    ["map",      "Where we go"],
    ["reviews",  "Past guests"],
    ["booking",  "How booking works"],
    ["faq",      "FAQ"],
  ],
  facts: [
    ["Duration",    "5\u20138 hours"],
    ["Group size",  "1\u20134 people"],
    ["Price",       "\u20a9180,000 / person"],
    ["Meet",        "Your hotel or Jeongja Station"],
    ["Transport",   "Eunjung\u2019s car (4-seater)"],
    ["Language",    "English & Korean"],
  ],
  routes: [
    {
      time:  "A full day",
      title: "Icheon pottery &\u00a0Gwangju",
      body:  "Two hours east of Seoul: a pottery village where Eunjung buys her own ceramics, lunch at a place with no English menu, and the long way back through quiet countryside.",
      stops: ["Jeongja \u2192 Icheon", "Kiln visit", "Lunch (hand-cut noodles)", "Gwangju hills", "Home by dusk"],
    },
    {
      time:  "Half day",
      title: "Bukchon, Ikseon, Jongmyo",
      body:  "Not the usual photo-stop Bukchon. Side alleys, a traditional bookbinder, a tea house her mother used to visit, and Jongmyo shrine just before it empties out at closing time.",
      stops: ["Anguk Station", "Bukchon side alleys", "Traditional bookbinder", "Tea house", "Jongmyo shrine"],
    },
    {
      time:  "Evening",
      title: "Jeongja night walk",
      body:  "Dinner at a small restaurant where the owner knows her name, a slow loop along Tancheon stream, and a stop at the best soft-serve in Bundang.",
      stops: ["Jeongja Cafe St.", "Dinner (Eunjung\u2019s friend\u2019s place)", "Tancheon stream walk", "Soft-serve stop"],
    },
    {
      time:  "Flexible",
      title: "Wherever you\u2019re curious",
      body:  "Got a specific temple, museum, market, or neighborhood on your list? Send it to her ahead of time. She\u2019ll tell you honestly whether it\u2019s worth it \u2014 and suggest something nearby that probably is.",
      stops: ["Send your list", "She replies honestly", "Plan together", "Go"],
    },
  ],
  // Hand-drawn map points — positions are % of a 400x280 viewBox
  mapPins: [
    { n: 1, x: 72, y: 58, label: "Jeongja (home)" },
    { n: 2, x: 90, y: 34, label: "Icheon pottery" },
    { n: 3, x: 82, y: 76, label: "Gwangju hills" },
    { n: 4, x: 40, y: 30, label: "Bukchon" },
    { n: 5, x: 46, y: 42, label: "Jongmyo" },
    { n: 6, x: 72, y: 50, label: "Tancheon" },
  ],
  quote: {
    text: "\u201cShe drove us an hour into Gyeonggi to a pottery village I had never heard of. It was the best day of our trip.\u201d",
    cite: "\u2014 Anna, Berlin",
  },
  reviews: [
    { text: "\u201cEunjung drove us to a tiny ceramic village in Gyeonggi. We came home with two bowls and a story I tell everyone.\u201d", by: "Anna & Tobias", where: "Berlin \u2014 October" },
    { text: "\u201cThe evening walk along Tancheon with her was the calmest I felt in three weeks of travel.\u201d", by: "Maya",           where: "Melbourne \u2014 March" },
    { text: "\u201cShe listened when I said I\u2019d already done Gyeongbokgung. Took us to Jongmyo instead. Way better.\u201d", by: "David",           where: "Toronto \u2014 June" },
  ],
  process: [
    { t: "You send a note", b: "A few lines about when you\u2019re in Korea and what you\u2019re curious about. Eunjung replies within a day." },
    { t: "She suggests a day", b: "Based on the week, the weather, and what\u2019s in season. You say yes, no, or ask for a different idea." },
    { t: "We confirm", b: "A small deposit holds the date. The rest on the day. Cancel up to 48h before, no fuss." },
    { t: "She picks you up", b: "From your hotel, or you meet at Jeongja Station. And off you go." },
  ],
  faq: [
    { q: "How much English does Eunjung speak?", a: "Conversational and gentle. She grew up speaking English at home and has been hosting English-speaking guests for years." },
    { q: "Is this suitable for kids?", a: "Yes \u2014 most of her favorite places have quiet corners and snacks. Just let her know ages ahead of time." },
    { q: "What if it rains?", a: "She has rainy-day plans too: a museum, a tea house, a market with a roof. She checks the forecast the night before." },
    { q: "Can we modify the route on the day?", a: "Absolutely. This is not a fixed tour. If you fall in love with a cafe, we stay. If you\u2019re tired, we go home." },
    { q: "Is food included?", a: "Lunch is included on full-day tours. Dinner is usually somewhere near home, on us." },
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=800&q=80", alt: "A Seoul alley at night", rot: -0.8 },
    { src: "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=800&q=80", alt: "Bukchon hanok rooftops",  rot:  1.0 },
    { src: "https://images.unsplash.com/photo-1517030330234-94c4fb948ebc?w=800&q=80", alt: "Tancheon stream",         rot: -0.4 },
    { src: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80", alt: "A warm cup of tea",       rot:  0.7 },
  ],
};

/* ─── Cooking Class ─────────────────────────────────────────── */
const COOKING_CONTENT = {
  hero: {
    kicker: "Cooking with Mom",
    title: "Cook alongside her, then sit down and eat.",
    lead:  "Three set menus, adjusted for allergies and what\u2019s good at the market that week. You roll, chop, season, and taste \u2014 then Eunjung pours tea and everyone eats what you made together.",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80",
    alt:   "A table set with Korean home cooking",
  },
  subnav: [
    ["overview",    "Overview"],
    ["menus",       "Three menus"],
    ["ingredients", "Pantry"],
    ["flow",        "How the day goes"],
    ["reviews",     "Past guests"],
    ["faq",         "FAQ"],
  ],
  facts: [
    ["Duration",     "3 hours"],
    ["Group size",   "1\u20134 people"],
    ["Price",        "\u20a995,000 / person"],
    ["Where",        "Eunjung\u2019s kitchen, Jeongja"],
    ["Allergies",    "Just tell her ahead"],
    ["Take home",    "Kimchi + leftovers"],
  ],
  menus: [
    {
      id: "kimbap",
      name: "Kimbap & banchan",
      ko:   "\uae40\ubc25",
      time: "2.5 hours",
      difficulty: "Gentle",
      lines: [
        ["Main",      "Rolled seaweed rice with spinach, egg, beef, carrot, radish"],
        ["Sides",     "Three seasonal banchan (whatever\u2019s fresh)"],
        ["Soup",      "Miyeok-guk \u2014 seaweed soup"],
        ["Drink",     "Barley tea, or makgeolli for grown-ups"],
        ["Allergies", "Easy to do vegetarian or gluten-free"],
      ],
    },
    {
      id: "bulgogi",
      name: "Bulgogi night",
      ko:   "\ubd88\uace0\uae30",
      time: "3 hours",
      difficulty: "Moderate",
      lines: [
        ["Main",      "Soy-marinated beef, grilled at the table"],
        ["Sides",     "Japchae (glass noodles) + four banchan"],
        ["Stew",      "Doenjang-jjigae with tofu and zucchini"],
        ["Rice",      "Short-grain from Icheon, just steamed"],
        ["Allergies", "Vegetarian version uses king oyster mushrooms"],
      ],
    },
    {
      id: "seasonal",
      name: "Whatever\u2019s in season",
      ko:   "\uc81c\ucca0",
      time: "3 hours",
      difficulty: "Whatever you like",
      lines: [
        ["Main",      "Changes weekly \u2014 summer: bibim-guksu; winter: tteokguk"],
        ["Sides",     "Whatever looked best at the market that morning"],
        ["Soup",      "Always a soup. Always."],
        ["Surprise",  "One dish Eunjung grew up with, that you\u2019ve never tried"],
        ["Allergies", "Menu built around what you can eat"],
      ],
    },
  ],
  ingredients: [
    { en: "Fermented soybean paste", ko: "Doenjang",    note: "Three-year aged. She makes it in a clay jar on the balcony." },
    { en: "Red pepper flakes",        ko: "Gochugaru",   note: "From her cousin\u2019s farm in Yeongyang. Sun-dried, not machine." },
    { en: "Toasted sesame oil",       ko: "Chamgireum",  note: "Cold-pressed. One bottle lasts her a month." },
    { en: "Seaweed",                  ko: "Gim",         note: "Roasted with a little salt, torn by hand at the table." },
    { en: "Short-grain rice",         ko: "Ssal",        note: "Icheon rice. Washed until the water runs clear. No shortcuts." },
    { en: "Kimchi",                   ko: "Kimchi",      note: "Her own. Napa cabbage in autumn, young radish in spring." },
  ],
  flow: [
    { time: "You arrive",  title: "Tea first",       body: "Take off your shoes, sit at the kitchen counter. Eunjung pours barley tea and talks through the menu." },
    { time: "The market",  title: "A short walk",    body: "For seasonal menus: a quick trip to the vegetable stand down the block. You pick; she tells you what\u2019s good today." },
    { time: "The work",    title: "Chopping, stirring", body: "Aprons on. She cooks next to you, not in front of you. Questions welcome. Mistakes welcome." },
    { time: "The table",   title: "Everyone sits",   body: "Small bowls, generous portions. Maru sits under the table. Nobody rushes." },
    { time: "You leave",   title: "Tupperware",      body: "Leftovers packed. A small jar of kimchi. A written copy of the recipe, if you want." },
  ],
  quote: {
    text: "\u201cI came in expecting a class. I left with a friend, a recipe for japchae, and a Tupperware of kimchi.\u201d",
    cite: "\u2014 David, Toronto",
  },
  reviews: [
    { text: "\u201cShe taught me how to roll kimbap. I\u2019ve made it every weekend since. My kids ask for it now.\u201d", by: "Priya",     where: "London \u2014 April" },
    { text: "\u201cBest three hours of our trip. The kitchen smelled like something I want my own home to smell like.\u201d", by: "Jonas",     where: "Copenhagen \u2014 November" },
    { text: "\u201cI\u2019m vegetarian and Eunjung rebuilt the whole bulgogi menu around mushrooms. It didn\u2019t feel like a compromise.\u201d", by: "Mei",       where: "Singapore \u2014 July" },
  ],
  faq: [
    { q: "I don\u2019t know how to cook. Is that okay?", a: "Perfect, actually. Most guests haven\u2019t rolled kimbap before. Eunjung goes at your pace." },
    { q: "Can you handle allergies or dietary needs?", a: "Yes. Gluten-free, vegetarian, nut, shellfish \u2014 just let her know when you book." },
    { q: "Do I get the recipes?", a: "If you want them. She\u2019ll hand-write them for you before you leave." },
    { q: "Can we just eat, no cooking?", a: "Of course. She calls that the \u201ceat with mom\u201d version. Same price, more wine." },
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800&q=80", alt: "Banchan on a table",   rot:  0.9 },
    { src: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800&q=80", alt: "Fresh ingredients",        rot: -0.7 },
    { src: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=800&q=80", alt: "Hands rolling kimbap",  rot:  0.5 },
    { src: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80", alt: "A cup of barley tea",   rot: -1.0 },
  ],
};

/* ─── Stay ──────────────────────────────────────────────────── */
const STAY_CONTENT = {
  hero: {
    kicker: "Stay with Mom",
    title: "A quiet room, a daily dinner, a second family.",
    lead:  "One guest room and private bathroom in Eunjung\u2019s home in Jeongja-dong. Home-cooked dinner every evening. Five minutes to Jeongja Station. Best if you\u2019re staying a week or more.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
    alt:   "A quiet, sunlit room",
  },
  subnav: [
    ["overview", "Overview"],
    ["day",      "A day at home"],
    ["house",    "The house"],
    ["maru",     "Maru"],
    ["nearby",   "Getting around"],
    ["reviews",  "Past guests"],
    ["faq",      "FAQ"],
  ],
  facts: [
    ["Room",         "Private, with desk & bathroom"],
    ["Rate",         "\u20a9120,000 / night"],
    ["Min. stay",    "7 nights"],
    ["Includes",     "Breakfast + dinner"],
    ["Wi-Fi",        "Fiber, works well"],
    ["Household",    "Eunjung, Youseop (sometimes), Maru"],
  ],
  day: [
    { time: "07:30", title: "Coffee on the counter",    body: "Eunjung makes pour-over. You help yourself. Breakfast is simple \u2014 rice, soup, an egg, last night\u2019s banchan." },
    { time: "09:00", title: "Out into the day",         body: "Jeongja Station is five minutes on foot. Gangnam is twenty minutes on the subway. Tancheon stream starts right outside." },
    { time: "13:00", title: "Come and go as you like",  body: "No check-ins, no schedules. Leave your things, take a nap, head back out. The kettle is always on." },
    { time: "18:30", title: "Dinner together",          body: "Whatever Eunjung decided to cook that afternoon. You eat at the kitchen table. Maru sits under it." },
    { time: "22:00", title: "Your own quiet room",      body: "Soft sheets, a proper desk, a window that opens onto trees. She knocks before coming in, always." },
  ],
  house: [
    { name: "Guest room",  size: "4.5 \u00d7 3.2 m", body: "Queen bed, linen sheets, full blackout curtains. A proper desk facing the window." },
    { name: "Bathroom",    size: "Yours alone",       body: "Private, next to your room. Rain shower. Hotel-grade toiletries she actually uses herself." },
    { name: "Kitchen",     size: "The heart of it",   body: "Where breakfast and dinner happen. Barley tea always hot. A stool with your name on it, eventually." },
    { name: "The balcony", size: "South-facing",      body: "Three plants Eunjung has kept alive for twenty years. A chair that nobody minds if you borrow." },
  ],
  maru: {
    name: "Maru",
    breed: "Korean Jindo mix, 6 years old",
    body:  "Maru is very quiet, very gentle, and very interested in whatever you\u2019re eating. She doesn\u2019t jump, doesn\u2019t bark, and sleeps in the kitchen. If you\u2019re allergic to dogs, this stay isn\u2019t for you. If you love dogs, you\u2019ve just made a friend.",
    things: ["Loves: walks at dusk, the balcony in sun", "Won\u2019t: come in the guest room unless invited", "Small: 14 kg, fits on a lap if she feels like it"],
  },
  nearby: [
    ["Jeongja Station (Bundang line)",   "5 min walk"],
    ["Tancheon stream",                  "2 min walk"],
    ["Local market & bakery",            "7 min walk"],
    ["Pangyo Tech Valley",               "10 min bus"],
    ["Gangnam Station",                  "20 min subway"],
    ["Hongdae / Itaewon",                "35\u201345 min"],
    ["Myeongdong / Gyeongbokgung",       "40 min"],
    ["Incheon Airport (door to door)",   "75 min"],
  ],
  walks: [
    { name: "Tancheon loop (morning)",   body: "Right out the door and along the stream. 40 minutes at a slow pace. Ducks, joggers, sometimes a heron." },
    { name: "Jeongja cafe street",       body: "A 10-minute walk for a proper flat white. Eunjung\u2019s favorite bakery has a sourdough she buys on Fridays." },
    { name: "Bulgok park",               body: "A wooded hill 20 minutes away. Quiet even on weekends. Good for when Seoul feels loud." },
  ],
  quote: {
    text: "\u201cThe room was simple and beautiful. Walking along Tancheon every morning felt like belonging somewhere.\u201d",
    cite: "\u2014 Maya, Melbourne",
  },
  reviews: [
    { text: "\u201cTwo weeks at Eunjung\u2019s felt like living in Korea, not visiting. I miss the kitchen table.\u201d", by: "Maya",          where: "Melbourne \u2014 March, 2 weeks" },
    { text: "\u201cI worked remote for ten days. The desk, the Wi-Fi, the dinners. I wrote more in that room than I have in months.\u201d", by: "Kaito",         where: "Osaka \u2014 January, 10 nights" },
    { text: "\u201cMaru sat on my feet every morning while I answered emails. I cried a little when I left.\u201d", by: "Sofia",         where: "Barcelona \u2014 September, 1 week" },
  ],
  faq: [
    { q: "Can I book less than a week?", a: "Usually no \u2014 a week is the minimum so the household finds its rhythm. Sometimes she makes exceptions, ask." },
    { q: "Is it wheelchair accessible?", a: "Partly. The building has an elevator, but the apartment has a small step. Ask \u2014 she\u2019ll be honest." },
    { q: "Can I work from here?", a: "Yes \u2014 the desk, the Wi-Fi, the quiet are all built for that. Several guests have stayed a month to work remotely." },
    { q: "What about laundry?", a: "In-unit washer, drying rack. She shows you how. No dry-cleaning nearby but there\u2019s a service she uses." },
    { q: "Are meals really every day?", a: "Breakfast and dinner, yes. Lunch is on you \u2014 unless you\u2019re home and there are leftovers, which there usually are." },
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", alt: "The guest room",       rot: -0.6 },
    { src: "https://images.unsplash.com/photo-1517030330234-94c4fb948ebc?w=800&q=80", alt: "Tancheon stream",      rot:  0.8 },
    { src: "https://images.unsplash.com/photo-1558531304-a4773b7e3a9c?w=800&q=80", alt: "Maru on the rug",         rot: -0.9 },
    { src: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800&q=80", alt: "Dinner laid out",      rot:  0.5 },
  ],
};

Object.assign(window, { TOURS_CONTENT, COOKING_CONTENT, STAY_CONTENT });
