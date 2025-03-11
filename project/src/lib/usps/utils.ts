"use server";

import TokenManager from "./manager";

type Package = {
    weight: number;
    length: number;
    height: number;
    width: number;
    mailClass: string;
}

const manager = new TokenManager(
    process.env.USPS_CLIENT_ID!,
    process.env.USPS_CLIENT_SECRET!,
    `${process.env.USPS_URL!}/oauth2/v3`,
    ["shipments"]
)

export async function fetchShippingOptions(destinationZIP: string, pkg: Package) {
    try {
        const token = await manager.getToken();
        const domesticPricingOptions = {
            pricingOptions: [
                {
                    "priceType": "RETAIL",
                }
            ],
            originZIPCode: "11211",
            destinationZIPCode: destinationZIP,
            destinationEntryFacilityType: "NONE",
            packageDescription: pkg,
        }

        const res = await fetch(`${process.env.USPS_URL!}/shipments/v3/options/search`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(domesticPricingOptions)
        });
        
        if (!res.ok) {
            throw new Error(`USPS API request failed`)
        }
        return await res.json();
    } catch (error) {
        throw error;
    }
}