"use client";

import type { Product } from "@/lib/stripe/utils";
import { useState, useMemo } from "react";
import ProductCard from "@/components/shop/product-card";

interface ProductGridProps {
    products: Product[];
}

type Filter = 
"all" 
| "mugs"
| "vases"
| "oil dispensers"
| "soap dispensers"
| "coasters"
| "berry bowls"
| "merch";


export default function ProductGrid({ products }: ProductGridProps) {
    const [filter, setFilter] = useState<Filter>("all");

    const filteredProducts = useMemo(() => {
        if (filter === "all") {
            return products;
        }
        return products.filter((item) => item.metadata.type === filter);
    }, [products, filter]);

    const filterButtons: Filter[] = [
        "all",
        "mugs",
        "vases",
        "oil dispensers",
        "soap dispensers",
        "coasters",
        "berry bowls",
        "merch",
    ];

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {filterButtons.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => setFilter(label)}
                        className={`px-4 py-2 text-df-text font-medium
                         ${
                            filter === label
                            ? "border-solid border-b-4 border-dfNew"
                            : "text-gray-500"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:mx-40">
                    {filteredProducts.map((product, index) => (
                    <div key={index} className="flex justify-center">
                        <ProductCard  data={product} />
                    </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-40">
                    <p className="text-2xl font-semibold text-df-text">Sold Out!</p>
                </div>
            )}
        </div>
    );
};
