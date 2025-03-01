"use client";

import { Stripe } from "stripe";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/lib/stripe";


interface ProductCardProps {
    data: Stripe.Product;
}


export default function ProductCard({ data }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleBuyNow = async (item: CartItem) => {
        try {
            const res = await fetch("/shop/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ cartItems: [item] }),
            });

            if (!res.ok) {
                throw new Error(`Failed to create checkout session: ${res.status}`);
            }

            const data = await res.json();
            window.location.href = data.url;
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="flex flex-col border rounded-lg overflow-hidden shadow-md h-full bg-white">
            {/* Image Container TODO: add placeholder svg */}
            <div className="relative w-full pt-[75%]">
                <Image
                    src={data.images[0]}
                    alt={data.description || "No description"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    height={100}
                    width={100}
                />
            </div>
            {/* Product Information */}
            <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold text-df-text mb-1">
                    {data.name}
                </h3>
                <p className="text-sm text-df-text mb-4 flex-grow">
                    {data.description}
                </p>
                <div className="mt-auto">
                    {data.default_price &&
                    typeof data.default_price !== 'string' &&
                    data.default_price.unit_amount ? (
                        <p className="text-xl font-bold text-df-text mb-3">
                            ${data.default_price?.unit_amount / 100}
                        </p>
                    ) : (
                        <p className="text-xl font-bold text-df-text mb-3">
                            No pricing data
                        </p>
                    )}
                    <div className="flex gap-2">
                        <button 
                            className="flex-1 bg-blue-600 hover:bg-blue-700
                            py-2 px-4 rounded-md text-sm font-medium text-white
                            transition-colors duration-200"
                            onClick={() => handleBuyNow({ product: data, quantity: 1 })}
                        >
                            Buy Now
                        </button>
                        <button 
                            className="flex-1 bg-gray-100 hover:bg-gray-200 
                            py-2 px-4 rounded-md text-sm font-medium text-gray-800
                            transition-colors duration-200 border border-gray-300"
                            onClick={() => addToCart(data)}
                        >
                        Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};