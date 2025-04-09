import { Shippo } from 'shippo';

export const shippo = new Shippo({
  apiKeyHeader: `ShippingToken ${process.env.SHIPPO_SECRET_KEY}`,
});
