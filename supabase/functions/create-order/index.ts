import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface OrderItem {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

interface OrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_address: string;
  city: string;
  notes?: string;
  locale: string;
  items: OrderItem[];
  subtotal: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await req.json()) as OrderPayload;

    // Basic server-side validation
    if (!body.customer_name?.trim() || !body.customer_phone?.trim() || !body.shipping_address?.trim() || !body.city?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // 1. Insert order into Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        customer_name: body.customer_name.trim(),
        customer_phone: body.customer_phone.trim(),
        customer_email: body.customer_email?.trim() || null,
        shipping_address: body.shipping_address.trim(),
        city: body.city.trim(),
        notes: body.notes?.trim() || null,
        locale: body.locale || 'en',
        items: body.items,
        subtotal: body.subtotal,
        status: 'pending',
      })
      .select('id, created_at')
      .single();

    if (dbError) {
      return new Response(JSON.stringify({ error: 'Failed to save order', detail: dbError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Forward to Shopify as a draft order (if configured)
    const shopifyDomain = Deno.env.get('SHOPIFY_SHOP_DOMAIN');
    const adminToken = Deno.env.get('SHOPIFY_ADMIN_API_TOKEN');
    const apiVersion = '2025-01';

    let shopifyDraftOrderId: string | null = null;
    let shopifyOrderNumber: string | null = null;
    let shopifySyncError: string | null = null;

    if (shopifyDomain && adminToken) {
      try {
        const lineItems = body.items.map((it) => ({
          title: it.name,
          variant_title: `${it.color} / ${it.size}`,
          quantity: it.quantity,
          price: it.price.toFixed(2),
        }));

        const shippingAddress = {
          first_name: body.customer_name.split(' ')[0],
          last_name: body.customer_name.split(' ').slice(1).join(' ') || '',
          address1: body.shipping_address,
          city: body.city,
          country: 'MA',
          phone: body.customer_phone,
        };

        const draftMutation = `
          mutation draftOrderCreate($input: DraftOrderInput!) {
            draftOrderCreate(input: $input) {
              draftOrder {
                id
                name
              }
              userErrors { field message }
            }
          }`;

        const shopifyRes = await fetch(`https://${shopifyDomain}/admin/api/${apiVersion}/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': adminToken,
          },
          body: JSON.stringify({
            query: draftMutation,
            variables: {
              input: {
                lineItems,
                shippingAddress,
                email: body.customer_email || undefined,
                note: `COD order — phone: ${body.customer_phone}${body.notes ? ' | notes: ' + body.notes : ''} | locale: ${body.locale}`,
                tags: ['cash-on-delivery', 'web-storefront'],
                useCustomerDefaultAddress: false,
              },
            },
          }),
        });

        if (!shopifyRes.ok) {
          shopifySyncError = `Shopify HTTP ${shopifyRes.status}`;
        } else {
          const shopifyData = await shopifyRes.json();
          if (shopifyData.errors) {
            shopifySyncError = JSON.stringify(shopifyData.errors);
          } else if (shopifyData.data?.draftOrderCreate?.userErrors?.length) {
            shopifySyncError = shopifyData.data.draftOrderCreate.userErrors.map((e: any) => e.message).join('; ');
          } else {
            shopifyDraftOrderId = shopifyData.data.draftOrderCreate.draftOrder.id;
            shopifyOrderNumber = shopifyData.data.draftOrderCreate.draftOrder.name;
          }
        }
      } catch (err) {
        shopifySyncError = err instanceof Error ? err.message : 'Shopify sync failed';
      }
    }

    // 3. Update the order record with Shopify sync result
    await supabase
      .from('orders')
      .update({
        shopify_draft_order_id: shopifyDraftOrderId,
        shopify_order_number: shopifyOrderNumber,
        status: shopifyDraftOrderId ? 'synced' : 'pending',
      })
      .eq('id', order.id);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        createdAt: order.created_at,
        shopifyOrderNumber,
        shopifySyncError,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
