import { fetchGalleryImages } from '@/lib/supabase/model';
import Link from 'next/link';
import GalleryUploader from './gallery-uploader';
import AdminGalleryCard from './gallery-admin-card';

export default async function GalleryPortal() {
  const { data, count, error } = await fetchGalleryImages(
    0,
    100,
    null,
    'date_desc'
  );
  if (error || count == null) {
    return (
      <h1 className='text-3xl text-df-text'>
        There has been an error with the admin portal.
      </h1>
    );
  }

  return (
    <section className='container mx-auto py-20 text-black'>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-start'>
          <h1 className='text-4xl font-bold'>Gallery Portal</h1>
          <h2 className='text-2xl'>
            Total Gallery Images saved in Database: <strong>{count}</strong>
          </h2>
        </div>
      </div>

      <div>
        <GalleryUploader />
      </div>
      <div className='grid grid-cols-2 gap-4 md:mx-40 md:grid-cols-3'>
        {data.map((image, index) => (
          <div key={index} className='flex justify-center'>
            <AdminGalleryCard image={image} />
          </div>
        ))}
      </div>
    </section>
  );
}
