"use client";

import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import CartItemCard from "@/components/shop/cart-item";
import ShippingRateCalculator from "./shipping-calculator";
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cartCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-df-text mb-4">Your Cart</h2>
              <div className="grid gap-4">
                {cartItems.map((item, index) => (
                  <CartItemCard key={index} product={item.product} quantity={item.quantity} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-df-bg rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-df-text mb-4">Order Summary</h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-df-text">Subtotal:</span>
                  <span className="text-df-text font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <ShippingRateCalculator />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 min-h-screen">
            <h2 className="text-2xl font-semibold text-df-text">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Add items to your cart to get started.</p>
          </div>
        )}
      </div>
    );
};
