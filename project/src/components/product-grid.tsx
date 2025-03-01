import { Stripe } from "stripe";
import ProductCard from "@/components/product-card";

interface ProductGridProps {
    products: Stripe.Product[];
}


export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {products.map((product, index) => (
                <ProductCard key={index} data={product} />
            ))}
        </div>
    )
}