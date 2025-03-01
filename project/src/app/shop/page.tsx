import { getProducts } from "@/lib/stripe"
import ProductGrid from "@/components/product-grid"


export default async function Shop() {
    const products = await getProducts()
    console.log(products)
    return (
        <div className="container mx-auto py-20">
            <ProductGrid products={products} />
        </div>
    )
}