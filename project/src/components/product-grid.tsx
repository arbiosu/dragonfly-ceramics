"use client";

import { Stripe } from "stripe";
import { useState, useMemo } from "react";
import ProductCard from "@/components/product-card";

interface ProductGridProps {
    products: Stripe.Product[];
}

type Filter = "all" | "mugs" | "vases" | "oil dispensers" | "soap dispensers" | "coasters" | "merch";


export default function ProductGrid({ products }: ProductGridProps) {
    const [filter, setFilter] = useState<Filter>("all");

    const filteredProducts = useMemo(() => {
        if (filter === "all") {
            return products;
        }
        return products.filter((item) => item.metadata.type === filter);
    }, [products, filter]);

    const filterButtons: Filter[] = [
        "all", "mugs", "vases", "oil dispensers", "soap dispensers", "coasters", "merch"
    ];


    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {filterButtons.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => setFilter(label)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors
                        duration-200 text-df-text ${
                                filter === label
                                ? "bg-blue-400"
                                : "bg-blue-300 hover:bg-blue-300/80"
                                }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="flex justify-center">
                        <ProductCard  data={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}
