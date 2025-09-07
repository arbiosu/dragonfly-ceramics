import { redirect } from 'next/navigation';
import { getGalleryImageById } from '@/lib/supabase/model';
import GalleryDetailCard from '@/components/gallery/gallery-details';

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const id = (await params).slug;
  const { data, error } = await getGalleryImageById(id);

  if (error) {
    redirect('/gallery');
  }

  return (
    <main className='min-h-screen px-4 py-20 tracking-[-0.04em] text-black'>
      <section className='flex justify-center'>
        <GalleryDetailCard image={data} />
      </section>
    </main>
  );
}
