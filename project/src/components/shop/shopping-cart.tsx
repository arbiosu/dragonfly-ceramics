"use client";

import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import CartItemCard from "@/components/shop/cart-item";
import ShippingRateCalculator from "./shipping-calculator";
import Loading from "@/components/loading";


export default function ShoppingCart() {
    const { cartItems, cartTotal } = useCart();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loading />
    }

    return (
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl text-df-text mb-8">my cart</h1>
        {cartItems.map((item, index) => (
          <CartItemCard product={item.product} quantity={item.quantity} key={index}/>
        ))}
        <div>
          <h3 className="text-df-text text-xl mb-8">estimated subtotal: ${cartTotal}</h3>
        </div>
        <ShippingRateCalculator />
      </main>
    );
};
