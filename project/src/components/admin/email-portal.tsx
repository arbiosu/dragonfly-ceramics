import { getSubscribers } from '@/lib/resend/utils';
import ContactCard from './contact-card';

export default async function EmailPortal() {
  const subscribers = await getSubscribers();
  if (typeof subscribers === 'string') {
    return (
      <h1 className='text-3xl text-df-text'>
        There has been an error with the email portal.
      </h1>
    );
  }
  const numberOfSubscribers = subscribers.data?.data.length;
  return (
    <section className='container mx-auto py-20 text-df-text'>
      <h1 className='mb-4 text-center text-2xl'>Email Portal</h1>
      <h2 className='text-center text-lg'>
        Current Subscribers: {numberOfSubscribers}
      </h2>
      <div>
        {subscribers.data?.data.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
      </div>
    </section>
  );
}
