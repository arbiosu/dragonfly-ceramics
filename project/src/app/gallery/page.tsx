import Image from 'next/image';
import { fetchGalleryImages } from '@/lib/supabase/model';
import FilterPanel from '@/components/gallery/filter-panel';
import SortPanel from '@/components/gallery/sort-panel';
import PaginationControls from '@/components/shop/pagination-controls';
import GalleryCard from '@/components/gallery/gallery-card';

const PAGE_SIZE = 4;

export default async function Gallery(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const filters = Array.isArray(searchParams.filter)
    ? searchParams.filter
    : searchParams.filter
      ? [searchParams.filter]
      : [];

  const order = Array.isArray(searchParams.order)
    ? searchParams.order
    : searchParams.order
      ? [searchParams.order]
      : ['date_desc'];

  const page = Array.isArray(searchParams.page)
    ? searchParams.page
    : searchParams.page
      ? [searchParams.page]
      : ['0'];

  const { data, error, count } = await fetchGalleryImages(
    parseInt(page[0]),
    PAGE_SIZE,
    filters[0],
    order[0]
  );

  if (error || count === null) {
    console.log(error);
    return <h1>Error loading gallery.</h1>;
  }

  const totalPages = Math.ceil(count / PAGE_SIZE);
  const currentPage = parseInt(page[0]);

  return (
    <main className='flex min-h-screen flex-col items-center px-2 py-28 tracking-[-0.04em] text-black xl:m-20'>
      <section className='w-full max-w-full lg:px-8'>
        <div className='grid grid-cols-3 items-center gap-2'>
          <div>
            <FilterPanel filters={filters} />
          </div>
          <div className='justify-items-center'>
            <Image
              src={'/gallery-header.png'}
              alt='Gallery'
              height={400}
              width={400}
              unoptimized
            />
          </div>
          <div className='justify-items-end'>
            <SortPanel />
          </div>
        </div>
        <div className='mt-10 grid grid-cols-2 gap-4 xl:gap-12'>
          {data.map((image) => (
            <div key={image.id} className=''>
              <GalleryCard image={image} />
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
