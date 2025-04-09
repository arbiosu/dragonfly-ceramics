export type ShippoAddress = {
  name: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  street3: string;
  city: string;
  state: string;
  zip: string;
  country: "US";
  is_residential: boolean;
  validate: true;
}

export type ShippoParcel = {
  mass_unit: "lb";
  weight: string;
  distance_unit: "in";
  height: string;
  length: string;
  width: string;
}

/**
 * @address_from Shippo Address id of the recipient address
 * @field address_to: Shippo Address id of the sending address
 */
export type ShippoShipment = {
  address_from: string;
  address_to: string;
  parcels: ShippoParcel[];
}