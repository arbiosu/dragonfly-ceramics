import { resend } from "@/lib/resend/resend";
import { NextResponse } from "next/server";

interface ContactMessage {
    name: string;
    email: string;
    source: string;
    topic: string;
    message: string;
}

export async function POST(req: Request) {
    const body: ContactMessage = await req.json();
    
    try {
        const { data, error } = await resend.emails.send({
            from: 'Dragonfly Contact Form <noreply@updates.dragonflyceramics.com>',
            to: "dragonflyceramics.kelly@gmail.com",
            subject: `Message from Contact Form: ${body.topic}`,
            html: `<p>
                    From: ${body.name} ${body.email}
                   </p>
                   <br></br>
                   <p>Source: ${body.source}</p>
                   <br></br>
                   <p>Topic: ${body.topic}</p>
                   <br></br>
                   <p>Message: ${body.message}</p>
                   ` 
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}