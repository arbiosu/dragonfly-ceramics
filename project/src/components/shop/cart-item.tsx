"use client"

import type { CartItem } from "@/lib/stripe/utils"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/contexts/ToastContext"
import Image from "next/image"
import Link from "next/link"

export default function CartItemCard({ product, quantity }: CartItem) {
  const { removeFromCart, addToCart, updateCartItemQuantity } = useCart()
  const { addToast } = useToast()

  const handleRemove = () => {
    removeFromCart(product.id)
    addToast({
      title: "Removed from Cart",
      description: `${product.name} has been removed from your Cart.`,
      variant: "warning",
    })
  }

  const handleAddToCart = () => {
    addToCart(product)
    addToast({
      title: "Added to Cart",
      description: `${product.name} has successfully been added to your cart!`,
      variant: "success",
    })
  }

  const handleDecrementQuantity = () => {
    if (quantity - 1 === 0) {
      handleRemove()
      return
    }
    updateCartItemQuantity(product.id, quantity - 1)
    addToast({
      title: "Removed from Cart",
      description: `One ${product.name} has been removed from your cart!`,
      variant: "warning",
    })
  }

  return (
    <>
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-6 text-df-text w-full">
        {/* Product info */}
        <div className="flex items-center col-span-3 sm:col-span-1">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 mr-3 sm:mr-4">
            <Link href={`/shop/${product.id}`}>
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.description}
                fill
                placeholder="blur"
                blurDataURL={product.images[0]}
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 120px"
                className="object-cover rounded"
              />
            </Link>
          </div>
          <div className="truncate">
            <span className="text-base sm:text-lg font-medium">{product.name}</span>
          </div>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-between sm:justify-center col-span-2 sm:col-span-1 mt-2 sm:mt-0">
          <span className="text-sm sm:text-base sm:mr-2">Quantity:</span>
          <div className="flex items-center border rounded">
            <button
              onClick={handleDecrementQuantity}
              className="px-2 py-1 text-lg hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-2 py-1 min-w-[24px] text-center">{quantity}</span>
            <button
              onClick={handleAddToCart}
              className="px-2 py-1 text-lg hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Price and remove */}
        <div className="flex items-center justify-between sm:justify-end col-span-3 sm:col-span-1 mt-2 sm:mt-0">
          <span className="text-base sm:text-lg font-medium">${Number(product.price) * quantity}</span>
          <button
            onClick={handleRemove}
            className="ml-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <span className="text-xl">×</span>
          </button>
        </div>
      </div>
      <hr className="my-4 sm:my-6 border-dfNew" />
    </>
  );
};
