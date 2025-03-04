"use client";

import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import CartItemCard from "@/components/cart-item";
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
        <div>
            {cartCount > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cartItems.map((item, index) => (
                        <CartItemCard 
                            key={index}
                            product={item.product}
                            quantity={item.quantity}
                        />
                    ))}
                    <div className="mt-8 flex justify-between items-center p-4 border-t border-gray-200">
                        <div className="text-lg text-df-text">Estimated Total: ${cartTotal}</div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8">
                    <h2 className="text-xl font-semibold text-df-text">Your cart is empty</h2>
                    <p className="mt-2 text-gray-600">Add items to your cart to get started.</p>
                </div>
            )}
        </div>
    );
};