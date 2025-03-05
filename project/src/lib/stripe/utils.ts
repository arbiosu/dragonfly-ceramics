"use server";

import Stripe from 'stripe';
import { stripe } from './stripe';


export interface CartItem {
    product: Stripe.Product;
    quantity: number;
}

export async function fetchProducts(): Promise<Stripe.Product[]> {
    try {
        const products = await stripe.products.list({ 
            expand: ["data.default_price"],
            active: true,
        });
        return products.data;
    } catch (error) {
        throw new Error(`Failed to retrieve products in getProducts with error: ${error}`);
    }
};

export async function validateCart(
    cart: CartItem[]
): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> {

    const lineItems = await Promise.all(
        cart.map(async (item) => {
            try {
                const validatedProduct = await stripe.products.retrieve(item.product.id);
                if (
                    !validatedProduct.default_price
                    || 
                    typeof validatedProduct.default_price !== 'string'
                ) {
                    throw new Error('Invalid or missing price');
                }
    
                const validatedQuantity = item.quantity > 0 ? item.quantity : 1;
    
                return {
                    price: validatedProduct.default_price,
                    quantity: validatedQuantity,
                };
            } catch (error) {
                throw new Error(`Failed to validate cart with error ${error}`);
            }
        })
    );

    return lineItems;
};


export async function stripeCheckout(
    validatedCart: Stripe.Checkout.SessionCreateParams.LineItem[],
    origin: string | null
) {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: validatedCart,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US'],
            },
            mode: 'payment',
            success_url: `${origin}/shop/cart/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/shop/cart/canceled`,
        });
    
        return session;
    } catch (error) {
        throw new Error(`Failed to checkout at ${Date.now()} with error ${error}`);
    }
};


export async function stripeCheckoutSuccess(sessionId: string) {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'line_items.data.price.product', 'payment_intent']
        });

        const status = session.status;
        const customerEmail = session.customer_details?.email;
    
        return { session, status, customerEmail };
    } catch (error) {
        throw new Error(`Failed to retrieve session ${sessionId} with error - ${error}`)
    }
};

