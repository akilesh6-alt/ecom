import { Vendor, Product } from '../types';

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'v_little_oak',
    name: 'Little Oak Montessori',
    slug: 'little-oak-montessori',
    tagline: 'Hand-turned beechwood & natural sensory tools for young hands',
    location: 'Portland, OR',
    rating: 4.95,
    reviewCount: 348,
    totalSales: 1840,
    joinedYear: 2023,
    story: 'Started by certified Montessori educators Clara & Marcus. Every piece is cut from sustainably harvested European beechwood, tumbled smooth without micro-splinters, and finished with organic food-safe beeswax oil.',
    specialty: 'Sensory Toddler & Infant Wooden Toys',
    badges: ['FSC Certified Wood', 'EN71 Child-Safe', 'Non-Toxic Beeswax'],
    bannerGradient: 'from-amber-100 to-orange-50',
    avatarBg: 'bg-amber-600'
  },
  {
    id: 'v_cloudlet',
    name: 'Cloudlet Organics',
    slug: 'cloudlet-organics',
    tagline: '100% GOTS certified heirloom cotton essentials for babies & toddlers',
    location: 'Copenhagen, Denmark',
    rating: 4.9,
    reviewCount: 226,
    totalSales: 2150,
    joinedYear: 2022,
    story: 'Cloudlet crafts gentle, breathable knitwear without harsh synthetic dyes, pesticide residues, or scratchy seams. Tested thoroughly for eczema-prone baby skin.',
    specialty: '0-4Y Organic Baby & Toddler Apparel',
    badges: ['100% GOTS Organic', 'Nickel-Free Snaps', 'OEKO-TEX Class 1'],
    bannerGradient: 'from-emerald-50 to-teal-50',
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 'v_wonderlab',
    name: 'WonderLab STEM & Robotics',
    slug: 'wonderlab-stem',
    tagline: 'Tactile engineering, magnetic puzzles, and screen-free science',
    location: 'Austin, TX',
    rating: 4.88,
    reviewCount: 412,
    totalSales: 3420,
    joinedYear: 2021,
    story: 'Founded by two aerospace engineers who wanted their kids to build with their hands before touching screens. WonderLab crafts ultra-durable magnetic tiles with reinforced ultrasonic welding.',
    specialty: '3-10Y STEM & Problem Solving',
    badges: ['Encapsulated Magnets', 'Food-Grade ABS', 'ASTM F963 Tested'],
    bannerGradient: 'from-blue-50 to-indigo-50',
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 'v_moonbeam',
    name: 'Moonbeam Sleep & Tales',
    slug: 'moonbeam-sleep-tales',
    tagline: 'Soothing bedtime storybooks, gentle glow lights & dream companions',
    location: 'Bristol, UK',
    rating: 4.92,
    reviewCount: 189,
    totalSales: 1290,
    joinedYear: 2023,
    story: 'Crafting sleep rituals backed by pediatric sleep hygiene principles. Low blue-light warm nightlights and hardback cloth-bound storybooks featuring bedtime mindfulness.',
    specialty: '0-7Y Bedtime & Calming Routines',
    badges: ['Zero Blue Light', 'Recycled Heavy Board', 'BPA-Free Soft Silicone'],
    bannerGradient: 'from-violet-50 to-purple-50',
    avatarBg: 'bg-purple-600'
  },
  {
    id: 'v_sunsprout',
    name: 'SunSprout Active Kids',
    slug: 'sunsprout-active',
    tagline: 'Gross-motor balance boards, outdoor explorer gear & active play',
    location: 'Boulder, CO',
    rating: 4.85,
    reviewCount: 154,
    totalSales: 980,
    joinedYear: 2024,
    story: 'Inspiring healthy physical confidence in kids from their first wobbly steps to park exploration. Ergonomic curves and non-slip eco rubber bottoms protect both hardwood and knees.',
    specialty: '2-10Y Physical Development & Outdoors',
    badges: ['Holds Up to 150 lbs', 'Natural Birch Ply', 'Non-Slip Eco Felt'],
    bannerGradient: 'from-rose-50 to-amber-50',
    avatarBg: 'bg-rose-600'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'Artisan Beechwood Rainbow Ring Stacker & Bear Rattle',
    vendorId: 'v_little_oak',
    vendorName: 'Little Oak Montessori',
    category: 'Wooden & Montessori',
    ageStage: '0-12m',
    ageLabel: '0 - 12 Months',
    price: 34.00,
    originalPrice: 42.00,
    rating: 4.96,
    reviewCount: 88,
    image: '/src/assets/images/baby_wooden_toys_1791611885583.jpg',
    description: 'A soothing two-piece heirloom set comprising a smooth tactile wooden bear rattle with captive rings and a 5-tier rainbow stacking tower. Develops infant palmar grasp, eye-hand coordination, and tactile discernment.',
    features: [
      'Finished with natural organic beeswax and coconut oil',
      'Soft pastel water-based stains that will not flake or leach',
      'Rounded 360-degree edges safe for curious teething gums',
      'Includes breathable organic linen storage pouch'
    ],
    safetyBadges: ['FSC Certified Beechwood', 'Non-Toxic Dye', 'Choke-Hazard Tested'],
    materials: 'Sustainably sourced European Beechwood, organic food-grade beeswax.',
    inStock: true,
    stockCount: 24,
    isFeatured: true,
    reviews: [
      {
        id: 'rev_1',
        author: 'Elena R.',
        childAge: '6 Months',
        rating: 5,
        date: '3 days ago',
        comment: 'The wood is astonishingly silky smooth! My 6-month-old loves clutching the little bear and shaking the wooden rings. No chemical odor at all.',
        verifiedPurchase: true
      },
      {
        id: 'rev_2',
        author: 'David K.',
        childAge: '9 Months',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Worth every penny. The colors are muted and tasteful, and the stacker base is rounded safely so it doesn’t poke if tipped over.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_2',
    title: 'Magnetic Architectural Prism & Geometry Discovery Set (64 Pcs)',
    vendorId: 'v_wonderlab',
    vendorName: 'WonderLab STEM & Robotics',
    category: 'STEM & Puzzles',
    ageStage: '4-6y',
    ageLabel: '4 - 6 Years',
    price: 58.00,
    originalPrice: 68.00,
    rating: 4.94,
    reviewCount: 142,
    image: '/src/assets/images/stem_creative_blocks_1791611897026.jpg',
    description: 'High-transparency magnetic geometric tiles with neodymium rare-earth safety pins. Encourages spatial reasoning, structural physics, architectural towers, and color refraction play on light tables.',
    features: [
      'Ultrasonically welded rivets keep magnets hermetically sealed',
      'Beveled lattice design resists surface scratching during floor play',
      'Compatible with all major STEM magnetic tile brands',
      'Includes illustrated 40-challenge building workbook'
    ],
    safetyBadges: ['BPA & Phthalate Free', 'ASTM / CE Certified', 'Choke-Hazard Tested'],
    materials: 'Food-grade BPA-free MABS polymer, encapsulated N35 neodymium magnets.',
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    reviews: [
      {
        id: 'rev_3',
        author: 'Sarah M.',
        childAge: '4 Years',
        rating: 5,
        date: 'Yesterday',
        comment: 'My daughter built a whole rocket ship the first hour it arrived! The magnets click together with a satisfying, strong hold that doesn’t collapse.',
        verifiedPurchase: true
      },
      {
        id: 'rev_4',
        author: 'Jason T.',
        childAge: '5 Years',
        rating: 5,
        date: '1 week ago',
        comment: 'Very thick durable plastic with stainless rivets. Excellent vendor packaging and prompt delivery.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_3',
    title: 'GOTS Organic Waffle Cotton Kimono Romper & Beanie Set',
    vendorId: 'v_cloudlet',
    vendorName: 'Cloudlet Organics',
    category: 'Organic Apparel',
    ageStage: '0-12m',
    ageLabel: '0 - 12 Months',
    price: 36.00,
    rating: 4.88,
    reviewCount: 64,
    image: '/src/assets/images/hero_kids_wonderland_1791611873157.jpg',
    description: 'Sumptuously soft, thermal-regulating waffle knit sleeper. Side kimono tie allows diaper changes without pulling clothing over baby’s delicate fontanelle. Includes fold-over scratch mitts and matching knotted cap.',
    features: [
      '100% Certified Organic Aegean cotton (240 GSM weight)',
      'Lead-free, nickel-free brass snaps along inner leg inseam',
      'Flatlock anti-chafing seams gentle on eczema-prone skin',
      'Pre-washed with hypoallergenic botanical cleansers'
    ],
    safetyBadges: ['100% GOTS Organic', 'Non-Toxic Dye', 'ASTM / CE Certified'],
    materials: '100% GOTS certified organic Aegean cotton.',
    inStock: true,
    stockCount: 19,
    reviews: [
      {
        id: 'rev_5',
        author: 'Nadia P.',
        childAge: '2 Months',
        rating: 5,
        date: '4 days ago',
        comment: 'The waffle texture is so soft and stretchy. Makes 2am diaper changes painless with the clever snap placement.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_4',
    title: 'Nordic Curved Birchwood Balance & Rocker Board (Felt-Lined)',
    vendorId: 'v_sunsprout',
    vendorName: 'SunSprout Active Kids',
    category: 'Active & Outdoor',
    ageStage: '1-3y',
    ageLabel: '1 - 3 Years',
    price: 79.00,
    originalPrice: 95.00,
    rating: 4.91,
    reviewCount: 57,
    image: '/src/assets/images/hero_kids_wonderland_1791611873157.jpg',
    description: 'An open-ended Montessori staple. Flips from a balancing bridge to a slide, a doll cradle, a tunnel for toy trains, or a cozy reading rocker. Underside lined in dense recycled wool felt to protect hardwood floors.',
    features: [
      'Pressed with 10 layers of European sustainable birch veneer',
      'Supports up to 220 lbs (strong enough for parent & toddler together)',
      'Silent cushioning felt base prevents floor scuffing',
      'Water-based matte ecological protective sealant'
    ],
    safetyBadges: ['FSC Certified Beechwood', 'ASTM / CE Certified'],
    materials: 'Baltic Birch Plywood, 100% recycled PET acoustic wool felt.',
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    reviews: [
      {
        id: 'rev_6',
        author: 'Liam B.',
        childAge: '2.5 Years',
        rating: 5,
        date: '5 days ago',
        comment: 'My toddler uses this every single day. She climbs it, turns it over into a bridge for cars, and rocks on it while looking at picture books.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_5',
    title: 'GlowWhale Low-Light Bedtime Silicone Night Companion',
    vendorId: 'v_moonbeam',
    vendorName: 'Moonbeam Sleep & Tales',
    category: 'Books & Bedtime',
    ageStage: '1-3y',
    ageLabel: '1 - 3 Years',
    price: 28.50,
    rating: 4.89,
    reviewCount: 73,
    image: '/src/assets/images/baby_wooden_toys_1791611885583.jpg',
    description: 'Squishable, soothing food-grade silicone companion with 2200K amber warm light that does not suppress child melatonin production. Tap sensor with 30-minute auto shut-off timer and rechargeable USB-C battery.',
    features: [
      'Pediatric sleep specialist approved 2200K amber wavelength',
      'Squeezable drop-proof body remains cool to the touch all night',
      'Cordless with 16-hour runtime between gentle charges',
      'Zero BPA, PVC, or phthalates'
    ],
    safetyBadges: ['BPA & Phthalate Free', 'ASTM / CE Certified'],
    materials: 'Food-grade LFGB silicone, internal sealed LED module.',
    inStock: true,
    stockCount: 42,
    reviews: [
      {
        id: 'rev_7',
        author: 'Chloe G.',
        childAge: '3 Years',
        rating: 5,
        date: '1 week ago',
        comment: 'Completely cured our bedtime fear of the dark. My son loves carrying the little whale to the bathroom at night.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_6',
    title: 'Little Botanist Plant Press & Organic Watercolor Studio',
    vendorId: 'v_wonderlab',
    vendorName: 'WonderLab STEM & Robotics',
    category: 'Art & Crafts',
    ageStage: '7-10y',
    ageLabel: '7 - 10 Years',
    price: 44.00,
    rating: 4.86,
    reviewCount: 39,
    image: '/src/assets/images/stem_creative_blocks_1791611897026.jpg',
    description: 'A screen-free botanical nature exploration kit. Real solid brass wing nuts with birch flower press plates, archival blotting paper, 12 plant-pigment watercolor cakes made from beets, spirulina, and turmeric, and squirrel-soft synthetic brushes.',
    features: [
      'Solid wood press plates engraved with leaf identification guide',
      '100% edible-grade vegetable & mineral watercolor pigments',
      'Includes field observation journal with cotton rag watercolor paper',
      'Designed to foster outdoor observation and mindfulness'
    ],
    safetyBadges: ['Non-Toxic Dye', 'FSC Certified Beechwood', 'ASTM / CE Certified'],
    materials: 'Birch wood, brass hardware, plant-based gum arabic pigments.',
    inStock: true,
    stockCount: 16,
    reviews: [
      {
        id: 'rev_8',
        author: 'Kirsten V.',
        childAge: '8 Years',
        rating: 5,
        date: '2 weeks ago',
        comment: 'My 8yo spent all weekend collecting leaves and pressing them. The pigments have such rich, earthy tones.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_7',
    title: 'Solid Beechwood Fruit & Veggie Prep Board with Safe Wooden Knife',
    vendorId: 'v_little_oak',
    vendorName: 'Little Oak Montessori',
    category: 'Wooden & Montessori',
    ageStage: '1-3y',
    ageLabel: '1 - 3 Years',
    price: 29.00,
    rating: 4.93,
    reviewCount: 112,
    image: '/src/assets/images/baby_wooden_toys_1791611885583.jpg',
    description: 'Empower toddlers in real kitchen prep! The blunt wooden chopper effortlessly cuts soft bananas, avocados, strawberries, and dough without sharp blades that could nick tiny fingers. Includes miniature prep board.',
    features: [
      'Ergonomically contoured handle suited for 1-4 year old grip',
      'Natural food-grade flaxseed oil finish',
      'Teaches self-efficacy and practical life skills',
      'Easy wipe clean maintenance'
    ],
    safetyBadges: ['FSC Certified Beechwood', 'Non-Toxic Dye', 'Choke-Hazard Tested'],
    materials: 'Natural Solid European Beechwood.',
    inStock: true,
    stockCount: 31,
    reviews: [
      {
        id: 'rev_9',
        author: 'Monica W.',
        childAge: '2 Years',
        rating: 5,
        date: '3 weeks ago',
        comment: 'My 2-year old cuts his own bananas every morning now with immense pride! Completely safe and feels wonderful in hand.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_8',
    title: 'Solar Rover & Hydraulic Mechanical Arm Discovery Lab',
    vendorId: 'v_wonderlab',
    vendorName: 'WonderLab STEM & Robotics',
    category: 'STEM & Puzzles',
    ageStage: '7-10y',
    ageLabel: '7 - 10 Years',
    price: 52.00,
    originalPrice: 62.00,
    rating: 4.95,
    reviewCount: 94,
    image: '/src/assets/images/stem_creative_blocks_1791611897026.jpg',
    description: 'Build a functioning dual-mode planetary explorer powered by pure sunlight or pressurized water hydraulics. No batteries, soldering, or glue required. Clear snap-fit parts allow kids to see mechanical gears transmitting force in real time.',
    features: [
      'High-efficiency monocrystalline solar mini-panel',
      'Piston fluid syringe mechanism demonstrates Pascal’s law',
      'Illustrated visual blueprint manual with science fun facts',
      'Zero soldering or sharp metal burrs'
    ],
    safetyBadges: ['BPA & Phthalate Free', 'ASTM / CE Certified'],
    materials: 'High-impact ABS polymer, silicone tubing, solar PV cell.',
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    reviews: [
      {
        id: 'rev_10',
        author: 'Arthur C.',
        childAge: '9 Years',
        rating: 5,
        date: '1 week ago',
        comment: 'Exceptional build quality. We put it outside on the driveway on a sunny afternoon and it rolled immediately. My son was ecstatic.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_9',
    title: 'Cloudlet Organic Merino Wool Ribbed Cardigan & Booties',
    vendorId: 'v_cloudlet',
    vendorName: 'Cloudlet Organics',
    category: 'Organic Apparel',
    ageStage: '1-3y',
    ageLabel: '1 - 3 Years',
    price: 48.00,
    rating: 4.87,
    reviewCount: 51,
    image: '/src/assets/images/hero_kids_wonderland_1791611873157.jpg',
    description: 'Chunky yet weightless organic merino wool knit cardigan with polished natural coconut shell buttons. Retains cozy warmth in winter without overheating during playground sprints.',
    features: [
      'Mulesing-free ethical organic certified merino wool',
      'Naturally water-repellent and odor-resistant fibers',
      'Generous raglan sleeves designed to roll up as toddler grows',
      'Includes matching anti-slip grippy knit booties'
    ],
    safetyBadges: ['100% GOTS Organic', 'Non-Toxic Dye', 'ASTM / CE Certified'],
    materials: '100% Organic Merino Wool, natural coconut buttons.',
    inStock: true,
    stockCount: 15,
    reviews: [
      {
        id: 'rev_11',
        author: 'Rebecca S.',
        childAge: '18 Months',
        rating: 5,
        date: '2 weeks ago',
        comment: 'So heirloom quality! We’ll be passing this down to our second child. Extremely soft against the neck without any itchiness.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_10',
    title: 'The Great Forest Bedtime Symphony (Hardcover Clothbound Storybook)',
    vendorId: 'v_moonbeam',
    vendorName: 'Moonbeam Sleep & Tales',
    category: 'Books & Bedtime',
    ageStage: '4-6y',
    ageLabel: '4 - 6 Years',
    price: 24.00,
    rating: 4.97,
    reviewCount: 68,
    image: '/src/assets/images/baby_wooden_toys_1791611885583.jpg',
    description: 'A poetic, lulling bedtime adventure following woodland animals preparing their nests for evening. Features rhythmic soothing prose designed by speech therapists to gently slow down a child’s breathing and heart rate before sleep.',
    features: [
      'Foil-embossed textured cloth spine and heavyweight art paper',
      'Printed with renewable soy inks on FSC certified recycled paper',
      'Lyrical rhyming cadence proven to help energetic kids settle',
      '48 fully illustrated whimsical full-bleed spreads'
    ],
    safetyBadges: ['Non-Toxic Dye', 'ASTM / CE Certified'],
    materials: 'FSC recycled heavy paperboard, soy-based inks.',
    inStock: true,
    stockCount: 45,
    reviews: [
      {
        id: 'rev_12',
        author: 'Daniel L.',
        childAge: '4 Years',
        rating: 5,
        date: '4 days ago',
        comment: 'Has become our mandatory bedtime book. The illustrations are magical and by page 30 my daughter is yawning comfortably.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_11',
    title: 'Magna-Tiles Marble Run & Dynamic Kinetic Pipeline Kit',
    vendorId: 'v_wonderlab',
    vendorName: 'WonderLab STEM & Robotics',
    category: 'STEM & Puzzles',
    ageStage: '4-6y',
    ageLabel: '4 - 6 Years',
    price: 64.00,
    rating: 4.91,
    reviewCount: 83,
    image: '/src/assets/images/stem_creative_blocks_1791611897026.jpg',
    description: 'Clear translucent magnetic curves, spirals, and drop funnels that clip securely onto magnetic base tiles. Kids design gravity-driven marble roller coasters with light-up motion sensor spheres.',
    features: [
      'Large 35mm hollow glow spheres (safely oversized to prevent swallowing)',
      'Interlocking twist clips guarantee leak-proof marble runs',
      'Promotes patience, kinetic trajectory planning, and trial-and-error',
      'Includes storage cinch sack'
    ],
    safetyBadges: ['BPA & Phthalate Free', 'Choke-Hazard Tested', 'ASTM / CE Certified'],
    materials: 'Polycarbonate & ABS food-safe resins.',
    inStock: true,
    stockCount: 28,
    reviews: [
      {
        id: 'rev_13',
        author: 'Fiona H.',
        childAge: '5 Years',
        rating: 5,
        date: '5 days ago',
        comment: 'The light-up spheres zooming through the clear tubes are mesmerizing! Kept three kids busy for two hours straight.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod_12',
    title: 'Toddler Ergonomic Balance Strider (Airless Puncture-Proof Tires)',
    vendorId: 'v_sunsprout',
    vendorName: 'SunSprout Active Kids',
    category: 'Active & Outdoor',
    ageStage: '1-3y',
    ageLabel: '1 - 3 Years',
    price: 92.00,
    originalPrice: 110.00,
    rating: 4.90,
    reviewCount: 46,
    image: '/src/assets/images/hero_kids_wonderland_1791611873157.jpg',
    description: 'Featherlight 4.8 lb aircraft-grade aluminum alloy balance bike. Ultra-low step-through frame enables 18-month-old toddlers to mount independently. Seat and handlebars adjust without tools from 18 months up to 4 years.',
    features: [
      'Never-flat EVA foam rubber polymer tires (zero pump needed)',
      'Built-in integrated toddler footrests for downhill gliding',
      'Padded mini saddle engineered for narrow toddler pelvic anatomy',
      'Safety steering limiter prevents sudden over-turning jackknifes'
    ],
    safetyBadges: ['ASTM / CE Certified'],
    materials: 'Aircraft Grade 6061 Aluminum, puncture-proof EVA polymer.',
    inStock: true,
    stockCount: 11,
    reviews: [
      {
        id: 'rev_14',
        author: 'Brian O.',
        childAge: '2 Years',
        rating: 5,
        date: '1 week ago',
        comment: 'So light that my 2-year-old picks it up himself when he drops it on the grass! He learned how to coast within 3 days.',
        verifiedPurchase: true
      }
    ]
  }
];

export const INITIAL_BUNDLES: import('../types').GiftBundle[] = [
  {
    id: 'bundle_1',
    title: 'The Calming Infant & Sleep Starter Box',
    tagline: 'Grounded organic comfort for sweet slumber and gentle mornings',
    ageStage: '0-12m',
    ageLabel: '0 - 12 Months',
    price: 88.00,
    originalPrice: 98.50,
    image: '/src/assets/images/baby_wooden_toys_1791611885583.jpg',
    productIds: ['prod_1', 'prod_3', 'prod_5'],
    description: 'Includes Little Oak beechwood rattle, Cloudlet organic kimono sleeper, and Moonbeam soft bedtime glow whale. Save 10% on direct workshop bundle.',
    badge: 'Save 10% Bundle'
  },
  {
    id: 'bundle_2',
    title: 'The Montessori Active Toddler Discovery Crate',
    tagline: 'Balance, coordination, and kitchen self-efficacy',
    ageStage: '1-3y',
    ageLabel: '1 - 3 Years',
    price: 135.00,
    originalPrice: 156.00,
    image: '/src/assets/images/hero_kids_wonderland_1791611873157.jpg',
    productIds: ['prod_4', 'prod_7', 'prod_9'],
    description: 'Features the Nordic curved balance board, solid wood prep board, and organic merino cardigan. Designed to encourage joyful autonomy.',
    badge: 'Popular for 2nd Birthdays'
  },
  {
    id: 'bundle_3',
    title: 'The Young Inventor STEM & Architecture Set',
    tagline: 'Magnetic prisms, hydraulic physics, and kinetic experiments',
    ageStage: '4-6y',
    ageLabel: '4 - 10 Years',
    price: 145.00,
    originalPrice: 174.00,
    image: '/src/assets/images/stem_creative_blocks_1791611897026.jpg',
    productIds: ['prod_2', 'prod_8', 'prod_11'],
    description: 'Comprehensive screen-free engineering lab featuring 64-piece prisms, marble kinetic tracks, and planetary solar rover kit.',
    badge: 'Best STEM Value'
  }
];
