"use server";

import uspsManager from "./manager";

export type Package = {
    weight: number;
    length: number;
    height: number;
    width: number;
    mailClass: string;
}

export async function fetchShippingOptions(destinationZIP: string, pkg: Package) {
    try {
        const token = await uspsManager.getToken();
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