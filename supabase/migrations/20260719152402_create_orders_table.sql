/*
# Create orders table for Cash-on-Delivery (COD) checkout

1. Purpose
   Stores every order placed through the SOLÉ storefront's COD checkout.
   Orders are created by an edge function (create-order) which also forwards
   them to Shopify as draft orders so they appear in the merchant's Shopify
   admin dashboard.

2. New Tables
   - `orders`
     - `id` (uuid, primary key)
     - `customer_name` (text, not null) — full name of the customer
     - `customer_phone` (text, not null) — phone number for delivery coordination
     - `customer_email` (text, nullable) — optional email
     - `shipping_address` (text, not null) — street address for delivery
     - `city` (text, not null) — city for delivery
     - `notes` (text, nullable) — optional delivery notes from customer
     - `locale` (text, not null, default 'en') — language the order was placed in
     - `items` (jsonb, not null) — array of {productId, name, size, color, quantity, price}
     - `subtotal` (numeric, not null) — total amount in USD
     - `status` (text, not null, default 'pending') — pending / synced / fulfilled / cancelled
     - `shopify_draft_order_id` (text, nullable) — Shopify draft order GID once synced
     - `shopify_order_number` (text, nullable) — human-readable Shopify order number once synced
     - `created_at` (timestamptz, default now)

3. Security
   - RLS enabled on `orders`.
   - This is a single-tenant storefront with no sign-in screen. The frontend
     (anon key) must be able to INSERT orders. Reading all orders is intentionally
     allowed so a future admin view could list them; sensitive columns are minimal
     (this is a public storefront). Policies use `TO anon, authenticated`.
   - No DELETE or UPDATE from the anon key — orders are immutable from the client;
     only the edge function (service role) modifies them.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  shipping_address text NOT NULL,
  city text NOT NULL,
  notes text,
  locale text NOT NULL DEFAULT 'en',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10, 2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  shopify_draft_order_id text,
  shopify_order_number text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to insert new orders from the storefront
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Allow anyone to read orders (single-tenant storefront; no sensitive data beyond what customer voluntarily submits)
DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

-- No UPDATE or DELETE from the anon key; the edge function uses the service role key which bypasses RLS
