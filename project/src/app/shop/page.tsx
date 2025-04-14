import { fetchProducts } from '@/lib/supabase/model';
import FilterPanel from '@/components/shop/filter-panel';
import SortSelector from '@/components/shop/sort-panel';
import PaginationControls from '@/components/shop/pagination-controls';
import ProductsGrid from '@/components/shop/products-grid';
import Banner from '@/components/banner';

const PAGE_SIZE = 8;

export default async function Shop({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = Array.isArray(searchParams.filter)
    ? searchParams.filter
    : searchParams.filter
      ? [searchParams.filter]
      : [];
  const sort = Array.isArray(searchParams.sort)
    ? searchParams.sort
    : searchParams.sort
      ? [searchParams.sort]
      : ['date_asc'];

  const page = Array.isArray(searchParams.page)
    ? searchParams.page
    : searchParams.page
      ? [searchParams.page]
      : ['0'];

  const { data, error, count } = await fetchProducts(
    parseInt(page[0]),
    PAGE_SIZE,
    filters[0],
    sort[0]
  );

  if (error || count === null) {
    return <h1 className='text-3xl'>Error loading shop page.</h1>;
  }

  const totalPages = Math.ceil(count / PAGE_SIZE);
  const currentPage = parseInt(page[0]);

  return (
    <main className='py-28'>
      <section className='container mx-auto px-4 text-center'>
        <h1 className='mb-8 text-3xl text-df-text md:text-5xl'>shop</h1>
        <FilterPanel filters={filters} />
        <SortSelector />
        <ProductsGrid products={data} />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={currentPage < totalPages - 1}
          hasPrevPage={currentPage > 0}
        />
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
