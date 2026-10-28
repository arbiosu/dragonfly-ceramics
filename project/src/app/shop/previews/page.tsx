import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Page() {
  const cookieStore = await cookies();
  const email = cookieStore.get('userEmail')?.value;

  if (!email) {
    redirect('/shop/previews/enter-email');
  } else {
    redirect('/shop/previews/access-granted');
  }
}
