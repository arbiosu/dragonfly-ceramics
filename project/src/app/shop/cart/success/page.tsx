import { stripeCheckoutSuccess } from "@/lib/stripe/utils";
import OrderSummary from "@/components/shop/order-summary";


export default async function Success({
    searchParams,
}: {
    searchParams: Promise<{ [key:string]: string | string[] | undefined }>
}) {
    
    const session_id = (await searchParams).session_id as string | undefined;

    if (!session_id) {
        throw new Error(`Please provide a valid session id`);
    }

    const { session, status, customerEmail } = await stripeCheckoutSuccess(session_id);

    const orderSummary = {
        id: session.id,
        amountTotal: session.amount_total,
        address: session.shipping_details?.address || "N/A",
        lineItems: session.line_items,
        email: customerEmail ? customerEmail : "No email"
    }

    if (status == 'complete') {
        return (
            <section id="success" className="container mx-auto py-20">
                <OrderSummary session={orderSummary} />
                <p className="text-xl text-df-text">
                    We appreciate your business! A confirmation email will be sent to {`${customerEmail}`}
                </p>
            </section>
        );
    }
    
   return (
        <h1>Success</h1>
   )
};
