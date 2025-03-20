import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from 'stripe';
import {
    stripeCheckout,
    validateCart,
    CartItem,
    ShippingRateObject
} from "@/lib/stripe/utils";


export async function POST(request: Request) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');
        const { 
            cartItems,
            shippingOptions
        } = (await request.json()) as { 
            cartItems: CartItem[], 
            shippingOptions: ShippingRateObject[]
        };

        const validatedCart = await validateCart(cartItems);

        const oilDispenserProps: Partial<Stripe.Checkout.SessionCreateParams> = {};
        const hasOilDispensers = cartItems.filter((item) => item.product.metadata.type === "oil dispensers");
        oilDispenserProps.custom_fields = [];

        for (const oilDispenser of hasOilDispensers) {
            for (let i = 0; i < oilDispenser.quantity; i++) {
                oilDispenserProps.custom_fields.push({
                    key: "color",
                    label: {
                        type: 'custom',
                        custom: 'Choose a color for your Oil Dispenser'
                    },
                    type: "dropdown",
                    dropdown: {
                        options: [
                            {
                                label: "Silver",
                                value: "silver",
                            },
                            {
                                label: "Gold",
                                value: "gold"
                            },
                        ],
                    },
                });
            }
        }
        const session = await stripeCheckout(
            validatedCart,
            origin,
            oilDispenserProps,
            shippingOptions
        );
        
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
