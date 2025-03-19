"use client";

import { Stripe } from "stripe";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";


interface ProductCardProps {
    data: Stripe.Product;
}


export default function ProductCard({ data }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const handleAddToCart = () => {
        addToCart(data);
        addToast({
            title: "Added to Cart",
            description: `${data.name} has successfully been added to your cart!`,
            variant: "success",
        });
    }

    return (
        <div
            className="relative group w-full max-w-sm bg-df-bg rounded-lg shadow-t-md overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container TODO: add placeholder svg */}
            <div className="relative w-full aspect-square">
                <Image
                    src={data.images[0]}
                    alt={data.description || "No description"}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                />
                {/* Hover Buttons - Appear on hover */}
                <div
                className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2 p-4 transition-opacity duration-200 ${
                    isHovered ? "opacity-100" : "opacity-0"
                }`}
                >
                    <Link 
                        href={`/shop/${data.id}`}
                        className="w-full bg-black hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        Details
                    </Link>
                    <button
                        className="w-full bg-df-text hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="p-2">
                <h3 className="text-lg font-semibold text-df-text truncate">
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
                </div>
            </div>
        </div>
    );
};
