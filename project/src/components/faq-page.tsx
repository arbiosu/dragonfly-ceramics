import Image from 'next/image';
import { FAQHorizontalScroll } from './faqs';

const faqs = [
  {
    id: 1,
    question: 'Where do you ship?',
    answer:
      "I currently ship worldwide to all locations! Once you've picked out your items, click on “checkout” and there will be an option to fill out an international shipping form!",
  },
  {
    id: 2,
    question: 'How do I take care of my Pottery?',
    answer:
      'All of my pieces are dishwasher and microwave safe! However, I always recommend handwashing. Pieces that are not dishwasher and microwave safe will be labeled in the description of the piece.',
  },
  {
    id: 3,
    question: 'what are seconds?',
    answer:
      'a second is a product that has minor imperfections or flaws but still perfectly usable and safe to eat or drink out of.',
  },

  {
    id: 4,
    question: 'When do you restock?',
    answer:
      'I have no particular schedule for restocks. As long as you are following my socials and/or signed up for my newsletter, you will be alerted when a drop happens!',
  },
  {
    id: 5,
    question: 'How do I purchase a custom or wholesale order?',
    answer:
      "please fill out the form under the contact page and i'll get back to you as soon as i can!",
  },
  {
    id: 6,
    question: 'Do you accept returns?',
    answer:
      'Please make your purchases carefully as all sales are final. I only accept returns if the wrong item was shipped to you.',
  },
  {
    id: 7,
    question: 'What if my purchase is damaged or delayed?',
    answer:
      'All products are packaged with love and care and I ship them out ASAP with a tracking number. However, if your piece comes damaged, please email me photos within 3 days of arrival. I will try my best to replace the item with something similar or a full or partial refund can be given.',
  },
];

export default function FAQPage() {
  return (
    <section className='relative min-h-screen w-full overflow-x-hidden bg-df-yellow text-black'>
      <div className='absolute inset-0 z-10 -mx-20 -mt-20 md:-mx-32'>
        <Image
          src='/oil-dispenser.png'
          alt='Dragonfly Ceramics Bowl'
          width={500}
          height={500}
          className='absolute left-0 top-0 h-auto w-[300px] md:w-[400px] lg:w-[500px]'
        />
      </div>
      <div className='py-40 md:py-52'></div>
      <div className='absolute left-0 top-0 w-full overflow-hidden leading-[0]'>
        <svg
          data-name='Layer 2'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='relative block h-[900px] w-[calc(137%+1.3px)]'
        >
          <path
            d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z'
            className='fill-white'
          ></path>
        </svg>
      </div>
      <h4 className='relative z-10 mx-8 text-right text-6xl tracking-[-0.04em] md:text-8xl lg:text-9xl'>
        frequently <br></br>asked {"q's"}
      </h4>
      <div className='relative z-20'>
        <FAQHorizontalScroll faqs={faqs} />
      </div>
    </section>
  );
}
