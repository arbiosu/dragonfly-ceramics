import ContactForm from '@/components/contact-form';

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Contact() {
  return (
    <main className='overflow-x-hidden pt-20'>
      <ContactForm />
    </main>
  );
}
