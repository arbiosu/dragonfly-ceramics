import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/stripe';
import { deductInventory } from '@/lib/stripe/utils';
import { retrieveProductByStripeId, upsertProduct } from '@/lib/supabase/model';
import { serializeStripeProduct } from '@/lib/stripe-supabase-integrations';

function logWebhookError(
  message: string,
  error: unknown,
  eventId?: string,
  eventType?: string
) {
  console.error(
    `[Webhook Error] ${message}`,
    JSON.stringify({
      eventId: eventId || 'N/A',
      eventType: eventType || 'N/A',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    })
  );
}

async function revalidateShopPath() {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL!}/shop/api/revalidate?path=/shop`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    logWebhookError('Failed to trigger shop revalidation', error);
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log(`[Webhook Success] Checkout Session ${session.id} completed.`);
  await deductInventory(session.id);
}

async function handleProductChange(product: Stripe.Product, eventType: string) {
  console.log(
    `[Webhook] Processing ${eventType} for product ID: ${product.id}`
  );
  const serializedProduct = serializeStripeProduct(product);

  if (eventType === 'product.created') {
    await upsertProduct(serializedProduct);
  } else {
    const { data: existingProductData, error: retrieveError } =
      await retrieveProductByStripeId(product.id);
    if (retrieveError || existingProductData == null) {
      logWebhookError(
        `Product with Stripe ID ${product.id} not found in our DB for update/delete. Proceeding with upsert based on received data.`,
        retrieveError,
        undefined,
        eventType
      );
    } else {
      const productToUpsert = {
        id: existingProductData.id,
        ...serializedProduct,
      };
      await upsertProduct(productToUpsert);
    }
  }
  await revalidateShopPath();
}

async function handlePriceChange(price: Stripe.Price, eventType: string) {
  console.log(
    `[Webhook] Processing ${eventType} for price ID: ${price.id}. Triggering revalidation.`
  );
  // TODO: update prices in DB
  await revalidateShopPath();
}

export async function POST(request: Request) {
  const headersList = await headers();
  const sig = headersList.get('stripe-signature') as string;

  const body = await request.text();
  const endpoint = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpoint);
  } catch (error) {
    console.error('[Webhook Error] could not parse event: ', error);
    return new NextResponse(`[Stripe] Webhook Error`, { status: 400 });
  }

  try {
    console.log(
      `[Webhook Received] Event ID: ${event.id}, Type: ${event.type}`
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'product.created':
      case 'product.updated':
      case 'product.deleted':
        await handleProductChange(event.data.object, event.type);
        break;
      case 'price.created':
      case 'price.updated':
      case 'price.deleted':
        await handlePriceChange(event.data.object, event.type);
        break;
      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
        break;
    }
  } catch (error) {
    logWebhookError(
      'Internal server error processing webhook',
      error,
      event.id,
      event.type
    );
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
