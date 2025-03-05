import { resend } from "@/lib/resend/resend";

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'amea@oregonstate.edu',
            subject: "Hello World",
            html: '<p>Success!</p>'
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
};