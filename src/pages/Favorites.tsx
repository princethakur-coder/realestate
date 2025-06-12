import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/UI/PropertyCard';

export default function Favorites() {
  const { properties } = useApp();
  const { currentUser } = useAuth();

  const favoriteProperties = properties.filter(property => 
    currentUser?.favorites.includes(property.id)
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            My Favorites
          </h1>
          <p className="text-neutral-600">
            Properties you've saved for later viewing
          </p>
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-soft p-8 max-w-md mx-auto">
              <Heart className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                No favorites yet
              </h3>
              <p className="text-neutral-600 mb-6">
                Start browsing properties and save your favorites by clicking the heart icon.
              </p>
              <Link
                to="/properties"
                className="bg-primary-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors inline-block"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-neutral-600">
                {favoriteProperties.length} favorite{favoriteProperties.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}