"use client";

import { Stripe } from "stripe";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";


export interface SessionProps {
    session: Session;
}

interface Session {
    id: string;
    amountTotal: number | null;
    address: Stripe.Address | string;
    lineItems: Stripe.ApiList<Stripe.LineItem> | undefined;
    email: string;
}

export default function OrderSummary({ session }: SessionProps) {
    // todo: extract to stripe/utils
    const formatAddress = (address: Stripe.Address) => {
        const { line1, line2, city, state, postal_code, country } = address;
        const formattedAddress = [line1, line2, city, state, postal_code, country]
            .filter(Boolean)
            .join(', ');
        return formattedAddress || 'N/A';
    };

    const { purgeCart } = useCart();

    useEffect(() => {
        purgeCart();
    }, [purgeCart])

    return (
        <div className="py-20 container mx-auto">
            <h2 className="text-3xl text-df-text font-semibold">
                Order Summary
            </h2>
            <p className="text-df-text text-sm">Order ID: {session.id}</p>
            {session.amountTotal && (
                <p className="text-df-text text-sm">Total Amount: ${session.amountTotal / 100}</p>
            )}
            {typeof session.address !== 'string' ? (
                <p className="text-df-text text-sm">Shipping Address: {formatAddress(session.address)}</p>
            ) : (
                <p>Shipping address not found! Contact...</p>
            )}
            <div>
                <h3 className="text-xl text-df-text font-semibold">Your receipt</h3>
                {session.lineItems?.data.map((item) => (
                    <div key={item.id}>
                        <p className="text-df-text text-sm">{item.description}</p>
                        <p className="text-df-text text-sm">Quantity: {item.quantity}</p>
                        <p className="text-df-text text-sm  ">Price: ${item.amount_total / 100}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
