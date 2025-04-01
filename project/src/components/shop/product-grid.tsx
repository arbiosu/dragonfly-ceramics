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
| "comfy cups"
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
        "comfy cups",
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
                    <option value="none">new releases</option>
                    <option value="asc">price: low to high</option>
                    <option value="desc">price: high to low</option>
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
                    <p className="text-2xl font-semibold text-df-text">sold out!</p>
                </div>
            )}
        </div>
    );
};
