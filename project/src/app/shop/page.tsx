import { fetchProducts } from '@/lib/supabase/model';
import FilterPanel from '@/components/shop/filter-panel';
import SortSelector from '@/components/shop/sort-panel';
import PaginationControls from '@/components/shop/pagination-controls';
import ActiveSelector from '@/components/shop/active-selector';
import ProductsGrid from '@/components/shop/products-grid';
import Image from 'next/image';

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
    <main className='py-28 tracking-[-0.069em]'>
      <section className='container mx-auto'>
        <div className='flex max-w-sm justify-center md:hidden'>
          <Image
            src='/shop-header.png'
            alt='Handmade in NYC'
            height={200}
            width={400}
            className='h-auto w-full'
            unoptimized
          />
        </div>
        <div className='mb-8 flex items-center justify-between gap-4 md:grid md:grid-cols-12 md:items-start'>
          <div className='flex-shrink-0 px-2 md:col-span-3 lg:px-16'>
            <FilterPanel filters={filters} />
          </div>

          <div className='hidden w-full justify-center md:col-span-6 md:flex'>
            <div className='w-full max-w-sm'>
              <Image
                src='/shop-header.png'
                alt='Handmade in NYC'
                height={200}
                width={200}
                className='h-auto w-full'
                unoptimized
              />
            </div>
          </div>

          <div className='flex flex-col items-end px-2 md:col-span-3 lg:px-8'>
            <div className='w-48'>
              <SortSelector />
              <ActiveSelector />
            </div>
          </div>
        </div>

        <ProductsGrid products={data} />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={currentPage < totalPages - 1}
          hasPrevPage={currentPage > 0}
        />
      </section>
    </main>
  );
}
