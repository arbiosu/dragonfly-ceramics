import { NextResponse } from "next/server";
import { fetchShippingOptions, Package } from "@/lib/usps/utils";

interface USPSError {
    error: string;
    error_description: string;
    error_uri: string;
}

interface ShippingRateObject {
    shipping_rate_data: {
      type: 'fixed_amount';
      fixed_amount: {
        amount: number;
        currency: string;
      };
      display_name: string;
      delivery_estimate: {
        minimum: {
          unit: 'business_day';
          value: number;
        };
        maximum: {
          unit: 'business_day';
          value: number;
        };
      };
    };
  }
  

export async function POST(request: Request) {
    try {
        const { destinationZip, pkg } = (await request.json()) as { destinationZip: string, pkg: Package };
        console.log("API received request:", { destinationZip, pkg });
        const rates = await fetchShippingOptions(destinationZip, pkg)
        console.log("Shipping rates received:", rates);
        const options = rates.pricingOptions[0].shippingOptions;
        const shippingOptions: ShippingRateObject[] = [];
        for (const option of options) {
            switch (option.mailClass) {
                case "PRIORITY_MAIL":
                case "PRIORITY_MAIL_EXPRESS":
                case "USPS_GROUND_ADVANTAGE":
                    for (const data of option.rateOptions) {
                        shippingOptions.push({
                            shipping_rate_data: {
                                type: "fixed_amount",
                                fixed_amount: {
                                    amount: data.totalBasePrice,
                                    currency: "usd",
                                },
                                display_name: `${data.rates[0].description} - ${data.commitment.name} Shipping`,
                                delivery_estimate: {
                                    minimum: {
                                        unit: "business_day",
                                        value: Number(`${data.commitment.name[0]}`)
                                    },
                                    maximum: {
                                        unit: "business_day",
                                        value: Number(`${data.commitment.name[0]}`) + 3
                                    }
                                }
                            }
                        });
                    }
                    
                    break;
                default:
                    break;
            }
        };
        for (const option of shippingOptions) {
            console.log(option)
        }
        return NextResponse.json({ rates: shippingOptions });

    } catch (e: unknown) {
        // Type guard to check if error matches USPSError interface
        if (e && typeof e === 'object' && 'error' in e && 'error_description' in e) {
            const uspsError = e as USPSError;
            return NextResponse.json(
                { error: uspsError.error, desc: uspsError.error_description }, 
                { status: 500 }
            );
        }
        
        // Handle other types of errors
        console.error("API error:", e);
        return NextResponse.json(
            { error: "An unknown error occurred", desc: String(e) }, 
            { status: 500 }
        );
    }
}