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
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

    const filteredProducts = useMemo(() => {
        let filtered = filter === "all"
        ? products
        : products.filter((item) => item.metadata.type === filter);

        if (sortOrder === "asc") {
            filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortOrder === "desc") {
            filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
        }
        return filtered;
    }, [products, filter, sortOrder]);

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
            <div className="flex justify-center gap-4 mb-4">
                <label htmlFor="sortOrder" className="text-df-text text-lg hidden">Sort Products:</label>
                <select
                    id="sortOrder"
                    onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "none")}
                    value={sortOrder}
                    className="px-4 py-2 text-df-text text-lg bg-df-bg rounded"
                >
                    <option value="none">New Releases</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
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
