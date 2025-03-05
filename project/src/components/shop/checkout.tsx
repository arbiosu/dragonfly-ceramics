"use client";

import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/lib/stripeUtils";


export default function CheckoutButton() {
    const { cartItems } = useCart();

    const handleCheckout = async (cartItems: CartItem[]) => {
        try {
            const res = await fetch("/shop/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartItems: cartItems }),
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

    return (
        <button
        className="bg-df-text hover:bg-blue-300 py-2 px-4 rounded-md text-lg
        font-medium text-white transition-colors duration-200"
        onClick={() => handleCheckout(cartItems)}
        >
            Checkout
        </button>
    );
};
