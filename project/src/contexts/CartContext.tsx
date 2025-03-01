"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/lib/stripe"
import { Stripe } from "stripe";


interface Props {
    children: React.ReactNode;
}

interface CartContextValue {
    cartItems: CartItem[];
    addToCart: (product: Stripe.Product) => void;
    removeFromCart: (productId: string) => void;
    cartTotal: number;
    cartCount: number;
}


// Default context
const CartContext = createContext<CartContextValue>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    cartTotal: 0,
    cartCount: 0,
  });


// Create a provider component that wraps the children components
export const CartProvider = ({ children }: Props) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const localCart = localStorage.getItem('cartItems');
            return localCart ? JSON.parse(localCart) : [];
        }
        return [];
    });

    // Whenever cartItems changes, sync to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);
    

    const addToCart = (product: Stripe.Product) => {
        // check if the product is in the cart
        const existingCartItemIndex = cartItems.findIndex(
            (item) => item.product.id === product.id
        );

        if (existingCartItemIndex !== -1) {
            const existingCartItem = cartItems[existingCartItemIndex];
            const updatedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex] = updatedCartItem;
            setCartItems(updatedCartItems);
        }
        else {
            setCartItems([...cartItems, { product, quantity: 1}]);
        }
    };
    // TODO: add logic for decrementing quantity by 1
    const removeFromCart = (productId: string) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.product.id !== productId
        );
        setCartItems(updatedCartItems);
    };

    const cartTotalInCents = cartItems.reduce((total, item) => {
        const price = item.product.default_price
        if (price && typeof price !== 'string' && 'unit_amount' in price) {
            return total + (price.unit_amount || 0) * item.quantity;
        }
        return total;
    }, 0);

    const cartTotal = cartTotalInCents / 100;
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    if (CartContext === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return useContext(CartContext)
}

