import { redirect } from "next/navigation";
import { stripeCheckoutSuccess } from "@/lib/stripeUtils";
import OrderSummary from "@/components/shop/order-summary";


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

    const { session, status, customerEmail } = await stripeCheckoutSuccess(session_id);

    if (status === 'open') {
        redirect('/shop/cart');
    }

    const orderSummary = {
        id: session.id,
        amountTotal: session.amount_total,
        address: session.shipping_details?.address || "N/A",
        lineItems: session.line_items
    }

    if (status == 'complete') {
        return (
            <section id="success" className="container mx-auto py-20">
                <OrderSummary session={orderSummary} />
                <p className="text-xl text-df-text">
                    We appreciate your business! A confirmation email will be sent to {`${customerEmail}`}
                </p>
            </section>
        )
    }
}