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
          <Section className='mb-8'>
            <Text className='m-0 text-left text-3xl font-light tracking-[-0.04em] text-black'>
              you’re in.
            </Text>
            <Img
              src='https://trdshamrxoipypgbujnx.supabase.co/storage/v1/object/public/content/emails/email.png'
              alt='pottery'
              width='300'
              height='300'
              className='mx-auto mb-6 text-left'
            />
            <Button
              className='inline-flex items-center justify-center rounded-3xl border border-black bg-white p-4 text-2xl tracking-[-0.04em] text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              href='https://dragonflyceramics.com/shop'
            >
              shop
            </Button>
            <Img
              src='https://trdshamrxoipypgbujnx.supabase.co/storage/v1/object/public/content/emails/dc.png'
              alt='Logo'
              width='600'
              height='100'
              className='mx-auto mb-6'
            />
          </Section>

          <Container>
            <Button
              className='inline-flex items-center justify-center rounded-3xl border border-black bg-white text-sm tracking-[-0.04em] text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
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
