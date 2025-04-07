import {
  fetchProducts,
  serializeStripeProduct,
  type Product,
} from '@/lib/stripe/utils';
import ProductGrid from '@/components/shop/product-grid';
import Banner from '@/components/banner';

export default async function Shop() {
  const products = await fetchProducts();
  const serializedProducts: Product[] = [];
  for (const product of products) {
    const serialized = await serializeStripeProduct(product);
    serializedProducts.push(serialized);
  }
  return (
    <main className='py-28'>
      <section className='container mx-auto px-4 text-center'>
        <h1 className='mb-8 text-3xl text-df-text md:text-5xl'>shop</h1>
        <ProductGrid products={serializedProducts} />
        <div className='py-20'>
          <Banner
            title={'for custom orders, wholesale, and any other questions:'}
            description=''
            buttonText='contact form'
            buttonLink='/contact'
            variant='default'
          />
        </div>
      </section>
    </main>
  );
}
