"use client";

import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import CartItemCard from "@/components/shop/cart-item";
import CheckoutButton from "@/components/shop/checkout";
import Loading from "@/components/loading";


export default function ShoppingCart() {
    const { cartItems, cartTotal, cartCount } = useCart();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loading />
    }

    return (
        <div className="w-full">
            {cartCount > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-wrap gap-4">
                        {cartItems.map((item, index) => (
                            <CartItemCard 
                                key={index}
                                product={item.product}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col justify-start items-start text-lg text-df-text">
                        <span>Estimated Total: ${cartTotal}</span>
                        <CheckoutButton />
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 min-h-screen">
                    <h2 className="text-xl font-semibold text-df-text">Your cart is empty</h2>
                    <p className="mt-2 text-gray-600">Add items to your cart to get started.</p>
                </div>
            )}
        </div>
    );
};
