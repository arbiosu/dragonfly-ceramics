"use server";

import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export interface CartItem {
    product: Stripe.Product;
    quantity: number;
}

export async function getProducts(): Promise<Stripe.Product[]> {
    const products = await stripe.products.list({ expand: ["data.default_price"]})
    return products.data;
};

export async function validateCart(
    cart: CartItem[]
): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> {

    const lineItems = await Promise.all(
        cart.map(async (item) => {
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
        })
    );
    return lineItems;
};


export async function stripeCheckout(
    validatedCart: Stripe.Checkout.SessionCreateParams.LineItem[],
    origin: string | null
) {
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
};


export async function stripeCheckoutSuccess(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'payment_intent']
    });

    const status = session.status;
    const customerEmail = session.customer_details?.email;

    return { status, customerEmail };
};


// server actions
export async function checkoutServer(cart: CartItem[]) {
    try {
        const res = await fetch("/shop/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartItems: cart }),
        });

        if (!res.ok) {
            throw new Error(`Failed to create checkout session: ${res.status}`);
        }

        const data = await res.json();
        window.location.href = data.url;

    } catch (error) {
        console.error("Checkout Error:", error);
    }
};