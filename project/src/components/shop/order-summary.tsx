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

    const handleOrderIdClick = () => {
        navigator.clipboard.writeText(session.id);
    }

    const { purgeCart } = useCart();
    

    useEffect(() => {
        purgeCart();
    }, [purgeCart])

    return (
        <div className="py-20 container mx-auto">
            <h2 className="text-3xl text-df-text font-semibold mb-4">
                Thank you! Your Order Summary:
            </h2>
            <p className="text-df-text text-lg">
                Order ID - keep this for your records:  
                <span onClick={handleOrderIdClick}className="hover:bg-blue-300 rounded-lg p-1 text-df-text font-semibold hover:cursor-pointer">{session.id}</span>
            </p>
            {session.amountTotal && (
                <p className="text-df-text text-lg">Total Amount: ${session.amountTotal / 100}</p>
            )}
            {typeof session.address !== 'string' ? (
                <p className="text-df-text text-lg mb-4">Shipping Address: {formatAddress(session.address)}</p>
            ) : (
                <p>Shipping address not found! Contact...</p>
            )}
            <div>
                <h3 className="text-2xl text-df-text font-semibold mb-2">Your receipt</h3>
                {session.lineItems?.data.map((item) => (
                    <div key={item.id}>
                        <p className="text-df-text text-lg">{item.description}</p>
                        <p className="text-df-text text-lg">Quantity: {item.quantity}</p>
                        <p className="text-df-text text-lg">Price: ${item.amount_total / 100}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
