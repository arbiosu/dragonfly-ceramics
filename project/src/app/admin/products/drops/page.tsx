import { checkUser } from '@/lib/supabase/server';
import DropProductPortal from '@/components/admin/admin-drop-portal';
import { redirect } from 'next/navigation';

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    redirect('/admin/login');
  }
  return <DropProductPortal />;
}
