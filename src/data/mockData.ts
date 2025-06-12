import { Property, Agent } from '../types';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Prince Thakur',
    email: 'prince@estatehub.com',
    phone: '(978) 123-4567',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    company: 'Premier Realty Group',
    rating: 4.9,
    reviewCount: 127
  },
  {
    id: '2',
    name: 'Rahul Gill',
    email: 'rahul@estatehub.com',
    phone: '(798) 234-5678',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    company: 'Urban Properties',
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Sumit Sharma',
    email: 'sumit@estatehub.com',
    phone: '(947) 345-6789',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    company: 'Coastal Real Estate',
    rating: 4.7,
    reviewCount: 156
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Penthouse',
    description: 'Stunning penthouse with panoramic city views, featuring floor-to-ceiling windows, premium finishes, and a private rooftop terrace.',
    price: 2850000,
    location: {
      address: '#123 Sec-7',
      city: 'Chandigarh',
      state: 'Chandigarh',
      zipCode: '160105',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    propertyType: 'apartment',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 2400,
    yearBuilt: 2020,
    features: ['City View', 'Rooftop Terrace', 'Parking', 'Gym', 'Concierge'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[0],
    status: 'active',
    datePosted: '2024-01-15',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Charming Victorian Home',
    description: 'Beautiful restored Victorian home with original hardwood floors, modern kitchen, and private garden in a quiet neighborhood.',
    price: 1250000,
    location: {
      address: '#456 sec-54',
      city: ' Mohali',
      state: 'Chandigarh',
      zipCode: '160201',
      coordinates: { lat: 45.5152, lng: -122.6784 }
    },
    propertyType: 'house',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 2,
    squareFootage: 2800,
    yearBuilt: 1895,
    features: ['Hardwood Floors', 'Garden', 'Fireplace', 'Updated Kitchen'],
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[1],
    status: 'active',
    datePosted: '2024-01-12',
    isFeatured: false
  },
  {
    id: '3',
    title: 'Contemporary Downtown Condo',
    description: 'Sleek contemporary condo in the heart of downtown with premium amenities and walking distance to everything.',
    price: 4500,
    location: {
      address: '789 Urban Plaza',
      city: 'Ludhiana',
      state: 'Punjab',
      zipCode: '98101',
      coordinates: { lat: 47.6062, lng: -122.3321 }
    },
    propertyType: 'condo',
    listingType: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1400,
    yearBuilt: 2018,
    features: ['Pool', 'Gym', 'Parking', 'Balcony', 'In-unit Laundry'],
    images: [
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[2],
    status: 'active',
    datePosted: '2024-01-10',
    isFeatured: true
  },
  {
    id: '4',
    title: 'Spacious Family Home',
    description: 'Perfect family home with large backyard, updated kitchen, and great school district. Move-in ready!',
    price: 875000,
    location: {
      address: '321 Maple Avenue',
      city: 'Amritsar',
      state: 'Punjab',
      zipCode: '78701',
      coordinates: { lat: 30.2672, lng: -97.7431 }
    },
    propertyType: 'house',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 3200,
    yearBuilt: 2010,
    features: ['Large Backyard', 'Updated Kitchen', 'Great Schools', 'Garage'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[0],
    status: 'active',
    datePosted: '2024-01-08',
    isFeatured: false
  }
];