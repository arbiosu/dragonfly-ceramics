import Image from 'next/image';
import { fetchProducts } from '@/lib/supabase/model';
import FilterPanel from '@/components/shop/filter-panel';
import SortSelector from '@/components/shop/sort-panel';
import PaginationControls from '@/components/shop/pagination-controls';
import ActiveSelector from '@/components/shop/active-selector';
import ProductCard from '@/components/shop/product-card';
import SubscribeCard from '@/components/subscribe-card';

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
    <main className='flex min-h-screen flex-col items-center px-2 py-28 tracking-[-0.04em] text-black'>
      <section className='w-full max-w-full lg:px-8'>
        <div className='grid grid-cols-3 items-center gap-2'>
          <div>
            <FilterPanel filters={filters} />
          </div>
          <div className='justify-items-center'>
            <Image
              src={'/shop-header.png'}
              alt='Gallery'
              height={200}
              width={400}
              unoptimized
            />
          </div>
          <div className='justify-items-end'>
            <SortSelector />
            <ActiveSelector />
          </div>
        </div>
        {data.length < 1 && (
          <div className='flex flex-col items-center'>
            <div>
              <p className='mb-4 text-6xl font-medium tracking-[-0.04em] text-black lg:text-9xl'>
                sold out!
              </p>
            </div>
            <div className='md:px-40'>
              <p className='text-center text-2xl tracking-[-0.04em] text-black'>
                not seeing what you&apos;re looking for?{' '}
                <strong>sign up for my newsletter</strong> so you don&apos;t
                miss when new items come out of the kiln!
              </p>
            </div>
            <div className='pt-10'>
              <SubscribeCard text='' />
            </div>
          </div>
        )}
        <div className='mt-10 grid grid-cols-2 gap-8 lg:grid-cols-3'>
          {data.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {data.length > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={currentPage < totalPages - 1}
            hasPrevPage={currentPage < 0}
          />
        )}
      </section>
    </main>
  );
}
