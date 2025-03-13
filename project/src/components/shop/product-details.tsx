"use client"

//import type { Stripe } from "stripe";
import Image from "next/image";
import { useState } from "react";
//import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";

type ProductDetail = {
    id: string;
    active: boolean;
    description: string;
    name: string;
    images: string[];
    metadata: object;
    price: string;
}


interface ProductDetailsProps {
  product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0])
  //const { addToCart } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = () => {
    //addToCart(product)
    addToast({
      title: "Added to Cart",
      description: `${product.name} has successfully been added to your cart!`,
      variant: "success",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
        {/*TODO: use shop link, make svg a prop */}
        <Link 
            href={"/shop"}
            className="inline-flex items-center justify-center px-5 py-3 mr-3
            text-base font-bold text-center text-white rounded-lg bg-df-text
            hover:bg-blue-300 focus:ring-4 focus:ring-white"
        >
            Back to Shop
        </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt={product.description || "Product image"}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
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
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-df-text">{product.name}</h1>

            {/* Price */}
            <div className="mt-4">
                <p className="text-2xl font-bold text-df-text">${product.price}</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none text-df-text">
            <h3 className="text-lg font-medium">Description</h3>
            <p>{product.description || "No description available"}</p>
          </div>

          {/* Metadata/Features */}
          {product.metadata && Object.keys(product.metadata).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-df-text">Features</h3>
              <ul className="list-disc pl-5 text-df-text">
                {Object.entries(product.metadata).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="flex-1 bg-df-text rounded-lg hover:bg-blue-300 text-white font-semibold py-6"
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
  )
}

