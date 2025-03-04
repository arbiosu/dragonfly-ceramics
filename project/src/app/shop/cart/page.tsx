"use client";

import ShoppingCart from "@/components/shopping-cart";

export default function MyCart() {
    return (
        <section className="py-20 flex justify-center">
            <div className="w-full max-w-4xl px-4">
                <ShoppingCart />
            </div>
        </section>

    );
}
