import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripeCheckout, validateCart, CartItem } from "@/lib/stripe";


export async function POST(request: Request) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');
        
        const { cartItems } = (await request.json()) as { cartItems: CartItem[] };
        const validatedCart = await validateCart(cartItems);

        const session = await stripeCheckout(validatedCart, origin);
        
        // TODO: convert to redirect
        if (session.url) {
            return NextResponse.json({ url: session.url }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "Failed to create checkout session" },
                { status: 500 },
            );
        }

    } catch (error) {
        let errorMessage = "An unknown error occurred";
        let statusCode = 500;

        if (error && typeof error === 'object') {
            if ('message' in error) {
                errorMessage = String(error.message);
            }
            if ('status' in error) {
                statusCode = Number(error.status)
            }
        }
        return NextResponse.json(
            { error: errorMessage},
            { status: statusCode},
        );
    }
};