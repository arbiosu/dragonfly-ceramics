import { checkUser } from '@/lib/supabase/server';
import ProductPortal from '@/components/admin/product-portal';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    redirect('/admin/login');
  }
  return <ProductPortal />;
}
