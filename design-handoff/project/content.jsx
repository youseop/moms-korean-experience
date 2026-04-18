// Content data for Eunjung's Table — home page

/* Unsplash images (warm grade applied via CSS filter in .photo img) */
const IMAGES = {
  // Hero
  heroMom:      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80', // warm portrait, smiling
  momCandid:    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80',    // warm portrait
  momKitchen:   'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=1200&q=80', // cooking hands

  // Three experiences
  tours:        'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&q=80', // seoul street
  cooking:      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80', // korean food spread
  stay:         'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80', // cozy room

  // Gallery
  g1:           'https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=800&q=80',  // seoul alley night
  g2:           'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800&q=80',  // korean banchan
  g3:           'https://images.unsplash.com/photo-1517030330234-94c4fb948ebc?w=800&q=80',  // tancheon-like stream
  g4:           'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800&q=80',     // kimchi/ingredients
  g5:           'https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=800&q=80',  // bukchon hanok
  g6:           'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',  // korean tea

  // Reviews avatars
  anna:         'https://i.pravatar.cc/240?img=47',
  david:        'https://i.pravatar.cc/240?img=33',
  maya:         'https://i.pravatar.cc/240?img=44',

  // Maru
  maru:         'https://images.unsplash.com/photo-1558531304-a4773b7e3a9c?w=800&q=80',    // schnauzer
};

const TAGLINES = [
  "Your Korean mom in Seoul.",
  "Stay with a Korean mom in Jeongja-dong.",
  "3 ways\nto spend time\nwith\na Korean mom.",
  "Korean home cooking, hidden corners, and a quiet room in Jeongja.",
];

const EXPERIENCES = [
  {
    id: 'tours',
    num: '01',
    kicker: 'Tours',
    title: 'Hidden corners, with Mom',
    blurb: "Not scripted, not touristy. Eunjung takes you to the places she and her family actually love — backstreets in Seoul, a quiet temple on a hill, a pottery village outside the city. She can drive you there herself.",
    cta: 'See the tours',
    image: IMAGES.tours,
    alt: 'Narrow Seoul alley at dusk',
    href: 'Tours.html',
  },
  {
    id: 'cooking',
    num: '02',
    kicker: 'Cooking class',
    title: 'Cook alongside her',
    blurb: "Kimbap rolled on the counter, bulgogi sizzling in the pan, a seasonal side dish from whatever's at the market. Three set menus, allergy-friendly, and you eat what you make together.",
    cta: 'Pick a menu',
    image: IMAGES.cooking,
    alt: 'Korean home-cooked meal spread',
    href: 'Cooking.html',
  },
  {
    id: 'stay',
    num: '03',
    kicker: 'Stay',
    title: 'A private room, a daily dinner',
    blurb: "A quiet room and private bathroom in Eunjung's home by Tancheon stream. Home-cooked dinner every evening. Five minutes to Jeongja Station. Best for travelers staying a week or more.",
    cta: 'See the room',
    image: IMAGES.stay,
    alt: 'Quiet room with morning light',
    href: 'Stay.html',
  },
];

const REVIEWS = [
  {
    id: 'anna',
    name: 'Anna',
    where: 'Berlin, Germany',
    service: 'Tours',
    avatar: IMAGES.anna,
    quote: "Eunjung drove us an hour into Gyeonggi to a pottery village I had never heard of. We ate doenjang-jjigae at a place with no English menu, and she translated every word of a conversation with the owner. It was the best day of our trip.",
  },
  {
    id: 'david',
    name: 'David',
    where: 'Toronto, Canada',
    service: 'Cooking class',
    avatar: IMAGES.david,
    quote: "I came in expecting a class. I left with a friend, a family recipe for japchae, and a Tupperware of kimchi for the hotel. She made me feel like I had been cooking there my whole life.",
  },
  {
    id: 'maya',
    name: 'Maya',
    where: 'Melbourne, Australia',
    service: 'Stay',
    avatar: IMAGES.maya,
    quote: "The room was simple and beautiful. The dinners were better than any restaurant I tried in Seoul. Walking along Tancheon every morning before work felt like belonging somewhere, not just visiting.",
  },
];

const GALLERY = [
  { src: IMAGES.g1, alt: 'A Seoul alley at night',           rot: -1.2 },
  { src: IMAGES.g2, alt: 'Banchan on a table',               rot:  0.8 },
  { src: IMAGES.g3, alt: 'A stream through a park',          rot: -0.6 },
  { src: IMAGES.g4, alt: 'Fresh Korean ingredients',         rot:  1.1 },
  { src: IMAGES.g5, alt: 'Tiled rooftops in Bukchon',        rot: -0.9 },
  { src: IMAGES.g6, alt: 'A warm cup of Korean tea',         rot:  0.5 },
];

Object.assign(window, { IMAGES, TAGLINES, EXPERIENCES, REVIEWS, GALLERY });
