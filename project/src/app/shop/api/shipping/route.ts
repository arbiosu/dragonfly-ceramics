import { NextResponse } from "next/server";
import { fetchShippingOptions, Box } from "@/lib/usps/utils";
import type { ShippingRateObject } from "@/lib/stripe/utils";
  

export async function POST(request: Request) {
    try {
        const { destinationZip, box } = (await request.json()) as { destinationZip: string, box: Box };
        const pkg = {
            weight: box.weight,
            length: box.length,
            height: box.height,
            width: box.width,
            mailClass: box.mailClass,
        }
        const rates = await fetchShippingOptions(destinationZip, pkg);

        const shippingOptions = rates.pricingOptions[0].shippingOptions;
        const options: ShippingRateObject[] = [];

        for (const option of shippingOptions) {
            switch (option.mailClass) {
                case "PRIORITY_MAIL_EXPRESS":
                case "USPS_GROUND_ADVANTAGE":
                    const rateOption = option.rateOptions[0];
                    options.push({
                        shipping_rate_data: {
                            type: "fixed_amount",
                            fixed_amount: {
                                amount: Math.floor(rateOption.totalBasePrice*100),
                                currency: "usd",
                            },
                            display_name: option.mailClass,
                            delivery_estimate: {
                                minimum: {
                                    unit: "business_day",
                                    value: Number(rateOption.commitment.name[0])
                                },
                                maximum: {
                                    unit: "business_day",
                                    value: Number(rateOption.commitment.name[0]) + 3
                                },
                            },
                        },
                    })
                    break;
                default:
                    break;
            }
        };
        return NextResponse.json({ rates: options });
    } catch (e) {
        console.error("API error:", e);
        return NextResponse.json(
            { error: "An unknown error occurred", desc: String(e) }, 
            { status: 500 }
        );
    }
}