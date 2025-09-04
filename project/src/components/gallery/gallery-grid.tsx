import { Tables } from '@/lib/supabase/database';
import GalleryCard from './gallery-card';

export default function GalleryGrid({
  images,
}: {
  images: Tables<'gallery_images'>[];
}) {
  return (
    <section>
      {images.length > 0 ? (
        <div className='grid grid-cols-2 gap-2'>
          {images.map((image) => (
            <div key={image.id} className='flex justify-center'>
              <GalleryCard image={image} />
            </div>
          ))}
        </div>
      ) : (
        <div>empty</div>
      )}
    </section>
  );
}
