import Link from 'next/link';
import Image from 'next/image';
import { Tables } from '@/lib/supabase/database';

export default function GalleryCard({
  image,
}: {
  image: Tables<'gallery_images'>;
}) {
  return (
    <div className='relative w-full overflow-hidden'>
      <Link
        href={`/gallery/${image.id}`}
        prefetch={false}
        className='cursor-pointer select-none'
      >
        <div className='relative aspect-square w-full overflow-hidden rounded-[2rem] border border-black p-4'>
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image.path}`}
            alt={image.type}
            fill
            sizes='100vw'
            unoptimized
          />
        </div>
      </Link>
      <div className='p-4'>
        <div className='flex items-start justify-between'>
          <div className='min-w-0 flex-1 -space-y-2'>
            <h3 className='truncate text-xl font-medium'>
              {image.type.toLowerCase()}
            </h3>
            <p className='-mt-2 truncate text-base font-extralight md:text-lg'>
              {image.color}
            </p>
            <p className='-mt-2 truncate text-base font-extralight md:text-lg'>
              {image.year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
