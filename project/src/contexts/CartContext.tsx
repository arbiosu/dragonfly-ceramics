// Source: https://github.com/KMS74/Next.js-Shopping-Cart-App
// Thank you to github.com/KMS74!

"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "@/lib/stripe/utils"


interface Props {
    children: React.ReactNode;
}

interface CartContextValue {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateCartItemQuantity: (productId: string, quantity: number) => void;
    purgeCart: () => void;
    cartTotal: number;
    cartCount: number;
}


// Default context
const CartContext = createContext<CartContextValue>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateCartItemQuantity: () => {},
    purgeCart: () => {},
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
    

    const addToCart = (product: Product, quantity: number = 1) => {
        // check if the product is in the cart
        const existingCartItemIndex = cartItems.findIndex(
            (item) => item.product.id === product.id
        );

        const availableInventory = Number(product.metadata.inventory);


        if (existingCartItemIndex !== -1) {
            const existingCartItem = cartItems[existingCartItemIndex];
            const totalRequestedQuantity = existingCartItem.quantity + quantity;

            if (totalRequestedQuantity > availableInventory) {
                return;
            }

            const updatedCartItem = {
                ...existingCartItem,
                quantity: totalRequestedQuantity,
            };
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex] = updatedCartItem;
            setCartItems(updatedCartItems);
        }
        else {
            if (quantity > availableInventory) {
                return;
            }
            setCartItems([...cartItems, { product, quantity: quantity}]);
        }
    };

    const removeFromCart = (productId: string) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.product.id !== productId
        );
        setCartItems(updatedCartItems);
    };

    const updateCartItemQuantity = (productId: string, quantity: number) => {
        const existingCartItemIndex = cartItems.findIndex(
          (item) => item.product.id === productId
        );
        if (existingCartItemIndex !== -1) {
          const existingCartItem = cartItems[existingCartItemIndex];
          const availableInventory = Number(existingCartItem.product.metadata.inventory);

          const adjustedQuantity = Math.min(quantity, availableInventory);
          
          const updatedCartItem = {
            ...existingCartItem,
            quantity: adjustedQuantity,
          };
          const updatedCartItems = [...cartItems];
          updatedCartItems[existingCartItemIndex] = updatedCartItem;
          setCartItems(updatedCartItems);
        }
      };

    const purgeCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const addUpCartTotal = cartItems.reduce((total, item) => {
        const price = item.product.price
        return total + Number(price) * item.quantity;
    }, 0);

    const cartTotal = addUpCartTotal;
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                purgeCart,
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
        throw new Error('useCart must be used within a CartProvider');
    }
    return useContext(CartContext);
};

