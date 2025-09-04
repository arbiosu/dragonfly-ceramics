import { fetchProducts } from '@/lib/supabase/model';
import FilterPanel from '@/components/shop/filter-panel';
import SortSelector from '@/components/shop/sort-panel';
import PaginationControls from '@/components/shop/pagination-controls';
import ActiveSelector from '@/components/shop/active-selector';
//import ProductsGrid from '@/components/shop/products-grid';
import Image from 'next/image';
import ProductCard from '@/components/shop/product-card';

const PAGE_SIZE = 12;

export default async function Shop(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const filters = Array.isArray(searchParams.filter)
    ? searchParams.filter
    : searchParams.filter
      ? [searchParams.filter]
      : [];
  const sort = Array.isArray(searchParams.sort)
    ? searchParams.sort
    : searchParams.sort
      ? [searchParams.sort]
      : ['date_desc'];

  const page = Array.isArray(searchParams.page)
    ? searchParams.page
    : searchParams.page
      ? [searchParams.page]
      : ['0'];

  const active = Array.isArray(searchParams.active)
    ? searchParams.active
    : searchParams.active
      ? [searchParams.active]
      : [null];
  const isActive =
    active[0] === 'true' ? true : active[0] === 'false' ? false : null;

  const { data, error, count } = await fetchProducts(
    parseInt(page[0]),
    PAGE_SIZE,
    isActive,
    filters[0],
    sort[0]
  );

  if (error || count === null) {
    return <h1 className='text-3xl'>Error loading shop page.</h1>;
  }

  const totalPages = Math.ceil(count / PAGE_SIZE);
  const currentPage = parseInt(page[0]);

  return (
    <main className='flex min-h-screen flex-col items-center px-2 py-20 tracking-[-0.04em] text-black'>
      <section className='w-full max-w-7xl'>
        <div className='grid grid-cols-3 items-center gap-2'>
          <div>
            <FilterPanel filters={filters} />
          </div>
          <div>
            <Image
              src={'/shop-header.png'}
              alt='Gallery'
              height={200}
              width={400}
              unoptimized
            />
          </div>
          <div>
            <SortSelector />
            <ActiveSelector />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-8 lg:grid-cols-3'>
          {data.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={currentPage < totalPages - 1}
          hasPrevPage={currentPage < 0}
        />
      </section>
    </main>
  );
}
