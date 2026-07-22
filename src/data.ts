import type { Product, Category } from './types';

export const categories: {
  id: Category;
  labelKey: string;
  blurbKey: string;
  image: string;
}[] = [
  {
    id: 'flip-flops',
    labelKey: 'category.flipflops',
    blurbKey: 'category.flipflops.blurb',
    image:
      'https://images.pexels.com/photos/8456247/pexels-photo-8456247.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'womens-sandals',
    labelKey: 'category.womens',
    blurbKey: 'category.womens.blurb',
    image:
      'https://images.pexels.com/photos/4996974/pexels-photo-4996974.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'mens-sandals',
    labelKey: 'category.mens',
    blurbKey: 'category.mens.blurb',
    image:
      'https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'accessories',
    labelKey: 'category.accessories',
    blurbKey: 'category.accessories.blurb',
    image:
      'https://images.pexels.com/photos/16770399/pexels-photo-16770399.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'reef-classic-flip',
    name: {
      en: 'Reef Classic Flip',
      fr: 'Tong Reef Classic',
      ar: 'صندل ريف الكلاسيكي',
    },
    brand: 'SOLÉ',
    category: 'flip-flops',
    price: 32,
    compareAt: 42,
    rating: 4.8,
    reviewCount: 1284,
    colors: [
      { name: 'Sand', hex: '#cb9a64' },
      { name: 'Coral', hex: '#fa4621' },
      { name: 'Black', hex: '#1f1f1d' },
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    images: [
      'https://images.pexels.com/photos/8456247/pexels-photo-8456247.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/18353021/pexels-photo-18353021/free-photo-of-flip-flops-on-beach.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['Bestseller'],
    description: {
      en: 'The everyday icon. Soft arch support, recycled foam footbed, and a non-slip rubber outsole that grips wet sand.',
      fr: "L’icône du quotidien. Support de voûte souple, semelle en mousse recyclée et outsole en caoutchouc antidérapant qui adhère sur le sable mouillé.",
      ar: 'أيقونة اليوم. دعم نعل مرن، نعل داخلي من رغوة معاد تدويرها، ونعل خارجي من المطاط المضاد للانزلاق يتماسك على الرمل المبلل.',
    },
    features: [
      { en: 'Recycled foam footbed', fr: 'Semelle en mousse recyclée', ar: 'نعل داخلي من رغوة معاد تدويرها' },
      { en: 'Arch support', fr: 'Support de voûte', ar: 'دعم قوس القدم' },
      { en: 'Non-slip rubber outsole', fr: 'Outsole caoutchouc antidérapant', ar: 'نعل خارجي مطاطي مضاد للانزلاق' },
      { en: 'Vegan materials', fr: 'Matériaux vegan', ar: 'مواد نباتية' },
    ],
    bestSeller: true,
  },
  {
    id: 'p2',
    slug: 'havana-strappy-sandal',
    name: {
      en: 'Havana Strappy Sandal',
      fr: 'Sandale Havana à lanières',
      ar: 'صندل هافانا بأشرطة',
    },
    brand: 'SOLÉ',
    category: 'womens-sandals',
    price: 68,
    compareAt: 85,
    rating: 4.9,
    reviewCount: 642,
    colors: [
      { name: 'Tan', hex: '#a86a3e' },
      { name: 'White', hex: '#f5ecdf' },
      { name: 'Ocean', hex: '#2f9386' },
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    images: [
      'https://images.pexels.com/photos/4996974/pexels-photo-4996974.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['New'],
    description: {
      en: "Hand-finished leather straps with a cushioned cork footbed. Dressy enough for dinner, comfy enough for the boardwalk.",
      fr: 'Lanières en cuir finies à la main avec semelle en liège matelassée. Assez élégant pour le dîner, assez confortable pour le boardwalk.',
      ar: 'أشرطة جلدية من finishing يدوي مع نعل من الفلين المبطن. أنيق بما يكفي للعشاء، ومريح بما يكفي للممشى.',
    },
    features: [
      { en: 'Genuine leather straps', fr: 'Lanières en cuir véritable', ar: 'أشرطة جلدية أصلية' },
      { en: 'Cork footbed', fr: 'Semelle en liège', ar: 'نعل من الفلين' },
      { en: 'Adjustable ankle buckle', fr: 'Boucle de cheville ajustable', ar: 'بكلة كاحل قابلة للتعديل' },
      { en: 'Made in Portugal', fr: 'Fabriqué au Portugal', ar: 'صُنع في البرتغال' },
    ],
    newArrival: true,
  },
  {
    id: 'p3',
    slug: 'mariner-leather-sandal',
    name: {
      en: 'Mariner Leather Sandal',
      fr: 'Sandale Mariner en cuir',
      ar: 'صندل مارينر الجلدي',
    },
    brand: 'SOLÉ',
    category: 'mens-sandals',
    price: 89,
    rating: 4.7,
    reviewCount: 318,
    colors: [
      { name: 'Espresso', hex: '#5b3a2b' },
      { name: 'Black', hex: '#1f1f1d' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    images: [
      'https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4996974/pexels-photo-4996974.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: [],
    description: {
      en: 'Full-grain leather and a moulded EVA midsole for all-day support. The kind of sandal that only looks better with time.',
      fr: 'Cuir pleine fleur et semelle intermédiaire EVA moulée pour un soutien toute la journée. Le genre de sandale qui se bonifie avec le temps.',
      ar: 'جلد كامل الحبيبات ونعل وسطي مُشكّل من EVA لدعم طوال اليوم. نوع الصنادل الذي يبدو أفضل مع الوقت.',
    },
    features: [
      { en: 'Full-grain leather', fr: 'Cuir pleine fleur', ar: 'جلد كامل الحبيبات' },
      { en: 'Moulded EVA midsole', fr: 'Semelle EVA moulée', ar: 'نعل وسطي مُشكّل' },
      { en: 'Vibram outsole', fr: 'Outsole Vibram', ar: 'نعل فيبرام' },
      { en: 'Water-friendly', fr: 'Résistant à l’eau', ar: 'مقاوم للماء' },
    ],
  },
  {
    id: 'p4',
    slug: 'sunset-terry-flip',
    name: {
      en: 'Sunset Terry Flip',
      fr: 'Tong Sunset Terry',
      ar: 'صندل صنسيت تيري',
    },
    brand: 'SOLÉ',
    category: 'flip-flops',
    price: 28,
    rating: 4.6,
    reviewCount: 890,
    colors: [
      { name: 'Coral', hex: '#fa4621' },
      { name: 'Sky', hex: '#4fb0a1' },
      { name: 'Cream', hex: '#f5ecdf' },
    ],
    sizes: ['6', '7', '8', '9', '10', '11'],
    images: [
      'https://images.pexels.com/photos/36038095/pexels-photo-36038095.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/8456247/pexels-photo-8456247.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['Eco'],
    description: {
      en: "Terry-lined straps, a squishy cloud-foam footbed, and colours that match every sunset. Pack-and-go light.",
      fr: 'Lanières doublées en éponge, semelle en mousse nuage moelleuse, et des couleurs qui s’accordent à chaque coucher de soleil. Léger à emporter.',
      ar: 'أشرطة مبطنة بتيري، نعل داخلي من رغوة السحاب الناعمة، وألوان تناسب كل غروب. خفيف للحمل.',
    },
    features: [
      { en: 'Terry-lined straps', fr: 'Lanières doublées éponge', ar: 'أشرطة مبطنة بتيري' },
      { en: 'Cloud-foam footbed', fr: 'Semelle mousse nuage', ar: 'نعل رغوة السحاب' },
      { en: 'Recycled rubber', fr: 'Caoutchouc recyclé', ar: 'مطاط معاد تدويره' },
      { en: 'Packable', fr: 'Pliable', ar: 'قابل للحمل' },
    ],
  },
  {
    id: 'p5',
    slug: 'amalfi-wedge-sandal',
    name: {
      en: 'Amalfi Wedge Sandal',
      fr: 'Sandale compensée Amalfi',
      ar: 'صندل أمالفي ذو الكعب',
    },
    brand: 'SOLÉ',
    category: 'womens-sandals',
    price: 95,
    compareAt: 110,
    rating: 4.9,
    reviewCount: 204,
    colors: [
      { name: 'Natural', hex: '#dcbb93' },
      { name: 'Black', hex: '#1f1f1d' },
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    images: [
      'https://images.pexels.com/photos/4996974/pexels-photo-4996974.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['Bestseller'],
    description: {
      en: 'A just-right wedge that lifts without the ache. Jute-wrapped heel, padded leather footbed, and a walkable 2.5" rise.',
      fr: 'Un compensé parfait qui soulève sans douleur. Talon en jute, semelle en cuir matelassée, et 6,5 cm marchables.',
      ar: 'كعب مثالي يرفع دون ألم. كعب ملفوف بالجوت، نعل جلدي مبطن، وارتفاع ٦٫٥ سم قابل للمشي.',
    },
    features: [
      { en: '2.5" jute wedge', fr: 'Compensé 6,5 cm en jute', ar: 'كعب جوت ٦٫٥ سم' },
      { en: 'Padded leather footbed', fr: 'Semelle cuir matelassée', ar: 'نعل جلدي مبطن' },
      { en: 'Non-slip outsole', fr: 'Outsole antidérapant', ar: 'نعل مضاد للانزلاق' },
      { en: 'Made in Spain', fr: 'Fabriqué en Espagne', ar: 'صُنع في إسبانيا' },
    ],
    bestSeller: true,
  },
  {
    id: 'p6',
    slug: 'trail-sport-sandal',
    name: {
      en: 'Trail Sport Sandal',
      fr: 'Sandale Trail Sport',
      ar: 'صندل تريل الرياضي',
    },
    brand: 'SOLÉ',
    category: 'mens-sandals',
    price: 74,
    rating: 4.5,
    reviewCount: 156,
    colors: [
      { name: 'Slate', hex: '#54544c' },
      { name: 'Ocean', hex: '#2f9386' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    images: [
      'https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/36038095/pexels-photo-36038095.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['New'],
    description: {
      en: 'From river crossings to rocky trails. Quick-dry webbing, a protective toe bumper, and grippy lugged outsole.',
      fr: 'Des gués aux sentiers rocheux. Sangle à séchage rapide, pare-chocs de protection, et outrole à crampons adhérent.',
      ar: 'من عبور الأنهار إلى المسارات الصخرية. حزام سريع الجفاف، حاجز واقٍ للأصابع، ونعل خارجي مزود بمسامات مانعة للانزلاق.',
    },
    features: [
      { en: 'Quick-dry webbing', fr: 'Sangle à séchage rapide', ar: 'حزام سريع الجفاف' },
      { en: 'Protective toe bumper', fr: 'Pare-chocs de protection', ar: 'حاجز واقٍ للأصابع' },
      { en: 'Lugged outsole', fr: 'Outrole à crampons', ar: 'نعل مزود بمسامات' },
      { en: 'Machine washable', fr: 'Lavable en machine', ar: 'قابل للغسل في الآلة' },
    ],
    newArrival: true,
  },
  {
    id: 'p7',
    slug: 'palms-straw-hat',
    name: {
      en: 'Palms Straw Hat',
      fr: 'Chapeau de paille Palms',
      ar: 'قبعة بالما القش',
    },
    brand: 'SOLÉ',
    category: 'accessories',
    price: 38,
    rating: 4.8,
    reviewCount: 512,
    colors: [
      { name: 'Natural', hex: '#dcbb93' },
      { name: 'Black band', hex: '#1f1f1d' },
    ],
    sizes: ['S/M', 'L/XL'],
    images: [
      'https://images.pexels.com/photos/16770399/pexels-photo-16770399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/18225013/pexels-photo-18225013/free-photo-of-straw-hat-and-tanning-lotion-on-a-beach.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['Bestseller'],
    description: {
      en: 'Wide-brim hand-woven raffia with a UPF 50+ rating and an adjustable inner band for the perfect fit.',
      fr: 'Large bord en raphia tressé à la main, indice UPF 50+ et bandeau intérieur ajustable pour un maintien parfait.',
      ar: 'حافة عريضة من الرافيا المنسوجة يدويًا بتصنيف UPF 50+ وفرقة داخلية قابلة للتعديل للحصول على مقاس مثالي.',
    },
    features: [
      { en: 'UPF 50+', fr: 'UPF 50+', ar: 'UPF 50+' },
      { en: 'Hand-woven raffia', fr: 'Raphia tressé main', ar: 'رافيا منسوج يدويًا' },
      { en: 'Adjustable inner band', fr: 'Bandeau ajustable', ar: 'فرقة داخلية قابلة للتعديل' },
      { en: 'Packable', fr: 'Pliable', ar: 'قابل للحمل' },
    ],
    bestSeller: true,
  },
  {
    id: 'p8',
    slug: 'horizon-polarized-shades',
    name: {
      en: 'Horizon Polarized Shades',
      fr: 'Lunettes polarisées Horizon',
      ar: 'نظارات هورايزن المستقطبة',
    },
    brand: 'SOLÉ',
    category: 'accessories',
    price: 45,
    compareAt: 60,
    rating: 4.7,
    reviewCount: 738,
    colors: [
      { name: 'Tortoise', hex: '#8a5234' },
      { name: 'Black', hex: '#1f1f1d' },
      { name: 'Coral', hex: '#fa4621' },
    ],
    sizes: ['One size'],
    images: [
      'https://images.pexels.com/photos/16770399/pexels-photo-16770399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/18225013/pexels-photo-18225013/free-photo-of-straw-hat-and-tanning-lotion-on-a-beach.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['New'],
    description: {
      en: 'Polarized, scratch-resistant lenses in a lightweight bio-acetate frame. Glare off the water, gone.',
      fr: 'Verres polarisés résistants aux rayures dans une monture légère en bio-acétate. La reflet sur l’eau, disparu.',
      ar: 'عدسات مستقطبة مقاومة للخدوش في إطار خفيف من الأسيتات الحيوي. انعكاس الماء، اختفى.',
    },
    features: [
      { en: 'Polarized lenses', fr: 'Verres polarisés', ar: 'عدسات مستقطبة' },
      { en: 'Bio-acetate frame', fr: 'Monture bio-acétate', ar: 'إطار أسيتات حيوي' },
      { en: 'Scratch-resistant', fr: 'Anti-rayures', ar: 'مقاوم للخدوش' },
      { en: 'Includes case', fr: 'Étui inclus', ar: 'يأتي مع علبة' },
    ],
    newArrival: true,
  },
  {
    id: 'p9',
    slug: 'coastal-tote-bag',
    name: {
      en: 'Coastal Tote Bag',
      fr: 'Cabas Coastal',
      ar: 'حقيبة كوستال',
    },
    brand: 'SOLÉ',
    category: 'accessories',
    price: 52,
    rating: 4.9,
    reviewCount: 421,
    colors: [
      { name: 'Natural', hex: '#dcbb93' },
      { name: 'Ocean', hex: '#2f9386' },
    ],
    sizes: ['One size'],
    images: [
      'https://images.pexels.com/photos/16770399/pexels-photo-16770399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/18225013/pexels-photo-18225013/free-photo-of-straw-hat-and-tanning-lotion-on-a-beach.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['Eco'],
    description: {
      en: 'A roomy carryall in organic cotton canvas with a zip top, interior pocket, and reinforced base for sandy days.',
      fr: 'Cabas spacieux en toile de coton bio avec fermeture éclair, poche intérieure et base renforcée pour les jours de sable.',
      ar: 'حقيبة حمل واسعة من قماش القطن العضوي مع إغلاق بسحاب، جيب داخلي وقاعدة معززة لأيام الرمل.',
    },
    features: [
      { en: 'Organic cotton canvas', fr: 'Toile coton bio', ar: 'قماش قطن عضوي' },
      { en: 'Zip top closure', fr: 'Fermeture éclair', ar: 'إغلاق بسحاب' },
      { en: 'Interior pocket', fr: 'Poche intérieure', ar: 'جيب داخلي' },
      { en: 'Holds 18L', fr: 'Capacité 18 L', ar: 'سعة ١٨ لتر' },
    ],
  },
  {
    id: 'p10',
    slug: 'drift-slide',
    name: {
      en: 'Drift Slide',
      fr: 'Slide Drift',
      ar: 'صندل درفت المنزلق',
    },
    brand: 'SOLÉ',
    category: 'flip-flops',
    price: 36,
    rating: 4.6,
    reviewCount: 267,
    colors: [
      { name: 'Cream', hex: '#f5ecdf' },
      { name: 'Black', hex: '#1f1f1d' },
      { name: 'Ocean', hex: '#2f9386' },
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    images: [
      'https://images.pexels.com/photos/8456247/pexels-photo-8456247.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/18353021/pexels-photo-18353021/free-photo-of-flip-flops-on-beach.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['New'],
    description: {
      en: 'A slip-on slide with a contoured footbed and double-banded straps. Pool deck to patio, no break-in needed.',
      fr: 'Slide enfile avec semelle moulée et double lanières. De la piscine au patio, sans rodage.',
      ar: 'صندل منزلق بنعل مُشكّل وأشرطة مزدوجة. من حافة المسبح إلى الفناء، دون فترة تكيّف.',
    },
    features: [
      { en: 'Contoured footbed', fr: 'Semelle moulée', ar: 'نعل مُشكّل' },
      { en: 'Double-banded straps', fr: 'Double lanières', ar: 'أشرطة مزدوجة' },
      { en: 'Quick-dry lining', fr: 'Doublure séchage rapide', ar: 'بطانة سريعة الجفاف' },
      { en: 'Unisex', fr: 'Mixte', ar: 'للجنسين' },
    ],
    newArrival: true,
  },
  {
    id: 'p11',
    slug: 'capri-strap-sandal',
    name: {
      en: 'Capri Strap Sandal',
      fr: 'Sandale Capri à lanières',
      ar: 'صندل كابري بأشرطة',
    },
    brand: 'SOLÉ',
    category: 'womens-sandals',
    price: 58,
    rating: 4.7,
    reviewCount: 189,
    colors: [
      { name: 'Rose', hex: '#ff9b80' },
      { name: 'White', hex: '#f5ecdf' },
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    images: [
      'https://images.pexels.com/photos/4996974/pexels-photo-4996974.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: [],
    description: {
      en: 'Minimalist criss-cross straps over a memory-foam footbed. The flat that goes with everything in your summer rotation.',
      fr: 'Lanières croisées minimalistes sur semelle en mousse à mémoire de forme. Le plat qui va avec tout votre été.',
      ar: 'أشرطة متقاطعة بسيطة فوق نعل من رغوة الذاكرة. الصندل الذي يناسب كل شيء في دورتك الصيفية.',
    },
    features: [
      { en: 'Criss-cross straps', fr: 'Lanières croisées', ar: 'أشرطة متقاطعة' },
      { en: 'Memory-foam footbed', fr: 'Mousse à mémoire', ar: 'رغوة الذاكرة' },
      { en: 'Flexible outsole', fr: 'Outsole souple', ar: 'نعل مرن' },
      { en: 'Lightweight', fr: 'Léger', ar: 'خفيف' },
    ],
  },
  {
    id: 'p12',
    slug: 'harbour-fisherman-sandal',
    name: {
      en: 'Harbour Fisherman Sandal',
      fr: 'Sandale Fisherman Harbour',
      ar: 'صندل هاربور فيشيرمان',
    },
    brand: 'SOLÉ',
    category: 'mens-sandals',
    price: 98,
    compareAt: 120,
    rating: 4.8,
    reviewCount: 94,
    colors: [
      { name: 'Tan', hex: '#a86a3e' },
      { name: 'Espresso', hex: '#5b3a2b' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    images: [
      'https://images.pexels.com/photos/8455817/pexels-photo-8455817.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4996974/pexels-photo-4996974.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    badges: ['New'],
    description: {
      en: 'The closed-toe summer shoe. Waxed leather upper, breathable lining, and a Goodyear-welted sole you can resole.',
      fr: 'La chaussure d’été à bout fermé. Tige en cuir ciré, doublure respirante et semelle Goodyear ressemelable.',
      ar: 'حذاء الصيف ذو الأصابع المغلقة. جسم من الجلد المشمّع، بطانة تسمح بالتنفس، ونعل Goodyear قابل للتبديل.',
    },
    features: [
      { en: 'Waxed leather upper', fr: 'Tige cuir ciré', ar: 'جسم جلدي مشمّع' },
      { en: 'Goodyear welt', fr: 'Couture Goodyear', ar: 'خياطة Goodyear' },
      { en: 'Resoleable', fr: 'Ressemelable', ar: 'قابل لتبديل النعل' },
      { en: 'Breathable lining', fr: 'Doublure respirante', ar: 'بطانة تسمح بالتنفس' },
    ],
    newArrival: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(cat: Category): Product[] {
  return products.filter((p) => p.category === cat);
}

export function formatPrice(n: number): string {
  return '$' + n.toFixed(2);
}
