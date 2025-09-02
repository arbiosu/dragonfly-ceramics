import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface SubscriptionEmailProps {
  email: string;
}

export const SubscriptionEmail: React.FC<Readonly<SubscriptionEmailProps>> = ({
  email,
}) => (
  <Html>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              'df-text': '#33311d',
              'df-bg': '#eee4d1',
              dfNew: '#2b2340',
              dfNew2: '#dfd1ee',
            },
            fontFamily: {
              manrope: ['Manrope', 'sans-serif'],
            },
          },
        },
      }}
    >
      <Head />
      <Preview>Welcome to Dragonfly Ceramics!</Preview>
      <Body className='font-manrope bg-white'>
        <Container className='mx-auto max-w-md rounded-xl bg-white p-10 text-center shadow'>
          <Text className='m-0 text-3xl font-light text-black'>you’re in</Text>
          <Section>
            <Img
              src='https://trdshamrxoipypgbujnx.supabase.co/storage/v1/object/public/content/emails/Studio%20Session-030.jpeg'
              alt='Logo'
              width='200'
              height='200'
              className='mx-auto mb-6'
            />
            <Img
              src='https://trdshamrxoipypgbujnx.supabase.co/storage/v1/object/public/content/emails/hand-made-in-nyc.png'
              alt='Logo'
              width='400'
              height='80'
              className='mx-auto mb-6'
            />
          </Section>
          <Button
            className='inline-flex items-center justify-center rounded-3xl border-2 border-black bg-white text-xl tracking-[-0.069em] text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            href='https://dragonflyceramics.com/shop'
          >
            shop
          </Button>
          <Container>
            <Button
              className='inline-flex items-center justify-center rounded-3xl border-2 border-black bg-white text-xl tracking-[-0.069em] text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              href={`https://dragonflyceramics.com/shop/unsubscribe?email=${email}`}
            >
              unsubscribe
            </Button>
          </Container>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
