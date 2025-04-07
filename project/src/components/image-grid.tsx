import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageCard {
  heading: string;
  src: string;
}

interface ImageGridProps {
  items: ImageCard[];
}

interface ImageGridItemProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ImageGrid({ items }: ImageGridProps) {
  return (
    <section className='mx-auto bg-df-bg px-4 py-12 md:py-20'>
      <div className='grid gap-8 md:grid-cols-3'>
        {items.map((card) => (
          <div key={card.src} className='group cursor-pointer'>
            <div className='relative mb-4 aspect-square overflow-hidden bg-stone-100'>
              <Image
                src={card.src}
                alt={card.heading}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </div>
            <h3 className='text-lg tracking-wider text-df-text'>
              {card.heading}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ImageGridItem({
  src,
  alt,
  className,
  priority = false,
}: ImageGridItemProps) {
  return (
    <div
      className={cn('relative aspect-square w-full overflow-hidden', className)}
    >
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill
        priority={priority}
        sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
        className='object-cover'
        placeholder='blur'
        blurDataURL={src}
      />
    </div>
  );
}

export function LargeImageGrid() {
  return (
    <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
      <ImageGridItem
        src='/dragonfly.jpg'
        alt='Large grid image 1'
        priority
        className='md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2'
      />
      <ImageGridItem src='/pottery.jpg' alt='Grid image 2' />
      <ImageGridItem src='/pottery1.jpg' alt='Grid image 3' />
      <ImageGridItem src='/pottery2.jpg' alt='Grid image 4' />
      <ImageGridItem src='/pottery-hand.jpg' alt='Grid image 5' />
    </div>
  );
}
