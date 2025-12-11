// app/api/set-email/route.ts
import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/resend/utils';

export async function POST(req: Request) {
  const { email } = await req.json();

  const subscribers = await getSubscribers();

  if (typeof subscribers === 'string') {
    return NextResponse.json({ ok: false });
  }

  const normalizedEmail = email.toLowerCase();

  const emailList =
    subscribers.data?.data?.map((c) => c.email.toLowerCase()).filter(Boolean) ||
    [];

  if (!emailList.includes(normalizedEmail)) {
    return NextResponse.json({ ok: false });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('userEmail', email, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return res;
}
