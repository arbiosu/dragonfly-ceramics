'use server';

import LoginForm from './login';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return <LoginForm />;
  } else {
    redirect('/admin/portal');
  }
}
