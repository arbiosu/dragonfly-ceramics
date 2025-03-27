"use client"

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/stripe/utils";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import SubscribeCard from "@/components/subscribe-card";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    const availableInventory = Number(product.metadata.inventory) || 0;
    if (quantity > availableInventory) {
      addToast({
        title: "Inventory Limit",
        description: `Only ${availableInventory} items available in stock`,
        variant: "error",
      });
      return;
    }

    addToCart(product, quantity)

    addToast({
        title: "Added to Cart",
        description: `${quantity} ${product.name}(s) added to your cart!`,
        variant: "success",
    });

    setQuantity(1);
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  }
  
  const incrementQuantity = () => {
    const availableInventory = Number(product.metadata.inventory) || 10;
    setQuantity(prev => Math.min(prev + 1, availableInventory));
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  }

  const excludedKeys = ["type", "height", "length", "width", "weight"];

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
            <span>back to shop</span>
          </Link>
          
          {/* Main Image */}
          <div className="relative w-full max-w-2xl mx-auto aspect-square">
            <Image
              src={product.images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.description || "Product image"}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={product.images[selectedImageIndex]}
              priority
            />
          </div>

          {/* Image Navigation */}
          {product.images.length > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-4">
              <button 
                onClick={handlePrevImage}
                className="bg-dfNew hover:bg-dfNew2 p-2 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-df-text"
                aria-label="Previous Image"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="text-sm text-gray-600">
                {selectedImageIndex + 1} / {product.images.length}
              </div>

              <button 
                onClick={handleNextImage}
                className="bg-dfNew hover:bg-dfNew2 p-2 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-df-text"
                aria-label="Next Image"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-6 py-20">
          <div>
            <h1 className="text-3xl text-df-text">{product.name.toLowerCase()}</h1>
            {/* Price */}
            <div className="mt-4">
                <p className="text-2xl text-df-text">${product.price}</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none text-df-text">
            <h3 className="text-xl">description</h3>
            <p>{product.description.toLowerCase() || "No description available"}</p>
          </div>

          {product.metadata && Object.keys(product.metadata).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center">
                <h3 className="text-xl text-df-text mr-2">details</h3>
                <button 
                  onClick={toggleDetails}
                  className="text-black text-2xl focus:outline-none"
                >
                  {detailsVisible ? "-" : "+"}
                </button>
              </div>
              <ul className={`list-disc pl-5 text-df-text transition-all duration-300 ${detailsVisible ? "block" : "hidden"}`}>
                {Object.entries(product.metadata)
                  .filter(([key]) => !excludedKeys.includes(key))
                  .map(([key, value]) => (
                  <li key={key}>
                    <span className="text-lg text-df-text">{key}: {value}</span> 
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center space-x-4 text-df-text">
            <label htmlFor="quantity" className="text-xl text-df-text">Quantity:</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                onClick={decrementQuantity}
                className="px-3 py-2 transition-colors"
                aria-label="Decrease Quantity"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <input 
                type="number" 
                id="quantity"
                min="1"
                max={Number(product.metadata.inventory) || 10}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center appearance-none outline-none px-2 py-2"
              />
              <button 
                onClick={incrementQuantity}
                className="px-3 py-2 transition-colors"
                aria-label="Increase Quantity"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="">
            <button
              className="w-full bg-dfNew2 hover:bg-dfNew hover:text-white text-df-text py-2 px-4 rounded-md transition-colors"
              onClick={handleAddToCart}
            >
              Add {quantity} to Cart
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
      <div className="max-w-lg mx-auto mt-12">
          <SubscribeCard />
        </div>
    </div>
  );
};