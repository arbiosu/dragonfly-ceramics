import { headers } from 'next/headers'
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe'
import Stripe from "stripe";

export async function POST(request: Request) {
    const body = await request.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature') as string;
    const endpoint = process.env.STRIPE_WEBHOOK_SECRET!

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            endpoint
        );
    } catch (error) {
        console.error("Webhook Error: ", error);
        return new NextResponse(`[Stripe] Webhook Error`, { status: 400 })
    }

    switch (event.type) {
        case 'checkout.session.completed':
            console.log('[Webhook Success] Checkout Webhook Received!');
            break;
        default:
            console.log(`[Webhook] event received: ${event.type}`);
            break;
    }   

    return new NextResponse(JSON.stringify({ received: true }), {
        status: 200,
    });
};
