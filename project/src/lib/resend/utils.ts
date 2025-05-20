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

export async function getSubscribers() {
  try {
    const contacts = resend.contacts.list({
      audienceId: 'e739b112-5ab4-40f4-95e3-7bc676fbc1d2',
    });
    return contacts;
  } catch (error) {
    if (error instanceof Error) return error.message;
    return 'Unknown Error';
  }
}
