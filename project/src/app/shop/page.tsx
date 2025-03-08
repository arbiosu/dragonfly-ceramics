import { fetchProducts } from "@/lib/stripe/utils"
import ProductGrid from "@/components/shop/product-grid"
import { createClient } from "@/lib/supabase/server"


export default async function Shop() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        return (
            <main className="py-60">
                <div className="py-20">
                    <h1 className="text-3xl text-df-text text-center font-bold">Coming soon!</h1>
                </div>
            </main>
        );
    } else {
        const products = await fetchProducts();
        return (
            <main className="py-20">
                <section className="container mx-auto text-center px-4">
                    <h1 className="text-3xl md:text-5xl text-df-text font-bold mb-8">Shop</h1>
                    <ProductGrid products={products} />
                </section>
            </main>
        );
    }
};
