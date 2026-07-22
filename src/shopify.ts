/**
 * Shopify Storefront API client.
 *
 * To go live, set these in your .env:
 *   VITE_SHOPIFY_STORE_DOMAIN  e.g. "your-store.myshopify.com"
 *   VITE_SHOPIFY_STOREFRONT_TOKEN  (Storefront API public access token)
 *
 * When configured, `isShopifyConfigured()` returns true and the shop
 * will fetch live products + create real Shopify checkouts instead of
 * using the local catalog. Until then, the local catalog in data.ts
 * powers the storefront so you can design and preview freely.
 */

import type { Product } from './types';

const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;
const API_VERSION = '2025-01';

export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!isShopifyConfigured()) throw new Error('Shopify not configured');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify request failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  vendor
  description
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount } }
  featuredImage { url }
  images(first: 4) { edges { node { url } } }
  variants(first: 20) { edges { node { id title availableForSale } } }
  options { name values }
`;

export async function fetchShopifyProducts(): Promise<Product[]> {
  const query = `
    query Products {
      products(first: 50) {
        edges {
          node {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }`;
  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(query);
  return data.products.edges.map((e) => mapShopifyProduct(e.node));
}

function mapShopifyProduct(n: any): Product {
  const price = parseFloat(n.priceRange.minVariantPrice.amount);
  const compareAt = n.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(n.compareAtPriceRange.minVariantPrice.amount)
    : undefined;
  const colorOption = n.options.find((o: any) => /color|colour/i.test(o.name));
  const sizeOption = n.options.find((o: any) => /size/i.test(o.name));
  const name = { en: n.title, fr: n.title, ar: n.title };
  const description = {
    en: n.description || '',
    fr: n.description || '',
    ar: n.description || '',
  };
  return {
    id: n.id,
    shopifyId: n.id,
    slug: n.handle,
    name,
    brand: n.vendor || 'SOLÉ',
    category: 'flip-flops',
    price,
    compareAt,
    rating: 0,
    reviewCount: 0,
    colors: (colorOption?.values || []).map((name: string, i: number) => ({
      name,
      hex: ['#cb9a64', '#fa4621', '#2f9386', '#1f1f1d'][i % 4],
    })),
    sizes: sizeOption?.values || ['One size'],
    images: [n.featuredImage.url, ...n.images.edges.map((e: any) => e.node.url)],
    badges: [],
    description,
    features: [],
  };
}

/**
 * Create a Shopify cart checkout URL for the given line items.
 * Returns a URL on the Shopify store that the customer is redirected to.
 */
export async function createShopifyCheckout(
  lines: { id: string; quantity: number }[],
): Promise<string> {
  const query = `
    mutation Checkout($lineItems: [CartLineInput!]!) {
      cartCreate(input: { lines: $lineItems }) {
        cart { checkoutUrl }
      }
    }`;
  const data = await shopifyFetch<{ cartCreate: { cart: { checkoutUrl: string } } }>(query, {
    lineItems: lines.map((l) => ({ merchandiseId: l.id, quantity: l.quantity })),
  });
  return data.cartCreate.cart.checkoutUrl;
}
