import { redirect } from "next/navigation";
import { stripeCheckoutSuccess } from "@/lib/stripe";


type SearchParams = {
    [key: string]: string | string[];
};

interface OutcomeProps {
    searchParams: SearchParams;
}


export default async function Success({ searchParams }: OutcomeProps) {
    const params = await searchParams;
    const session_id = params.session_id as string | undefined;

    if (!session_id) {
        throw new Error(`Please provide a valid session id`);
    }

    const { status, customerEmail } = await stripeCheckoutSuccess(session_id);

    if (status === 'open') {
        redirect('/shop/cart');
    }

    if (status == 'complete') {
        return (
            <section id="success" className="container mx-auto py-20">
                <p className="text-xl text-df-text">
                    We appreciate your business! A confirmation email will be sent to
                    {`${customerEmail}`}
                </p>
            </section>
        )

    }
}