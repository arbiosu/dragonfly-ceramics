import ShopLink from '@/components/shop/shop-link';

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Canceled() {
  return (
    <section id='canceled' className='container mx-auto py-40'>
      <div className='grid justify-center gap-10 py-20'>
        <p className='text-center text-3xl text-df-text'>
          Something went wrong with your order and it has been canceled.
        </p>
        <ShopLink label={'Return to Shop'} />
      </div>
    </section>
  );
}
