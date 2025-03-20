"use client";

import { CartItem } from "@/lib/stripe/utils";
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
        <div className="overflow-hidden flex items-center p-4">
            <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                <Image
                    src={product.images[0]}
                    alt={product.description || "No description"}
                    fill
                    className="object-cover rounded-md"
                    sizes="80px"
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-df-text">{product.name}</h3>
                <p className="text-sm text-df-text mb-2">Quantity: {quantity}</p>
                    <div className="mt-2 text-df-text font-bold text-sm">
                        Subtotal: ${Number(product.price)*quantity}
                    </div>
                <button
                    onClick={handleRemove}
                    className="font-semibold px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                    aria-label="Remove from Cart"
                >
                    Remove from Cart
                </button>
            </div>
        </div>
    );
};