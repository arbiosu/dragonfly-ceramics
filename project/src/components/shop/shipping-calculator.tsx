'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { validateEmail } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const inputTextClass =
  'w-full border-b border-dfNew bg-df-bg px-4 py-2 text-df-text focus:border-transparent focus:outline-none focus:ring-1 focus:ring-dfNew';
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
          setError('Too many attempts. You have been locked out for 1 hour.');
        }
        throw new Error('Failed to calculate shipping TODO FIX');
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      setError('Failed to calculate shipping. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='text-df-text'>
      <h1 className='text-3xl text-center'>please enter your shipping address</h1>
      <h3 className='text-lg text-center'>the asterisk* indicates a required field</h3>
      <div className='container mx-auto'>
        <form onSubmit={handleSubmit} className='mx-auto w-full max-w-4xl'>
          <div className='grid grid-cols-1 gap-2'>
            <div className='space-y-4'>
              <div>
                <label htmlFor='firstName' className={labelClass}>
                  first name*
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
              </div>
              <div>
                <label htmlFor='lastName' className={labelClass}>
                  last name*
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
              </div>

              <div>
                <label htmlFor='email' className={labelClass}>
                  email*
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
              </div>

              <div>
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
              </div>

              <div>
                <label htmlFor='street1' className={labelClass}>
                  street address line 1*
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
              </div>

              <div>
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

              <div>
                <label htmlFor='city' className={labelClass}>
                  city*
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
              </div>

              <div>
                <label htmlFor='state' className={labelClass}>
                  state*
                </label>
                <select
                  id='state'
                  name='state'
                  defaultValue=''
                  onChange={(e) => (stateRef.current = e.target.value)}
                  disabled={isLoading}
                  required
                  className={inputTextClass}
                >
                <option value='' disabled>
                select an option
                </option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>

              <div>
                <label htmlFor='zip' className={labelClass}>
                  zip code*
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
              </div>

              <div>
                <label htmlFor='country' className={labelClass}>
                  country*
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
              </div>
              </div>
            </div>
          </div>

          {error && <p className='mt-4 text-red-600'>{error}</p>}

          <button
            type='submit'
            className='mt-6 w-full rounded-md bg-dfNew2 px-4 py-2 text-xl text-df-text transition-colors duration-200 hover:bg-dfNew hover:text-white'
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : 'proceed to checkout'}
          </button>
        </form>
      </div>
    </div>
  );
}
