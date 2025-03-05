"use client";

import { CartItem } from "@/lib/stripe";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";

export default function CartItemCard({ product, quantity }: CartItem) {
    const { removeFromCart } = useCart();
    const { addToast } = useToast();

    const handleRemove = () => {
        removeFromCart(product.id)
        addToast({
            title: "Removed from Cart",
            description: `${product.name} has been removed from your Cart.`,
            variant: "warning",
        });
    };

    return (
        <div className="relative group w-full max-w-sm bg-df-bg rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full aspect-square">
                <Image
                    src={product.images[0]}
                    alt={product.description || "No description"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 256px"
                />
            </div>
            <div className="p-2">
                <h3 className="text-lg font-semibold text-df-text">{product.name}</h3>
                <p className="text-sm text-df-text mb-2 flex-grow">QTY: {quantity}</p>
                {product.default_price && typeof product.default_price !== 'string'
                && product.default_price.unit_amount ? (
                    <div className="mt-2 text-df-text font-bold text-sm">
                        Subtotal: ${product.default_price?.unit_amount / 100}
                    </div>
                ): (
                    <p className="text-xl font-bold text-df-text mb-3">
                        No pricing data
                    </p>
                )}
                <div className="ml-auto">
                    <button
                        onClick={handleRemove}
                        className="font-semibold px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors"
                        aria-label="Remove from Cart"
                    >
                        Remove from Cart
                    </button>
                </div>
            </div>
        </div>
    );
};