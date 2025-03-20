"use client"

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/stripe/utils";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";



interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0])
  const { addToCart } = useCart();
  const { addToast } = useToast();

  // TODO: crusty implementation, too many calls to Stripe. Have to restructure 
  // CartItem later on
  const handleAddToCart = () => {
    addToCart(product);
    addToast({
        title: "Added to Cart",
        description: `${product.name} has successfully been added to your cart!`,
        variant: "success",
    });
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
            <Link
              href={"/shop"}
              className="inline-flex items-center px-5 mb-4 gap-2 md:mx-36
              text-df-text text-2xl
              hover:text-dfNew2 focus:ring-4 focus:ring-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0"
              >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Shop</span>
            </Link>
          {/* Main Image */}
          <div className="relative w-full max-w-sm mx-auto aspect-square">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt={product.description || "Product image"}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex justify-center max-w-md mx-auto space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === image ? "border-df-text" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    className="object-cover"
                    fill
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col space-y-6 py-20">
          <div>
            <h1 className="text-3xl text-df-text">{product.name}</h1>
            {/* Price */}
            <div className="mt-4">
                <p className="text-2xl text-df-text">${product.price}</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none text-df-text">
            <h3 className="text-lg font-medium">Description</h3>
            <p>{product.description || "No description available"}</p>
          </div>

          <div className="">
            <button
                className="w-full bg-dfNew hover:bg-dfNew2 text-white py-2 px-4 rounded-md transition-colors"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Availability</p>
                <p className="font-medium text-df-text">{product.active ? "In Stock" : "Out of Stock"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

