import { shippo } from '@/lib/shippo/shippo';
import { ShippoAddress } from './types';

export async function createShippoAddress(address: ShippoAddress) {
  const result = await shippo.addresses.create(address);
  console.log(result);
  return result;
}
