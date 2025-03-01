"use client";

import { CartItem } from "@/lib/stripe";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function CartItemCard({ product, quantity }: CartItem) {
    const { removeFromCart } = useCart();

    const handleRemove = () => {
        removeFromCart(product.id)
    }

    return (
        <div className="flex flex-col rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
            <div className="relative h-48 w-full bg-gray-100">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="mt-4 flex items-center">
                <span className="mx-3 w-8 text-center text-df-text">{product.name}</span>
                <span className="mx-3 w-8 text-center text-df-text">{quantity}</span>
                <div className="ml-auto">
                    <button
                        onClick={handleRemove}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-gray-100 rounded-md"
                        aria-label="Remove from Cart"
                    >
                        Remove from Cart
                    </button>
                </div>
            </div>
            {product.default_price && typeof product.default_price !== 'string'
            && product.default_price.unit_amount ? (
                <div className="mt-2 text-right text-df-text text-sm">
                    Subtotal: ${product.default_price?.unit_amount / 100}
                </div>
            ): (
                <p className="text-xl font-bold text-df-text mb-3">
                    No pricing data
                </p>
            )}
        </div>
    );
};