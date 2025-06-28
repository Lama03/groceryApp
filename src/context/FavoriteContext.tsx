// context/FavoriteContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface FavoriteContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToFavorites = (product: Product) => {
    if (!favorites.find(p => p.id === product.id)) {
      setFavorites(prev => [...prev, product]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(p => p.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error('useFavorites must be used within a FavoriteProvider');
  return context;
};
