import { resend } from "@/lib/resend/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const email: string = body.email;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Dragonfly Ceramics <noreply@updates.dragonflyceramics.com>',
            to: email,
            subject: "Dragonfly Ceramics Subscription Notification",
            html: '<p>Thank you for subscribing! You will periodically receive updates on our product offerings. Have a great day!</p>',
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        
        const contact = await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: "e739b112-5ab4-40f4-95e3-7bc676fbc1d2",
        });

        if (contact.error) {
            console.log(contact.error);
            return NextResponse.json({ error: contact.error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};