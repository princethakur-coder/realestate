export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse' | 'commercial';
  listingType: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  yearBuilt: number;
  features: string[];
  images: string[];
  agent: Agent;
  status: 'active' | 'pending' | 'sold' | 'rented';
  datePosted: string;
  isFeatured: boolean;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  company: string;
  rating: number;
  reviewCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'buyer' | 'agent' | 'admin';
  favorites: string[];
  phone?: string;
  company?: string;
  joinDate?: string;
  verified?: boolean;
  licenseNumber?: string;
}

export interface SearchFilters {
  location: string;
  priceMin: number;
  priceMax: number;
  propertyType: string;
  listingType: 'sale' | 'rent' | 'all';
  bedrooms: number;
  bathrooms: number;
  features: string[];
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'inquiry' | 'favorite' | 'price_change' | 'new_listing' | 'review';
  title: string;
  message: string;
  date: string;
  read: boolean;
  propertyId?: string;
}