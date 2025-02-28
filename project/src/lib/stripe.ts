"use server";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function getProducts() {
    const products = await stripe.products.list()
    console.log(products)
    return products
}

