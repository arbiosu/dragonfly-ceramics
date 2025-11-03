export type MassUnits = 'g' | 'kg' | 'lb' | 'oz';
export type DistanceUnits = 'cm' | 'in' | 'ft' | 'm' | 'mm' | 'yd';

export type ShippoAddress = {
  name: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isResidential: boolean;
  validate: boolean;
};

export type ShippoParcel = {
  massUnit: MassUnits;
  weight: string;
  distanceUnit: DistanceUnits;
  height: string;
  length: string;
  width: string;
};

/**
 * @address_from Shippo Address id of the recipient address
 * @address_to Shippo Address id of the sending address
 * @carrierAccounts filter rates by carrier id
 */
export type ShippoShipment = {
  addressFrom: string;
  addressTo: string;
  parcels: string[];
  extra: {
    insurance: {
      amount: string;
      currency: string;
      content: string;
    };
  };
};
