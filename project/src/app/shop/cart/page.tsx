"use client";

import ShoppingCart from "@/components/shopping-cart";
import CheckoutButton from "@/components/checkout";

export default function MyCart() {
    return (
        <section className="py-20">
            <ShoppingCart />
            <CheckoutButton />
        </section>

    )
}