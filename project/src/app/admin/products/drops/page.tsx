import { checkUser } from '@/lib/supabase/server';
import DropProductPortal from '@/components/admin/admin-drop-portal';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    redirect('/admin/login');
  }
  return <DropProductPortal />;
}
