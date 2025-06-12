import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SearchFilters } from '../../types';

interface SearchBarProps {
  showAdvanced?: boolean;
  onSearch?: () => void;
}

export default function SearchBar({ showAdvanced = false, onSearch }: SearchBarProps) {
  const { searchFilters, setSearchFilters } = useApp();
  const [localFilters, setLocalFilters] = useState(searchFilters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters(localFilters);
    onSearch?.();
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="City, State"
              value={localFilters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Property Type */}
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <select
              value={localFilters.propertyType}
              onChange={(e) => updateFilter('propertyType', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          {/* Listing Type */}
          <div>
            <select
              value={localFilters.listingType}
              onChange={(e) => updateFilter('listingType', e.target.value as 'sale' | 'rent' | 'all')}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Buy & Rent</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-neutral-200">
            {/* Price Range */}
            <div className="md:col-span-2 grid grid-cols-2 gap-2">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <input
                  type="number"
                  placeholder="Min Price"
                  value={localFilters.priceMin || ''}
                  onChange={(e) => updateFilter('priceMin', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={localFilters.priceMax === 10000000 ? '' : localFilters.priceMax}
                  onChange={(e) => updateFilter('priceMax', parseInt(e.target.value) || 10000000)}
                  className="w-full pl-8 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <select
                value={localFilters.bedrooms}
                onChange={(e) => updateFilter('bedrooms', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={0}>Any Bedrooms</option>
                <option value={1}>1+ Bedrooms</option>
                <option value={2}>2+ Bedrooms</option>
                <option value={3}>3+ Bedrooms</option>
                <option value={4}>4+ Bedrooms</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <select
                value={localFilters.bathrooms}
                onChange={(e) => updateFilter('bathrooms', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={0}>Any Bathrooms</option>
                <option value={1}>1+ Bathrooms</option>
                <option value={2}>2+ Bathrooms</option>
                <option value={3}>3+ Bathrooms</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}