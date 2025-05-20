'use client';

interface Contact {
  created_at: string;
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  unsubscribed: boolean;
}

export default function ContactCard({ contact }: { contact: Contact }) {
  const isSubscribed = !contact.unsubscribed;
  const joined = new Date(contact.created_at).toLocaleDateString();

  return (
    <div className='max-w-sm p-2 text-lg'>
      <p className='font-bold'>EMAIL: {contact.email}</p>
      <p>Subscribed on: {joined}</p>
      <p>Currently Subscribed?: {isSubscribed}</p>
    </div>
  );
}
