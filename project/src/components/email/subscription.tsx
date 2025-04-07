import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  //Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
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
          },
        },
      }}
    >
      <Head />
      <Preview>Welcome to Dragonfly Ceramics!</Preview>
      <Body className='bg-white'>
        <Container className='bg-dfNew2'>
          <Section className='p-12'>
            <Text className='text-2xl text-df-text'>
              Welcome to Dragonfly Ceramics, {email}!
            </Text>
            <Hr />
            <Text className='text-xl text-df-text'>
              THANKS FOR SIGNING UP FOR THE NEWSLETTER. YOU WILL NOW RECEIVE
              UPDATES FOR DRAGONFLY CERAMICS.
            </Text>
            <Button
              className='mr-3 inline-flex w-full items-center justify-center rounded-lg bg-dfNew px-5 py-3 text-center text-white'
              href='https://dragonflyceramics.com/shop'
            >
              Shop Now
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
