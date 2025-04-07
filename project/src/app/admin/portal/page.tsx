import AdminPortal from '@/components/admin/portal';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Portal() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }
  return <AdminPortal />;
}
