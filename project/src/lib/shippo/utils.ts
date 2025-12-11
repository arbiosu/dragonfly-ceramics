import { shippo } from '@/lib/shippo/shippo';
import { ShippoAddress, ShippoParcel, ShippoShipment } from './types';
import { CarriersEnum } from 'shippo';

export async function createShippoAddress(address: ShippoAddress) {
  const result = await shippo.addresses.create(address);
  return result;
}

export async function createShippoParcel(parcel: ShippoParcel) {
  const result = await shippo.parcels.create(parcel);
  return result;
}

export async function createShippoShipment(shipment: ShippoShipment) {
  const result = await shippo.shipments.create(shipment);
  return result;
}

export async function getCarrierAccounts() {
  const ups = shippo.carrierAccounts.list({ carrier: CarriersEnum.Ups });
  return ups;
}

export async function createShippingLabel(rateId: string) {
  return await shippo.transactions.create({
    rate: rateId,
    labelFileType: 'PDF_4x6',
  });
}
