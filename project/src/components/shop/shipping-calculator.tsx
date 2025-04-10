import { useState, useRef } from 'react';
import { validateEmail } from '@/lib/utils';
import { useCart } from "@/contexts/CartContext";


const inputTextClass =
  'bg w-full border-b border-dfNew bg-df-bg px-4 py-2 text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'mb-1 block text-lg font-medium text-gray-700';


export function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const firstNameRef = useRef<string>('');
  const lastNameRef = useRef<string>('');
  const emailRef = useRef<string>('');
  const phoneNumberRef = useRef<string>('');
  const street1Ref = useRef<string>('');
  const street2Ref = useRef<string>('');
  const cityRef = useRef<string>('');
  const stateRef = useRef<string>('');
  const zipRef = useRef<string>('');
  const countryRef = useRef<string>('US');

  const { cartItems } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name: firstNameRef.current + ' ' + lastNameRef.current,
      email: emailRef.current,
      phone: phoneNumberRef.current,
      street1: street1Ref.current,
      street2: street2Ref.current,
      city: cityRef.current,
      state: stateRef.current,
      zip: zipRef.current,
      country: countryRef.current,
      isResidential: true,
      validate: true,
    };

    if (!validateEmail(formData.email)) {
      setError('Invalid email address. Please try again.');
      return;
    }

    try {
      const res = await fetch('/shop/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: formData, cartItems: cartItems }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          setError('Too many attempts. You have been locked out TODO FIX.');
        }
        throw new Error('Failed to calculate shipping TODO FIX');
      }

      const data = await res.json();
      if (!data.valid) {
        setError('Your address could not be validated. Please try again.');
        return;
      }
      console.log(data)

    } catch (error) {
      console.log(error);
      setError('Failed to calculate shipping. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='max-auto text-df-text'>
      <h1 className='text-3xl'>shipping</h1>
      <div className='container mx-auto'>
        <form onSubmit={handleSubmit} className='grid grid-cols-2'>
          <label htmlFor='firstName' className={labelClass}>
            first name
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            defaultValue=''
            onChange={(e) => (firstNameRef.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
            required
          />

          <label htmlFor='lastName' className={labelClass}>
            last name
          </label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            defaultValue=''
            onChange={(e) => (lastNameRef.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
            required
          />

          <label htmlFor='email' className={labelClass}>
            email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            defaultValue=''
            onChange={(e) => (emailRef.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
            required
          />

          <label htmlFor='phoneNumber' className={labelClass}>
            phone number
          </label>
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            defaultValue=''
            onChange={(e) => (phoneNumberRef.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
          />

          <label htmlFor='street1' className={labelClass}>
            street address line 1
          </label>
          <input
            type='text'
            id='street1'
            name='street1'
            defaultValue=''
            onChange={(e) => (street1Ref.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
            required
          />

          <label htmlFor='street2' className={labelClass}>
            street address line 2
          </label>
          <input
            type='text'
            id='street2'
            name='street2'
            defaultValue=''
            onChange={(e) => (street2Ref.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
          />

          <label htmlFor='city' className={labelClass}>
            city
          </label>
          <input
            type='text'
            id='city'
            name='city'
            defaultValue=''
            onChange={(e) => (cityRef.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
            required
          />

          <label htmlFor='state' className={labelClass}>
            state
          </label>
          <input
            type='text'
            id='state'
            name='state'
            defaultValue=''
            onChange={(e) => (stateRef.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
            required
          />

          <label htmlFor='zip' className={labelClass}>
            zip code
          </label>
          <input
            type='text'
            id='zip'
            name='zip'
            defaultValue=''
            onChange={(e) => (zipRef.current = e.target.value)}
            disabled={isLoading}
            className={inputTextClass}
            required
          />

          <label htmlFor='country' className={labelClass}>
            country
          </label>
          <input
            type='text'
            id='country'
            name='country'
            defaultValue='US'
            disabled={true}
            className={inputTextClass}
            required
          />
          {error && <p className='mt-2 text-red-600'>{error}</p>}
          <button type='submit'>Calculate Shipping Rates</button>
        </form>
      </div>
    </div>
  );
}
