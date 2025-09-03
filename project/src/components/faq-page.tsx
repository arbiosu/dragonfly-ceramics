import Image from 'next/image';
import { FAQHorizontalScroll } from './faqs';

const faqs = [
  {
    id: 1,
    question: 'What if my purchase is damaged or delayed?',
    answer:
      'All products are packaged with love and care and I ship them out ASAP with a tracking number. However, if your piece comes damaged, please email me photos within 3 days of arrival. I will try my best to replace the item with something similar or a full or partial refund can be given.',
  },
  {
    id: 2,
    question: 'Where do you ship?',
    answer: 'I currently ship worldwide to all locations!',
  },
  {
    id: 3,
    question: 'How do I take care of my Pottery?',
    answer:
      'All of my pieces are dishwasher and microwave safe! However, I always recommend handwashing. Pieces that are not dishwasher and microwave safe will be labeled in the description of the piece.',
  },
  {
    id: 4,
    question: 'Do you accept returns?',
    answer:
      'Please make your purchases carefully as all sales are final. I only accept returns if the wrong item was shipped to you.',
  },
  {
    id: 5,
    question: 'When do you restock?',
    answer:
      'I have no particular schedule for restocks. As long as you are following my socials and/or signed up for my newsletter, you will be alerted when a drop happens!',
  },
  {
    id: 6,
    question: 'How do I purchase a custom or wholesale order?',
    answer:
      'Please fill out the form under the “contact” page and allow up to 72 hours for me to respond!',
  },
];

export default function FAQPage() {
  return (
    <section className='relative w-full bg-df-yellow text-black'>
      <div className='absolute inset-0 z-10'>
        <Image
          src='/df-hero-dispenser.png'
          alt='Dragonfly Ceramics Bowl'
          width={600}
          height={400}
          className='absolute -mx-4 -mt-20 md:left-0 md:-mt-24'
        />
      </div>
      <div className='leading-0 left-0 top-0 w-full overflow-hidden'>
        <svg
          data-name='Layer 2'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='relative block h-[500px] w-[calc(133%+1.3px)]'
        >
          <path
            d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z'
            className='fill-white'
          ></path>
        </svg>
      </div>
      <h4 className='mx-8 text-right text-6xl tracking-[-0.04em] md:text-9xl'>
        frequently <br></br>asked {"q's"}
      </h4>
      <div className='relative z-20'>
        <FAQHorizontalScroll faqs={faqs} />
      </div>
    </section>
  );
}
