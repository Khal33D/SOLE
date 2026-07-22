import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'en' | 'fr' | 'ar';

export interface LocaleMeta {
  code: Locale;
  label: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', flag: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: 'AR', dir: 'rtl' },
];

type Dict = Record<string, string>;

const en: Dict = {
  'brand.name': 'SOLÉ',
  'nav.flipflops': 'Flip Flops',
  'nav.womens': "Women's",
  'nav.mens': "Men's",
  'nav.accessories': 'Accessories',
  'nav.search': 'Search',
  'nav.menu': 'Menu',
  'nav.openCart': 'Open cart',
  'nav.openMenu': 'Open menu',
  'nav.browse': 'Browse',

  'hero.badge': "Summer '26 collection is live",
  'hero.title1': 'Made for sun,',
  'hero.title2': 'sand & long summer days.',
  'hero.subtitle':
    "Handcrafted flip flops, men's & women's sandals, and every beach essential — designed to go from boardwalk to shoreline in a single step.",
  'hero.cta.primary': 'Shop the collection',
  'hero.cta.secondary': 'Explore flip flops',
  'hero.reviews': '4.8 · 12,000+ reviews',
  'hero.freeship': 'Free shipping over $50',

  'marquee.ship': 'Free shipping over $50',
  'marquee.returns': '30-day easy returns',
  'marquee.vegan': 'Vegan & recycled materials',
  'marquee.carbon': 'Carbon-neutral delivery',

  'category.eyebrow': 'Shop by category',
  'category.title': 'Find your summer pair',
  'category.viewall': 'View all',
  'category.flipflops': 'Flip Flops',
  'category.flipflops.blurb': 'Lightweight, beach-ready, all-day comfort',
  'category.womens': "Women's Sandals",
  'category.womens.blurb': 'Strappy, elegant, made for sunlit walks',
  'category.mens': "Men's Sandals",
  'category.mens.blurb': 'Durable leather & sport styles',
  'category.accessories': 'Summer Gear',
  'category.accessories.blurb': 'Hats, shades, totes & beach essentials',
  'category.shopnow': 'Shop now',

  'grid.eyebrow': 'The collection',
  'grid.sort': 'Sort',
  'grid.sort.featured': 'Featured',
  'grid.sort.priceAsc': 'Price: Low to High',
  'grid.sort.priceDesc': 'Price: High to Low',
  'grid.sort.rating': 'Top rated',
  'grid.filter.all': 'All',
  'grid.filter.best': 'Bestsellers',
  'grid.filter.new': 'New arrivals',
  'grid.empty': 'No products in this collection yet.',

  'card.colors': 'colors',
  'card.instock': 'In stock · ships in 1–2 days',
  'card.quickview': 'Quick view',
  'card.add': 'Add to cart',

  'qv.color': 'Color',
  'qv.size': 'Size',
  'qv.sizeguide': 'Size guide',
  'qv.add': 'Add to cart',
  'qv.added': 'Added',
  'qv.reviews': 'reviews',
  'qv.trust.ship': 'Free over $50',
  'qv.trust.returns': '30-day returns',
  'qv.trust.warranty': '2-yr warranty',

  'cart.title': 'Your cart',
  'cart.empty': 'Your cart is empty',
  'cart.empty.sub': 'Add some summer essentials to get started.',
  'cart.continue': 'Continue shopping',
  'cart.remaining': 'You are {amount} away from free shipping',
  'cart.unlocked': "You've unlocked free shipping!",
  'cart.subtotal': 'Subtotal',
  'cart.taxes': 'Taxes & shipping calculated at checkout.',
  'cart.checkout': 'Checkout',
  'cart.redirecting': 'Redirecting…',
  'cart.trust.secure': 'Secure checkout',
  'cart.trust.fast': 'Fast delivery',
  'cart.trust.returns': 'Easy returns',
  'cart.remove': 'Remove',

  'lookbook.eyebrow': 'The beach edit',
  'lookbook.title': 'Pair any sandal with the essentials that travel with you.',
  'lookbook.cta': 'Shop the edit',
  'lookbook.flipflops.title': 'Flip flops from $28',
  'lookbook.accessories.title': 'Beach-ready accessories',

  'feature.ship.title': 'Free shipping',
  'feature.ship.text': 'On all orders over $50',
  'feature.returns.title': '30-day returns',
  'feature.returns.text': 'No-questions-asked',
  'feature.warranty.title': '2-year warranty',
  'feature.warranty.text': 'On every pair',
  'feature.eco.title': 'Sustainable',
  'feature.eco.text': 'Vegan & recycled',

  'footer.newsletter.title': 'Join the SOLÉ club',
  'footer.newsletter.sub':
    'Get 10% off your first order plus early access to drops, travel guides, and members-only offers.',
  'footer.newsletter.placeholder': 'you@email.com',
  'footer.newsletter.button': 'Join',
  'footer.newsletter.done': 'Subscribed!',
  'footer.tagline': 'Summer footwear & beach essentials, designed for long days under the sun.',
  'footer.shop': 'Shop',
  'footer.support': 'Support',
  'footer.company': 'Company',
  'footer.help': 'Help center',
  'footer.shipping': 'Shipping',
  'footer.returns': 'Returns',
  'footer.sizeguide': 'Size guide',
  'footer.track': 'Track order',
  'footer.story': 'Our story',
  'footer.sustainability': 'Sustainability',
  'footer.careers': 'Careers',
  'footer.wholesale': 'Wholesale',
  'footer.contact': 'Contact',
  'footer.sale': 'Sale',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.accessibility': 'Accessibility',
  'footer.rights': 'All rights reserved.',

  'checkout.title': 'Checkout',
  'checkout.cod.badge': 'Cash on Delivery',
  'checkout.cod.note': 'Pay in cash when your order arrives at your door.',
  'checkout.section.contact': 'Contact',
  'checkout.section.delivery': 'Delivery details',
  'checkout.section.summary': 'Order summary',
  'checkout.name': 'Full name',
  'checkout.name.ph': 'e.g. Yassine El Amrani',
  'checkout.phone': 'Phone number',
  'checkout.phone.ph': '06 12 34 56 78',
  'checkout.email': 'Email (optional)',
  'checkout.email.ph': 'you@email.com',
  'checkout.address': 'Delivery address',
  'checkout.address.ph': 'Street, building, apartment number',
  'checkout.city': 'City',
  'checkout.city.ph': 'e.g. Casablanca',
  'checkout.notes': 'Delivery notes (optional)',
  'checkout.notes.ph': 'Any instructions for the courier',
  'checkout.subtotal': 'Subtotal',
  'checkout.shipping': 'Shipping',
  'checkout.shipping.free': 'Free',
  'checkout.total': 'Total',
  'checkout.cod.label': 'Cash on Delivery',
  'checkout.cod.fee': 'Free',
  'checkout.submit': 'Place order',
  'checkout.submitting': 'Placing order…',
  'checkout.success.title': 'Order confirmed!',
  'checkout.success.sub': 'Thank you, {name}. We will call you on {phone} to confirm delivery.',
  'checkout.success.order': 'Order #{id}',
  'checkout.back': 'Back to shopping',
  'checkout.error': 'Something went wrong. Please try again or call us.',
  'checkout.empty': 'Your cart is empty. Add products before checking out.',
  'checkout.required': 'Required',
  'checkout.invalid.email': 'Please enter a valid email address.',
  'checkout.invalid.phone': 'Please enter a valid phone number.',
};

const fr: Dict = {
  'brand.name': 'SOLÉ',
  'nav.flipflops': 'Tongs',
  'nav.womens': 'Femme',
  'nav.mens': 'Homme',
  'nav.accessories': 'Accessoires',
  'nav.search': 'Rechercher',
  'nav.menu': 'Menu',
  'nav.openCart': 'Ouvrir le panier',
  'nav.openMenu': 'Ouvrir le menu',
  'nav.browse': 'Parcourir',

  'hero.badge': "La collection été 26 est là",
  'hero.title1': 'Pensé pour le soleil,',
  'hero.title2': 'le sable et les longues journées d’été.',
  'hero.subtitle':
    "Tongs artisanales, sandales femme & homme, et tous les essentiels de plage — du boardwalk au rivage en un seul pas.",
  'hero.cta.primary': 'Voir la collection',
  'hero.cta.secondary': 'Découvrir les tongs',
  'hero.reviews': '4,8 · 12 000+ avis',
  'hero.freeship': 'Livraison offerte dès 50 $',

  'marquee.ship': 'Livraison offerte dès 50 $',
  'marquee.returns': 'Retours faciles sous 30 jours',
  'marquee.vegan': 'Matériaux vegan & recyclés',
  'marquee.carbon': 'Livraison neutre en carbone',

  'category.eyebrow': 'Acheter par catégorie',
  'category.title': 'Trouvez votre paire d’été',
  'category.viewall': 'Voir tout',
  'category.flipflops': 'Tongs',
  'category.flipflops.blurb': 'Légères, prêtes pour la plage, confort toute la journée',
  'category.womens': 'Sandales Femme',
  'category.womens.blurb': 'Élégantes, pour les promenades au soleil',
  'category.mens': 'Sandales Homme',
  'category.mens.blurb': 'Cuir robuste & styles sport',
  'category.accessories': 'Essentiels d’été',
  'category.accessories.blurb': 'Chapeaux, lunettes, cabas & essentiels de plage',
  'category.shopnow': 'Acheter',

  'grid.eyebrow': 'La collection',
  'grid.sort': 'Trier',
  'grid.sort.featured': 'En vedette',
  'grid.sort.priceAsc': 'Prix : croissant',
  'grid.sort.priceDesc': 'Prix : décroissant',
  'grid.sort.rating': 'Mieux notés',
  'grid.filter.all': 'Tout',
  'grid.filter.best': 'Meilleures ventes',
  'grid.filter.new': 'Nouveautés',
  'grid.empty': 'Aucun produit dans cette collection.',

  'card.colors': 'couleurs',
  'card.instock': 'En stock · expédié en 1–2 jours',
  'card.quickview': 'Aperçu rapide',
  'card.add': 'Ajouter au panier',

  'qv.color': 'Couleur',
  'qv.size': 'Pointure',
  'qv.sizeguide': 'Guide des pointures',
  'qv.add': 'Ajouter au panier',
  'qv.added': 'Ajouté',
  'qv.reviews': 'avis',
  'qv.trust.ship': 'Offerte dès 50 $',
  'qv.trust.returns': 'Retours sous 30 j',
  'qv.trust.warranty': 'Garantie 2 ans',

  'cart.title': 'Votre panier',
  'cart.empty': 'Votre panier est vide',
  'cart.empty.sub': 'Ajoutez des essentiels d’été pour commencer.',
  'cart.continue': 'Continuer mes achats',
  'cart.remaining': 'Plus que {amount} pour la livraison offerte',
  'cart.unlocked': 'Livraison offerte débloquée !',
  'cart.subtotal': 'Sous-total',
  'cart.taxes': 'Taxes & livraison calculées au paiement.',
  'cart.checkout': 'Paiement',
  'cart.redirecting': 'Redirection…',
  'cart.trust.secure': 'Paiement sécurisé',
  'cart.trust.fast': 'Livraison rapide',
  'cart.trust.returns': 'Retours faciles',
  'cart.remove': 'Retirer',

  'lookbook.eyebrow': 'L’édito plage',
  'lookbook.title': 'Associez vos sandales aux essentiels qui voyagent avec vous.',
  'lookbook.cta': 'Voir l’édito',
  'lookbook.flipflops.title': 'Tongs dès 28 $',
  'lookbook.accessories.title': 'Accessoires prêts pour la plage',

  'feature.ship.title': 'Livraison offerte',
  'feature.ship.text': 'Dès 50 $ d’achat',
  'feature.returns.title': 'Retours 30 jours',
  'feature.returns.text': 'Sans condition',
  'feature.warranty.title': 'Garantie 2 ans',
  'feature.warranty.text': 'Sur chaque paire',
  'feature.eco.title': 'Durable',
  'feature.eco.text': 'Vegan & recyclé',

  'footer.newsletter.title': 'Rejoignez le club SOLÉ',
  'footer.newsletter.sub':
    '10% sur votre première commande, accès anticipé aux sorties, guides voyage et offres exclusives.',
  'footer.newsletter.placeholder': 'vous@email.com',
  'footer.newsletter.button': 'Rejoindre',
  'footer.newsletter.done': 'Inscrit !',
  'footer.tagline':
    'Chaussures d’été & essentiels de plage, pensés pour de longues journées au soleil.',
  'footer.shop': 'Boutique',
  'footer.support': 'Aide',
  'footer.company': 'Société',
  'footer.help': 'Centre d’aide',
  'footer.shipping': 'Livraison',
  'footer.returns': 'Retours',
  'footer.sizeguide': 'Guide des tailles',
  'footer.track': 'Suivre ma commande',
  'footer.story': 'Notre histoire',
  'footer.sustainability': 'Durabilité',
  'footer.careers': 'Carrières',
  'footer.wholesale': 'Revente',
  'footer.contact': 'Contact',
  'footer.sale': 'Soldes',
  'footer.privacy': 'Confidentialité',
  'footer.terms': 'Conditions',
  'footer.accessibility': 'Accessibilité',
  'footer.rights': 'Tous droits réservés.',

  'checkout.title': 'Paiement',
  'checkout.cod.badge': 'Paiement à la livraison',
  'checkout.cod.note': 'Payez en espèces à la réception de votre commande.',
  'checkout.section.contact': 'Coordonnées',
  'checkout.section.delivery': 'Adresse de livraison',
  'checkout.section.summary': 'Récapitulatif',
  'checkout.name': 'Nom complet',
  'checkout.name.ph': 'ex. Yassine El Amrani',
  'checkout.phone': 'Numéro de téléphone',
  'checkout.phone.ph': '06 12 34 56 78',
  'checkout.email': 'E-mail (facultatif)',
  'checkout.email.ph': 'vous@email.com',
  'checkout.address': 'Adresse de livraison',
  'checkout.address.ph': 'Rue, immeuble, numéro d\'appartement',
  'checkout.city': 'Ville',
  'checkout.city.ph': 'ex. Casablanca',
  'checkout.notes': 'Instructions de livraison (facultatif)',
  'checkout.notes.ph': 'Indications pour le livreur',
  'checkout.subtotal': 'Sous-total',
  'checkout.shipping': 'Livraison',
  'checkout.shipping.free': 'Gratuite',
  'checkout.total': 'Total',
  'checkout.cod.label': 'Paiement à la livraison',
  'checkout.cod.fee': 'Gratuit',
  'checkout.submit': 'Valider la commande',
  'checkout.submitting': 'Traitement en cours…',
  'checkout.success.title': 'Commande confirmée !',
  'checkout.success.sub': 'Merci, {name}. Nous vous appellerons au {phone} pour confirmer la livraison.',
  'checkout.success.order': 'Commande #{id}',
  'checkout.back': 'Retour à la boutique',
  'checkout.error': 'Une erreur est survenue. Veuillez réessayer ou nous appeler.',
  'checkout.empty': 'Votre panier est vide. Ajoutez des articles avant de payer.',
  'checkout.required': 'Requis',
  'checkout.invalid.email': 'Veuillez saisir un e-mail valide.',
  'checkout.invalid.phone': 'Veuillez saisir un numéro de téléphone valide.',
};

const ar: Dict = {
  'brand.name': 'سوليه',
  'nav.flipflops': 'صنادل الشقلب',
  'nav.womens': 'نساء',
  'nav.mens': 'رجال',
  'nav.accessories': 'إكسسوارات',
  'nav.search': 'بحث',
  'nav.menu': 'القائمة',
  'nav.openCart': 'فتح السلة',
  'nav.openMenu': 'فتح القائمة',
  'nav.browse': 'تصفح',

  'hero.badge': 'مجموعة صيف ٢٦ متاحة الآن',
  'hero.title1': 'صُنعت لأجل الشمس،',
  'hero.title2': 'الرمال والأيام الصيفية الطويلة.',
  'hero.subtitle':
    'صنادل شقلب مصنوعة يدويًا، وصنادل للرجال والنساء، وكل مستلزمات الشاطئ — من الممشى إلى الماء في خطوة واحدة.',
  'hero.cta.primary': 'تسوّق المجموعة',
  'hero.cta.secondary': 'استكشف الصنادل',
  'hero.reviews': '٤٫٨ · أكثر من ١٢٬٠٠٠ تقييم',
  'hero.freeship': 'شحن مجاني فوق ٥٠ $',

  'marquee.ship': 'شحن مجاني فوق ٥٠ $',
  'marquee.returns': 'إرجاع سهل خلال ٣٠ يومًا',
  'marquee.vegan': 'مواد نباتية ومعاد تدويرها',
  'marquee.carbon': 'توصيل محايد الكربون',

  'category.eyebrow': 'تسوّق حسب الفئة',
  'category.title': 'اعثر على زوجك الصيفي',
  'category.viewall': 'عرض الكل',
  'category.flipflops': 'صنادل شقلب',
  'category.flipflops.blurb': 'خفيفة، جاهزة للشاطئ، مريحة طوال اليوم',
  'category.womens': 'صنادل نسائية',
  'category.womens.blurb': 'أنيقة، لمشي تحت الشمس',
  'category.mens': 'صنادل رجالية',
  'category.mens.blurb': 'جلد متين وأنماط رياضية',
  'category.accessories': 'مستلزمات الصيف',
  'category.accessories.blurb': 'قبعات، نظارات، حقائب ومستلزمات الشاطئ',
  'category.shopnow': 'تسوّق الآن',

  'grid.eyebrow': 'المجموعة',
  'grid.sort': 'ترتيب',
  'grid.sort.featured': 'مميز',
  'grid.sort.priceAsc': 'السعر: من الأقل للأعلى',
  'grid.sort.priceDesc': 'السعر: من الأعلى للأقل',
  'grid.sort.rating': 'الأعلى تقييمًا',
  'grid.filter.all': 'الكل',
  'grid.filter.best': 'الأكثر مبيعًا',
  'grid.filter.new': 'وصل حديثًا',
  'grid.empty': 'لا توجد منتجات في هذه المجموعة بعد.',

  'card.colors': 'ألوان',
  'card.instock': 'متوفّر · يُشحن خلال ١–٢ يوم',
  'card.quickview': 'عرض سريع',
  'card.add': 'أضف إلى السلة',

  'qv.color': 'اللون',
  'qv.size': 'المقاس',
  'qv.sizeguide': 'دليل المقاسات',
  'qv.add': 'أضف إلى السلة',
  'qv.added': 'تمت الإضافة',
  'qv.reviews': 'تقييمًا',
  'qv.trust.ship': 'مجاني فوق ٥٠ $',
  'qv.trust.returns': 'إرجاع خلال ٣٠ يوم',
  'qv.trust.warranty': 'ضمان سنتين',

  'cart.title': 'سلتك',
  'cart.empty': 'سلتك فارغة',
  'cart.empty.sub': 'أضف بعض مستلزمات الصيف للبدء.',
  'cart.continue': 'متابعة التسوق',
  'cart.remaining': 'بقيت {amount} للحصول على شحن مجاني',
  'cart.unlocked': 'حصلت على الشحن المجاني!',
  'cart.subtotal': 'المجموع الفرعي',
  'cart.taxes': 'تُحتسب الضرائب والشحن عند الدفع.',
  'cart.checkout': 'إتمام الشراء',
  'cart.redirecting': 'جارٍ التحويل…',
  'cart.trust.secure': 'دفع آمن',
  'cart.trust.fast': 'توصيل سريع',
  'cart.trust.returns': 'إرجاع سهل',
  'cart.remove': 'إزالة',

  'lookbook.eyebrow': 'تشكيلة الشاطئ',
  'lookbook.title': 'امزج أي صندل مع المستلزمات التي ترافقك.',
  'lookbook.cta': 'تسوّق التشكيلة',
  'lookbook.flipflops.title': 'صنادل شقلب من ٢٨ $',
  'lookbook.accessories.title': 'إكسسوارات جاهزة للشاطئ',

  'feature.ship.title': 'شحن مجاني',
  'feature.ship.text': 'لكل الطلبات فوق ٥٠ $',
  'feature.returns.title': 'إرجاع ٣٠ يوم',
  'feature.returns.text': 'دون أسئلة',
  'feature.warranty.title': 'ضمان سنتين',
  'feature.warranty.text': 'على كل زوج',
  'feature.eco.title': 'مستدام',
  'feature.eco.text': 'نباتي ومعاد تدويره',

  'footer.newsletter.title': 'انضم إلى نادي سوليه',
  'footer.newsletter.sub':
    'احصل على خصم ١٠٪ على أول طلب، ووصول مبكر للإصدارات، وأدلة سفر، وعروض حصرية للأعضاء.',
  'footer.newsletter.placeholder': 'you@email.com',
  'footer.newsletter.button': 'انضم',
  'footer.newsletter.done': 'تم الاشتراك!',
  'footer.tagline': 'أحذية صيفية ومستلزمات شاطئ، مصممة لأيام طويلة تحت الشمس.',
  'footer.shop': 'المتجر',
  'footer.support': 'الدعم',
  'footer.company': 'الشركة',
  'footer.help': 'مركز المساعدة',
  'footer.shipping': 'الشحن',
  'footer.returns': 'الإرجاع',
  'footer.sizeguide': 'دليل المقاسات',
  'footer.track': 'تتبع الطلب',
  'footer.story': 'قصتنا',
  'footer.sustainability': 'الاستدامة',
  'footer.careers': 'الوظائف',
  'footer.wholesale': 'البيع بالجملة',
  'footer.contact': 'اتصل بنا',
  'footer.sale': 'تخفيضات',
  'footer.privacy': 'الخصوصية',
  'footer.terms': 'الشروط',
  'footer.accessibility': 'إمكانية الوصول',
  'footer.rights': 'جميع الحقوق محفوظة.',

  'checkout.title': 'إتمام الطلب',
  'checkout.cod.badge': 'الدفع عند الاستلام',
  'checkout.cod.note': 'ادفع نقدًا عند وصول طلبك إلى باب منزلك.',
  'checkout.section.contact': 'معلومات التواصل',
  'checkout.section.delivery': 'تفاصيل التوصيل',
  'checkout.section.summary': 'ملخّص الطلب',
  'checkout.name': 'الاسم الكامل',
  'checkout.name.ph': 'مثال: ياسين العمراني',
  'checkout.phone': 'رقم الهاتف',
  'checkout.phone.ph': '06 12 34 56 78',
  'checkout.email': 'البريد الإلكتروني (اختياري)',
  'checkout.email.ph': 'you@email.com',
  'checkout.address': 'عنوان التوصيل',
  'checkout.address.ph': 'الشارع، المبنى، رقم الشقة',
  'checkout.city': 'المدينة',
  'checkout.city.ph': 'مثال: الدار البيضاء',
  'checkout.notes': 'ملاحظات التوصيل (اختياري)',
  'checkout.notes.ph': 'أي تعليمات لعامل التوصيل',
  'checkout.subtotal': 'المجموع الفرعي',
  'checkout.shipping': 'الشحن',
  'checkout.shipping.free': 'مجاني',
  'checkout.total': 'الإجمالي',
  'checkout.cod.label': 'الدفع عند الاستلام',
  'checkout.cod.fee': 'مجاني',
  'checkout.submit': 'تأكيد الطلب',
  'checkout.submitting': 'جارٍ معالجة الطلب…',
  'checkout.success.title': 'تم تأكيد طلبك!',
  'checkout.success.sub': 'شكرًا لك، {name}. سنتصل بك على الرقم {phone} لتأكيد التوصيل.',
  'checkout.success.order': 'رقم الطلب #{id}',
  'checkout.back': 'العودة للتسوق',
  'checkout.error': 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا.',
  'checkout.empty': 'سلتك فارغة. أضف منتجات قبل إتمام الطلب.',
  'checkout.required': 'مطلوب',
  'checkout.invalid.email': 'يرجى إدخال بريد إلكتروني صحيح.',
  'checkout.invalid.phone': 'يرجى إدخال رقم هاتف صحيح.',
};

const DICTS: Record<Locale, Dict> = { en, fr, ar };

interface I18nContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = 'sole-locale';

function detectInitial(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && DICTS[saved]) return saved;
  } catch {}
  const nav = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'en';
  if (nav === 'fr') return 'fr';
  if (nav === 'ar') return 'ar';
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitial);

  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }, [locale, dir]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = DICTS[locale];
    const t = (key: string, vars?: Record<string, string | number>) => {
      let str = dict[key] ?? en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(`{${k}}`, String(v));
        }
      }
      return str;
    };
    return { locale, dir, setLocale: setLocaleState, t };
  }, [locale, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
