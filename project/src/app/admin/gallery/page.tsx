import { checkUser } from '@/lib/supabase/server';
import GalleryPortal from '@/components/admin/gallery-portal';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    redirect('/admin/login');
  }
  return <GalleryPortal />;
}
