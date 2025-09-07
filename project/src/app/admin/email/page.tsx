import { checkUser } from '@/lib/supabase/server';
import EmailPortal from '@/components/admin/email-portal';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    redirect('/admin/login');
  }
  return <EmailPortal />;
}
