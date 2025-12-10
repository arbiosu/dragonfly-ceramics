import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const email = cookieStore.get('userEmail')?.value;

  if (!email) {
    redirect('/shop/previews/enter-email');
  } else {
    redirect('/shop/previews/access-granted');
  }
}
