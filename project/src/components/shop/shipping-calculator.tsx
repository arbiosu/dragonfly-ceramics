"use client";

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Box, determineBoxSize } from '@/lib/usps/utils';
import type { ShippingRateObject } from '@/lib/stripe/utils';


export default function ShippingRateCalculator() {
    const [zipCode, setZipCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { cartItems } = useCart();

      // Basic ZIP code validation
    const isValidZipCode = (zip: string) => {
        return /^\d{5}(-\d{4})?$/.test(zip);
    };

    const proceedToCheckout = async (shippingRates: ShippingRateObject[]) => {
        try {
          const res = await fetch("/shop/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cartItems: cartItems,
                shippingOptions: shippingRates
              }),
          });

          if (!res.ok) {
              throw new Error(`Failed to create checkout session: ${res.status}`);
          }

          const data = await res.json();
          window.location.href = data.url;
      } catch (error) {
          console.error("Checkout Error:", error);
      }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (!isValidZipCode(zipCode)) {
            setError('Please enter a valid 5-digit ZIP Code');
            return;
        }

        setIsLoading(true);
        const box: Box = await determineBoxSize(cartItems);

        try {
            const response = await fetch('/shop/api/shipping', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ destinationZip: zipCode, box: box })
            })

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API Error: ${response.status} - ${errorText}`);
                throw new Error(`Failed to make request to USPS API`);
            }

            const { rates } = await response.json();
            await proceedToCheckout(rates);

        } catch (error) {
            setError('Failed to fetch shipping rates. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <div>
        <h3 className="text-lg mb-2 text-df-text">Shipping</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="zipCode" className="block text-lg text-df-text mb-1">
              zipcode*
            </label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full text-df-text bg-df-bg px-3 py-2 border-b-2 border-df-text focus:outline-none focus:ring-indigo-500"
              placeholder="*to calculate shipping"
              maxLength={10}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-dfNew2 text-df-text hover:bg-dfNew hover:text-white py-2 px-4 rounded-md text-xl transition-colors duration-200"
          >
            {isLoading ? "Calculating..." : "Checkout"}
          </button>
          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </form>
      </div>
    );
};