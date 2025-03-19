import { fetchProducts } from "@/lib/stripe/utils"
import ProductGrid from "@/components/shop/product-grid"


export default async function Shop() {
    const products = await fetchProducts();
    return (
        <main className="py-28">
            <section className="container mx-auto text-center px-4">
                <h1 className="text-3xl md:text-5xl text-df-text mb-8">Shop</h1>
                <ProductGrid products={products} />
            </section>
        </main>
    );
};
