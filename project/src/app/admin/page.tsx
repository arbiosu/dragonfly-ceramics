'use server';

import { checkUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminPortal from '@/components/admin/portal';
import EmailPortal from '@/components/admin/email-portal';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    console.log('ERROR WITH AUTH');
    redirect('/admin/login');
  } else {
    return (
      <>
        <AdminPortal />
        <EmailPortal />
      </>
    );
  }
}
