import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square, Star } from 'lucide-react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price: number, listingType: string) => {
    if (listingType === 'rent') {
      return `₹${price.toLocaleString()}/mo`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => toggleFavorite(property.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white text-neutral-600 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        {property.isFeatured && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-primary-900 text-white px-3 py-1 rounded-lg text-sm font-medium capitalize">
          For {property.listingType}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-neutral-900 line-clamp-1">
            {property.title}
          </h3>
          <span className="text-xl font-bold text-primary-900">
            {formatPrice(property.price, property.listingType)}
          </span>
        </div>

        <div className="flex items-center text-neutral-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location.city}, {property.location.state}</span>
        </div>

        <div className="flex items-center space-x-4 text-neutral-600 mb-3">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.squareFootage.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-neutral-900">{property.agent.name}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-neutral-600 ml-1">{property.agent.rating}</span>
              </div>
            </div>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="bg-primary-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}