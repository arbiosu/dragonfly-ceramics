import { resend } from './resend';

export async function sendShippingLabelEmail(
  labelUrl: string,
  trackingNumber: string,
  checkoutSessionId: string
) {
  return await resend.emails.send({
    from: 'Dragonfly Shop: New Shipping Label <noreply@updates.dragonflyceramics.com>',
    to: 'dragonflyceramics.kelly@gmail.com',
    subject: 'New Shipping Label Purchased',
    html: `<p>Hey Kelly,</p><br></br><p>Label URL: ${labelUrl}</p><br></br><p>Tracking Number: ${trackingNumber}</p><br></br><p>Stripe Checkout Session Id: ${checkoutSessionId}</p>`,
  });
}
