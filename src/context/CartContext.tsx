// CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

import { Alert } from 'react-native';
import { useToast } from "react-native-toast-notifications";

import { CartItem, Product } from '../types';

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const toast = useToast();

  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product: Product, qty: number = 1) => {

    setCartCount(prev => prev + qty)

    setCart(prev => {
      const index = prev.findIndex(item => item.id === product.id);
      if (index >= 0) {
        // already in cart, increase quantity
        const updated = [...prev];
        updated[index].quantity += qty;
        return updated;
      } else {
        // new product
        return [...prev, { ...product, quantity: qty }];
      }
    });
  };

  const removeFromCart = (productId: string) => {

    const item = cart.find((item) => item.id === productId);

    if (!item) return;
  
    if (item.quantity > 1) {
      // Simply decrease quantity
      setCart((prev) =>
        prev.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      // Ask for confirmation before removing
      Alert.alert(
        'Remove Item',
        'Do you want to remove this product from your cart?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              setCart((prev) => prev.filter((i) => i.id !== productId));
              toast.show("Item has been removed successfully", {
                type: "danger",// "normal | success | warning | danger | custom",
                placement: "bottom",//"top | bottom",
                duration: 4000,
                animationType: "zoom-in",//"slide-in | zoom-in",
              });
            },
          },
        ]
      );
    }

    setCartCount(prev => prev - 1)

  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
