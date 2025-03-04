import { getProducts } from "@/lib/stripe"
import ProductGrid from "@/components/product-grid"


export default async function Shop() {
    const products = await getProducts()
    return (
        <main className="py-20">
            <section className="container mx-auto text-center px-4">
                <h1 className="text-3xl md:text-5xl text-df-text font-bold mb-8">Shop</h1>
                <ProductGrid products={products} />
            </section>
        </main>
    );
};
