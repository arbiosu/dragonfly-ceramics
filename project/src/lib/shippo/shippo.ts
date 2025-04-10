import { Shippo } from 'shippo';

export const shippo = new Shippo({
  apiKeyHeader: process.env.SHIPPO_SECRET_KEY,
});
