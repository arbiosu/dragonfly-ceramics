"use server";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function getProducts(): Promise<Stripe.Product[]> {
    const products = await stripe.products.list({ expand: ["data.default_price"]})
    const data: Stripe.Product[] = products.data
    return data
}

