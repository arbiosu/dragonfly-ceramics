"use client";

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import type { Package } from '@/lib/usps/utils';


export default function ShippingRateCalculator() {
    const [zipCode, setZipCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { cartItems } = useCart();

      // Basic ZIP code validation
    const isValidZipCode = (zip: string) => {
        return /^\d{5}(-\d{4})?$/.test(zip);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (!isValidZipCode(zipCode)) {
            setError('Please enter a valid 5-digit ZIP Code');
            return;
        }

        setIsLoading(true);
        const p: Package = {
            // TODO: Fix?
            weight: Number(cartItems[0].product.metadata.weight),
            length: Number(cartItems[0].product.metadata.length),
            height: Number(cartItems[0].product.metadata.height),
            width: Number(cartItems[0].product.metadata.width),
            mailClass: "ALL",
        }
        // TODO: handle multiple items in cart
        try {
            const response = await fetch('/shop/api/shipping', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ destinationZip: zipCode, pkg: p })
            })

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API Error: ${response.status} - ${errorText}`);
                throw new Error(`Failed to make request to USPS API`);
            }
            return response.json();
        } catch (error) {
            setError('Failed to fetch shipping rates. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Shipping Rate Calculator</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Destination ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter ZIP code (e.g., 10001)"
              maxLength={10}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Calculating...' : 'Calculate Shipping Rates'}
          </button>
          
          {error && (
            <div className="mt-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </form>
        </div>
    )
}