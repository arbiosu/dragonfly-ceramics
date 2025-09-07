import { resend } from '@/lib/resend/resend';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface ConsultingMessage {
  name: string;
  email: string;
  businessName: string;
  preferredDate: string;
  message: string;
}

const RATE_LIMIT = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const COOKIE_NAME = 'consulting_submissions';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const submissionsCookie = (await cookieStore).get(COOKIE_NAME);

    let submissions: { timestamp: number; count: number } = {
      timestamp: Date.now(),
      count: 0,
    };
    if (submissionsCookie?.value) {
      try {
        submissions = JSON.parse(submissionsCookie.value);
        if (Date.now() - submissions.timestamp > RATE_LIMIT_WINDOW) {
          submissions = { timestamp: Date.now(), count: 0 };
        }
      } catch (e) {
        console.error(e);
        submissions = { timestamp: Date.now(), count: 0 };
      }
    }
    if (submissions.count >= RATE_LIMIT) {
      const resetTime = submissions.timestamp + RATE_LIMIT_WINDOW;
      const timeRemaining = Math.ceil((resetTime - Date.now()) / 60000);

      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          resetInMinutes: timeRemaining,
        },
        { status: 429 }
      );
    }

    const body: ConsultingMessage = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Dragonfly Consulting Form <noreply@updates.dragonflyceramics.com>',
      to: 'dragonflyceramics.kelly@gmail.com',
      subject: `Consulting Request from ${body.businessName}`,
      html: `
      <p>From: ${body.name} --- ${body.businessName} --- ${body.email}</p>
      <p>Preferred Date/Time: ${body.preferredDate}</p>
      <p>Message: ${body.message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    submissions.count += 1;

    const response = NextResponse.json(
      {
        data,
        remaining: RATE_LIMIT - submissions.count,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: JSON.stringify(submissions),
      expires: new Date(Date.now() + RATE_LIMIT_WINDOW),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
