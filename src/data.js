/* Site data extracted from the original application bundles. */

export const site = {
  name: 'Kilele Safaris',
  tagline: 'Wildlife safaris, Kilimanjaro climbs and Zanzibar escapes, guided by people born in Tanzania.',
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Safaris', to: '/safaris' },
    { label: 'Destinations', to: '/destinations' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  email: 'hello@kilelesafaris.com',
  phone: '+255 768 641 810',
  whatsapp: 'https://wa.me/255768641810',
  address: 'Njiro Road, Arusha, Tanzania',
}

export const IMG = {
  savanna: '/images/savanna.avif',
  kilimanjaro: '/images/kilimanjaro.avif',
  zanzibar: '/images/zanzibar.avif',
  migration: '/images/migration.avif',
  camp: '/images/camp.avif',
  gameDrive1: '/images/game-drive-1.avif',
  gameDrive2: '/images/game-drive-2.avif',
  ngorongoro: '/images/ngorongoro.avif',
  tarangire: '/images/tarangire.avif',
  lakeManyara: '/images/lake-manyara.avif',
  ruaha: '/images/ruaha.avif',
  lion: '/images/lion.avif',
  elephant: '/images/elephant.avif',
  leopard: '/images/leopard.avif',
  zebra: '/images/zebra.avif',
  giraffe: '/images/giraffe.avif',
}

export const categories = ['Safari', 'Trek', 'Beach', 'Combo']

const excluded = [
  'International flights',
  'Tanzania visa',
  'Travel insurance',
  'Tips for guides and porters',
]

export const trips = [
  {
    slug: 'great-migration',
    title: 'The Great Migration',
    category: 'Safari',
    days: 7,
    priceFrom: 3390,
    image: IMG.migration,
    blurb: 'Follow two million wildebeest across the Mara river crossings.',
    bestTime: 'June to October',
    groupSize: '2-6 guests',
    highlights: ['Mara river crossings', 'Big cat sightings', 'Ngorongoro Crater floor', 'Mobile tented camp'],
    itinerary: [
      { day: 'Day 1', title: 'Karibu Arusha', description: 'Airport pickup and a quiet night at a garden lodge below Mount Meru.' },
      { day: 'Day 2', title: 'Tarangire', description: 'Elephant herds and ancient baobabs on your first game drive.' },
      { day: 'Day 3', title: 'Ngorongoro Crater', description: 'Descend 600 m to the crater floor, home to black rhino and lion prides.' },
      { day: 'Day 4-6', title: 'Northern Serengeti', description: 'Fly north to follow the herds and wait for the river crossings.' },
      { day: 'Day 7', title: 'Kwaheri', description: 'A final sunrise drive, then a light aircraft back to Arusha.' },
    ],
    included: [
      'Private 4x4 with pop-up roof',
      'All park and crater fees',
      'Lodges and tented camps, full board',
      'Internal flight Serengeti to Arusha',
    ],
    excluded,
  },
  {
    slug: 'roof-of-africa',
    title: 'Roof of Africa',
    category: 'Trek',
    days: 8,
    priceFrom: 2450,
    image: IMG.kilimanjaro,
    blurb: 'Climb Kilimanjaro by the Lemosho route and stand above the clouds.',
    bestTime: 'January to March, June to October',
    groupSize: '1-10 climbers',
    highlights: ['Uhuru Peak, 5,895 m', 'Shira Plateau sunsets', 'Barranco Wall scramble', '93% summit success rate'],
    itinerary: [
      { day: 'Day 1', title: 'Lemosho Gate', description: 'Drive to the western forests and walk through the rainforest to camp.' },
      { day: 'Day 2-3', title: 'Shira Plateau', description: 'Climb above the tree line onto a wide, high plateau with Kibo in view.' },
      { day: 'Day 4', title: 'Lava Tower', description: 'Climb high, sleep low: the key day for adjusting to the altitude.' },
      { day: 'Day 5-6', title: 'Barranco to Barafu', description: 'Scramble the Barranco Wall and reach base camp below the summit.' },
      { day: 'Day 7', title: 'Summit night', description: 'Start at midnight and reach Uhuru Peak at sunrise, above a sea of clouds.' },
      { day: 'Day 8', title: 'Descent', description: 'Walk down to Mweka Gate for your certificate and a cold drink.' },
    ],
    included: [
      'Certified mountain guides and porters',
      'Park fees and rescue fees',
      'Four-season tents and all meals',
      'Oxygen and pulse checks twice daily',
    ],
    excluded: [...excluded, 'Sleeping bag rental'],
  },
  {
    slug: 'stars-and-spice',
    title: 'Stars & Spice',
    category: 'Combo',
    days: 5,
    priceFrom: 1780,
    image: IMG.zanzibar,
    blurb: "Sleep under the Milky Way, then unwind on Zanzibar's white sand.",
    bestTime: 'All year, except April and May',
    groupSize: '2-8 guests',
    highlights: ['Fly camp under the stars', 'Stone Town walking tour', 'Spice farm lunch', 'Dhow sunset cruise'],
    itinerary: [
      { day: 'Day 1', title: 'Tarangire fly camp', description: 'Game drive, then dinner by the fire and a bed under open sky.' },
      { day: 'Day 2', title: 'Lake Manyara', description: 'Tree-climbing lions and flamingos on the soda lake shore.' },
      { day: 'Day 3', title: 'Stone Town', description: 'Fly to Zanzibar and wander carved doors and spice markets.' },
      { day: 'Day 4', title: 'Spice and sea', description: 'A spice farm in the morning, a dhow cruise at sunset.' },
      { day: 'Day 5', title: 'Beach day', description: 'Slow morning on the white sand before your flight home.' },
    ],
    included: [
      'Private safari vehicle and guide',
      'Flight Arusha to Zanzibar',
      'Beach hotel with breakfast',
      'All tours and park fees',
    ],
    excluded,
  },
  {
    slug: 'big-five-classic',
    title: 'Big Five Classic',
    category: 'Safari',
    days: 5,
    priceFrom: 2190,
    image: IMG.lion,
    blurb: 'Lion, leopard, elephant, buffalo and rhino in five unhurried days.',
    bestTime: 'All year',
    groupSize: '2-6 guests',
    highlights: ['Central Serengeti cats', 'Black rhino in the crater', 'Sundowners on the plains', 'Maasai village visit'],
    itinerary: [
      { day: 'Day 1', title: 'Lake Manyara', description: 'A gentle first drive through groundwater forest and baboon troops.' },
      { day: 'Day 2-3', title: 'Central Serengeti', description: 'Seronera valley, the best place in Africa to find leopard.' },
      { day: 'Day 4', title: 'Ngorongoro Crater', description: 'A full day on the crater floor looking for black rhino.' },
      { day: 'Day 5', title: 'Back to Arusha', description: 'Coffee farm lunch on the way back to town.' },
    ],
    included: [
      'Private 4x4 with pop-up roof',
      'All park and crater fees',
      'Mid-range lodges, full board',
      'Bottled water on every drive',
    ],
    excluded,
  },
  {
    slug: 'zanzibar-escape',
    title: 'Zanzibar Escape',
    category: 'Beach',
    days: 6,
    priceFrom: 1290,
    image: IMG.savanna,
    blurb: 'Turquoise lagoons, sandbanks and slow island days.',
    bestTime: 'June to March',
    groupSize: 'Any size',
    highlights: ['Mnemba Atoll snorkelling', 'Jozani forest red colobus', 'Nungwi sunsets', 'Seafood on a sandbank'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival', description: 'Transfer to a quiet beach villa on the east coast.' },
      { day: 'Day 2', title: 'Mnemba Atoll', description: 'Snorkel with turtles and dolphins in clear reef water.' },
      { day: 'Day 3', title: 'Jozani forest', description: 'Meet the rare red colobus monkeys and walk the mangroves.' },
      { day: 'Day 4-5', title: 'Free days', description: 'Kite surfing, spa, or simply a hammock and a book.' },
      { day: 'Day 6', title: 'Departure', description: 'A last swim before your transfer to the airport.' },
    ],
    included: [
      'Beach villa with breakfast',
      'Airport transfers',
      'Snorkel trip with lunch',
      'Jozani forest guided walk',
    ],
    excluded,
  },
  {
    slug: 'southern-wilds',
    title: 'Southern Wilds',
    category: 'Safari',
    days: 9,
    priceFrom: 4650,
    image: IMG.camp,
    blurb: 'Ruaha and Nyerere: remote parks with few vehicles and many lions.',
    bestTime: 'June to October',
    groupSize: '2-4 guests',
    highlights: ['Walking safaris', 'Boat safari on the Rufiji', 'Wild dog packs', 'Remote bush camps'],
    itinerary: [
      { day: 'Day 1', title: 'Dar es Salaam', description: 'Arrive and fly straight into Nyerere National Park.' },
      { day: 'Day 2-4', title: 'Nyerere', description: 'Boat safaris among hippos and walking safaris with an armed ranger.' },
      { day: 'Day 5-8', title: 'Ruaha', description: 'Big prides, greater kudu and baobab-studded hills.' },
      { day: 'Day 9', title: 'Fly home', description: 'Light aircraft back to Dar es Salaam for your connection.' },
    ],
    included: [
      'All light aircraft flights',
      'Luxury bush camps, all inclusive',
      'Walking and boat safaris',
      'Park fees and conservation levies',
    ],
    excluded,
  },
]

export const getTrip = (slug) => trips.find((t) => t.slug === slug)

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const destinations = [
  {
    slug: 'serengeti', name: 'Serengeti', region: 'Northern circuit', tagline: 'Endless plains, endless herds.',
    description: "Thirty thousand square kilometres of grassland where two million wildebeest and zebra move in a never-ending circle, followed by Africa's densest population of lions.",
    image: IMG.migration, fact: { value: '14,763 km²', label: 'of protected plains' },
    wildlife: ['Lion', 'Cheetah', 'Wildebeest', 'Leopard'],
    seasons: [2,2,1,0,0,1,2,2,2,2,1,1],
    seasonNote: 'Calving in the south from January to February, river crossings in the north from July to October.',
    tripSlugs: ['great-migration','big-five-classic'],
  },
  {
    slug: 'ngorongoro', name: 'Ngorongoro Crater', region: 'Northern circuit', tagline: 'A lost world inside a volcano.',
    description: "The world's largest intact caldera holds around 25,000 animals on its floor, including one of the last safe homes of the black rhino.",
    image: IMG.ngorongoro, fact: { value: '600 m', label: 'deep crater walls' },
    wildlife: ['Black rhino', 'Lion', 'Flamingo', 'Hippo'],
    seasons: [2,2,1,1,1,2,2,2,2,2,1,2],
    seasonNote: 'Wildlife stays in the crater all year. June to October is driest and clearest.',
    tripSlugs: ['great-migration','big-five-classic'],
  },
  {
    slug: 'tarangire', name: 'Tarangire', region: 'Northern circuit', tagline: 'Land of giants.',
    description: 'Ancient baobabs tower over the Tarangire River, where hundreds of elephants gather in the dry months, along with some of the quietest roads in the north.',
    image: IMG.tarangire, fact: { value: '300+', label: 'elephants in a single herd' },
    wildlife: ['Elephant', 'Python', 'Lion', 'Oryx'],
    seasons: [1,1,0,0,0,2,2,2,2,2,1,1],
    seasonNote: 'Best from June to October, when the river is the only water for miles.',
    tripSlugs: ['great-migration','stars-and-spice'],
  },
  {
    slug: 'lake-manyara', name: 'Lake Manyara', region: 'Northern circuit', tagline: 'Flamingos under the Rift wall.',
    description: 'A soda lake at the foot of the Great Rift Valley escarpment, famous for tree-climbing lions, baboon troops and pink rafts of flamingo.',
    image: IMG.lakeManyara, fact: { value: '400+', label: 'bird species recorded' },
    wildlife: ['Flamingo', 'Tree-climbing lion', 'Baboon', 'Hippo'],
    seasons: [1,1,1,0,0,1,2,2,2,2,2,1],
    seasonNote: 'Dry season for mammals, November to April for migratory birds.',
    tripSlugs: ['stars-and-spice','big-five-classic'],
  },
  {
    slug: 'kilimanjaro', name: 'Kilimanjaro', region: 'Mountain', tagline: 'Walk to the roof of Africa.',
    description: "The world's tallest free-standing mountain climbs through five climate zones, from rainforest to arctic summit, and needs no technical climbing.",
    image: IMG.kilimanjaro, fact: { value: '5,895 m', label: 'to Uhuru Peak' },
    wildlife: ['Colobus monkey', 'Blue monkey', 'Eland', 'Lammergeier'],
    seasons: [2,2,1,0,0,1,2,2,2,2,0,1],
    seasonNote: 'Clearest skies from January to March and June to October.',
    tripSlugs: ['roof-of-africa'],
  },
  {
    slug: 'zanzibar', name: 'Zanzibar', region: 'Coast', tagline: 'Spice, sand and slow time.',
    description: 'Turquoise lagoons, the carved doors of Stone Town and sandbanks that appear at low tide. The perfect place to rest after a safari.',
    image: IMG.zanzibar, fact: { value: '28 °C', label: 'average sea temperature' },
    wildlife: ['Red colobus', 'Sea turtle', 'Dolphin', 'Whale shark'],
    seasons: [2,2,1,0,0,2,2,2,2,2,1,2],
    seasonNote: 'Warm all year. Avoid the long rains in April and May.',
    tripSlugs: ['zanzibar-escape','stars-and-spice'],
  },
  {
    slug: 'ruaha', name: 'Ruaha', region: 'Southern circuit', tagline: 'Wild, remote, all yours.',
    description: "Tanzania's largest national park sees only a few thousand visitors a year. Big lion prides, wild dogs and greater kudu roam rugged baobab hills.",
    image: IMG.ruaha, fact: { value: '10%', label: "of Africa's lions live here" },
    wildlife: ['Lion', 'Wild dog', 'Greater kudu', 'Elephant'],
    seasons: [1,0,0,0,0,2,2,2,2,2,1,1],
    seasonNote: 'Go from June to October. Many camps close in the green season.',
    tripSlugs: ['southern-wilds'],
  },
  {
    slug: 'nyerere', name: 'Nyerere', region: 'Southern circuit', tagline: 'Safari by boat and on foot.',
    description: "Formerly the Selous, one of Africa's largest protected areas. Explore its lakes and channels by boat and walk the bush with an armed ranger.",
    image: IMG.elephant, fact: { value: '30,893 km²', label: 'larger than Belgium' },
    wildlife: ['Hippo', 'Crocodile', 'Wild dog', 'Elephant'],
    seasons: [1,1,0,0,0,2,2,2,2,2,1,1],
    seasonNote: 'June to October for walking and boat safaris on low water.',
    tripSlugs: ['southern-wilds'],
  },
]

export const places = ['Serengeti', 'Ngorongoro', 'Kilimanjaro', 'Tarangire', 'Zanzibar', 'Lake Manyara', 'Ruaha']

export const animals = [
  { name: 'Lion', swahili: 'Simba', fact: 'Prides of up to 30 roam the Serengeti plains.', image: IMG.lion },
  { name: 'Elephant', swahili: 'Tembo', fact: 'Tarangire hosts herds of over 300 in dry season.', image: IMG.elephant },
  { name: 'Leopard', swahili: 'Chui', fact: 'Spotted resting in acacia branches at dusk.', image: IMG.leopard },
  { name: 'Zebra', swahili: 'Punda milia', fact: 'No two stripe patterns are ever the same.', image: IMG.zebra },
  { name: 'Giraffe', swahili: 'Twiga', fact: "Tanzania's national animal, up to 5.5 m tall.", image: IMG.giraffe },
]

export const stats = [
  { value: 1200, suffix: '+', label: 'Travellers guided' },
  { value: 48, suffix: '', label: 'Local guides' },
  { value: 16, suffix: '', label: 'Parks & reserves' },
  { value: 2014, suffix: '', label: 'Founded in Arusha' },
]

export const EASE = [0.22, 1, 0.36, 1]
