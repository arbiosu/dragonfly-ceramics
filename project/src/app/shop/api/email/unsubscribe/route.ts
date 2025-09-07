import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend/resend';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    await resend.contacts.remove({
      email,
      audienceId: 'e739b112-5ab4-40f4-95e3-7bc676fbc1d2',
    });

    return NextResponse.json({
      message: `You’ve been unsubscribed: ${email}`,
    });
  } catch (err) {
    console.error('Unsubscribe error:', err);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}
