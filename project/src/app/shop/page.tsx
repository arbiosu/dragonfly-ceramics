import { 
    fetchProducts,
    serializeStripeProduct,
    type Product
} from "@/lib/stripe/utils"
import ProductGrid from "@/components/shop/product-grid"
import Banner from "@/components/banner";

export const revalidate = 3600 // revalidate every hour?

export default async function Shop() {
    const products = await fetchProducts();
    const serializedProducts: Product[] = [];
    for (const product of products) {
        const serialized = await serializeStripeProduct(product);
        serializedProducts.push(serialized)
        console.log(serialized.images);
    }
    return (
        <main className="py-28">
            <section className="container mx-auto text-center px-4">
                <h1 className="text-3xl md:text-5xl text-df-text mb-8">shop</h1>
                <ProductGrid products={serializedProducts} />
                <div className="py-20">
                    <Banner
                        title={"for custom orders, wholesale, and any other questions:"}
                        description=""
                        buttonText="contact form"
                        buttonLink="/contact"
                        variant="default"
                    />
                </div>

            </section>
        </main>
    );
};
