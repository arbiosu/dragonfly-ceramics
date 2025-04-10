import { createShippoAddress, createShippoParcel, createShippoShipment } from '@/lib/shippo/utils';
import { type MassUnits, type ShippoAddress, type DistanceUnits } from '@/lib/shippo/types';
import { type CartItem } from '@/lib/stripe/utils';
import { NextResponse } from 'next/server';

const mass: MassUnits = "lb"
const dist: DistanceUnits = "in"

export async function POST(req: Request) {
  try {
    const { address, cartItems } = (await req.json()) as { address: ShippoAddress, cartItems: CartItem[] };
    const lookup = await createShippoAddress(address);
    if (!lookup.validationResults?.isValid) {
      throw new Error('Invalid address');
    }

    const pkgs: string[] = [];
    const parcelPromises = cartItems.map(async (item) => {
      const parcel = {
        massUnit: mass,
        weight: item.product.metadata.weight,
        distanceUnit: dist,
        height: item.product.metadata.height,
        length: item.product.metadata.length,
        width: item.product.metadata.width,
      }
      const result = await createShippoParcel(parcel);
      if (result.objectId && result.objectState === "VALID") {
        pkgs.push(result.objectId);
      }
    });
    const parcels = await Promise.all(parcelPromises);

    console.log("Parcel ids", pkgs)

    const shipment = await createShippoShipment({
      addressFrom: 'b86852b1c9de48a49f272563318ca4dd',
      addressTo: lookup.objectId!,
      parcels: pkgs
    })
    console.log(shipment)
    
    return NextResponse.json(
      { valid: lookup.validationResults?.isValid, parcels: parcels, shipment: shipment },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
