import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { resend } from '@/lib/resend/resend';
import { type ShippoAddress } from '@/lib/shippo/types';
import { type CartItem } from '@/lib/stripe/utils';

const RATE_LIMIT = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const COOKIE_NAME = 'international_shipping';

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
      const timeRemaining = Math.ceil((resetTime - Date.now()) / 60000); // in minutes

      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          resetInMinutes: timeRemaining,
        },
        { status: 429 }
      );
    }

    const { address, cartItems } = (await req.json()) as {
      address: ShippoAddress;
      cartItems: CartItem[];
    };

    const cartStringify = JSON.stringify(cartItems);

    const { data, error } = await resend.emails.send({
      from: 'International Order Request <noreply@updates.dragonflyceramics.com>',
      to: 'dragonflyceramics.kelly@gmail.com',
      subject: `International Order Request - Dragonfly Ceramics Shop`,
      html: `
                    <p>Street Line 1: ${address.street1}</p>
                    <p>Street Line 2: ${address.street2}</p>
                    <p>City/Locality: ${address.city}</p>
                    <p>State/Province: ${address.state}</p>
                    <p>Postal Code: ${address.zip}
                    <p>Country: ${address.country}</p>
                    <br />
                    <p>Contact Details:<p>
                    <p>Name: ${address.name}
                    <p>Email: ${address.email}</p>
                    <p>Phone Number: ${address.phone}</p>
                    <p>Cart: ${cartStringify}</p>
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
