import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, SearchFilters } from '../types';
import { mockProperties } from '../data/mockData';
import { useAuth } from './AuthContext';

interface AppContextType {
  properties: Property[];
  filteredProperties: Property[];
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    priceMin: 0,
    priceMax: 10000000,
    propertyType: '',
    listingType: 'all',
    bedrooms: 0,
    bathrooms: 0,
    features: []
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  // Sync favorites with current user
  useEffect(() => {
    if (currentUser) {
      setFavorites(currentUser.favorites || []);
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  const toggleFavorite = (propertyId: string) => {
    if (!currentUser) return;

    setFavorites(prev => {
      const newFavorites = prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      
      // Update user favorites in localStorage
      const updatedUser = { ...currentUser, favorites: newFavorites };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      return newFavorites;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const filtered = properties.filter(property => {
      if (searchFilters.location && !property.location.city.toLowerCase().includes(searchFilters.location.toLowerCase())) {
        return false;
      }
      if (property.price < searchFilters.priceMin || property.price > searchFilters.priceMax) {
        return false;
      }
      if (searchFilters.propertyType && property.propertyType !== searchFilters.propertyType) {
        return false;
      }
      if (searchFilters.listingType !== 'all' && property.listingType !== searchFilters.listingType) {
        return false;
      }
      if (searchFilters.bedrooms > 0 && property.bedrooms < searchFilters.bedrooms) {
        return false;
      }
      if (searchFilters.bathrooms > 0 && property.bathrooms < searchFilters.bathrooms) {
        return false;
      }
      return true;
    });
    
    setTimeout(() => {
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchFilters, properties]);

  return (
    <AppContext.Provider value={{
      properties,
      filteredProperties,
      searchFilters,
      setSearchFilters,
      favorites,
      toggleFavorite,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}