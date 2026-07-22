export type Category =
  | 'flip-flops'
  | 'womens-sandals'
  | 'mens-sandals'
  | 'accessories';

export type Locale = 'en' | 'fr' | 'ar';

export type Localized = Record<Locale, string>;

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  /** Shopify product GID when linked, e.g. gid://shopify/Product/123 */
  shopifyId?: string;
  slug: string;
  name: Localized;
  brand: string;
  category: Category;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  badges: string[];
  description: Localized;
  features: Localized[];
  bestSeller?: boolean;
  newArrival?: boolean;
}

export interface CartLine {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}
