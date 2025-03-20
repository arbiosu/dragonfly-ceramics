"use server";

import uspsManager from "./manager";
import { CartItem } from "../stripe/utils";


export type Box = {
    weight: number;
    length: number;
    height: number;
    width: number;
    mailClass: string;
}

// USPS Flat Rate
const smallFlatRateBox = {
    length: 8.625,
    width: 5.375,
    height: 1.625,
    size: "small"
};
const mediumFlatRateBox = {
    length: 11,
    width: 8.5,
    height: 5.5,
    size: "medium",
};
const largeFlatRateBox = {
    length: 12.25,
    width: 12,
    height: 6,
    size: "large",
};


const boxSizes = [smallFlatRateBox, mediumFlatRateBox, largeFlatRateBox]

export async function determineBoxSize(cartItems: CartItem[]): Promise<Box> {
    let totalVolume = 0;
    let totalWeight = 0;
    const lengths = [];
    const widths = [];
    const heights = [];

    for (const item of cartItems) {
        totalVolume += 
        Number(item.product.metadata.length)*
        Number(item.product.metadata.width)*
        Number(item.product.metadata.height)*
        item.quantity;

        totalWeight += Number(item.product.metadata.weight) * item.quantity;

        lengths.push(Number(item.product.metadata.length));
        widths.push(Number(item.product.metadata.width));
        heights.push(Number(item.product.metadata.height));
    }

    // cannot ship, contact for wholesale
    if (totalWeight >= 70) {
        return {
            weight: totalWeight,
            length: 0,
            height: 0,
            width: 0,
            mailClass: "NONE",
        }
    }
    // add padding to volume
    totalVolume *= 1.1;
    for (const box of boxSizes) {
        const boxVolume = box.length*box.width*box.height
        if (totalVolume <= boxVolume) {
            return {
                weight: totalWeight,
                length: box.length,
                width: box.width,
                height: box.height,
                mailClass: "ALL"
            };
        }
    }
    // if no box fits, use max of all dimensions for shipping
    const maxLength = Math.max(...lengths);
    const maxWidth = Math.max(...widths);
    const maxHeight = Math.max(...heights);
    return {
        weight: totalWeight,
        length: maxLength,
        width: maxWidth,
        height: maxHeight,
        mailClass: "USPS_GROUND_ADVANTAGE",
    };
};

export async function fetchShippingOptions(
    destinationZIP: string,
    box: Box
){
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
            packageDescription: box
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
};
