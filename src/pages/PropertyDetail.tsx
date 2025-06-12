import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, 
  Calendar, Star, Phone, Mail, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyDetail() {
  const { id } = useParams();
  const { properties, favorites, toggleFavorite } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Property not found</h2>
          <Link to="/properties" className="text-primary-900 hover:underline">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price: number, listingType: string) => {
    if (listingType === 'rent') {
      return `₹${price.toLocaleString()}/mo`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/properties"
              className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to listings</span>
            </Link>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(property.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="relative h-96">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-neutral-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-900">
                    {formatPrice(property.price, property.listingType)}
                  </div>
                  <div className="text-sm text-neutral-600 capitalize">
                    For {property.listingType}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <Bed className="h-6 w-6 mx-auto mb-1 text-neutral-600" />
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-neutral-600">Bedrooms</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-1 text-neutral-600" />
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-neutral-600">Bathrooms</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-1 text-neutral-600" />
                  <div className="font-semibold">{property.squareFootage.toLocaleString()}</div>
                  <div className="text-sm text-neutral-600">Sq Ft</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <Calendar className="h-6 w-6 mx-auto mb-1 text-neutral-600" />
                  <div className="font-semibold">{property.yearBuilt}</div>
                  <div className="text-sm text-neutral-600">Year Built</div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Description</h3>
                <p className="text-neutral-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {property.features.length > 0 && (
                <div className="border-t border-neutral-200 pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-neutral-700">
                        <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Location</h3>
              <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-neutral-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>Interactive map would be displayed here</p>
                  <p className="text-sm">{property.location.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="text-center mb-4">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold text-neutral-900">{property.agent.name}</h3>
                <p className="text-neutral-600">{property.agent.company}</p>
                <div className="flex items-center justify-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{property.agent.rating}</span>
                  <span className="ml-1 text-sm text-neutral-600">({property.agent.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-primary-900 text-white py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors"
                >
                  Contact Agent
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center space-x-2 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">Call</span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center justify-center space-x-2 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
              </div>

              {showContactForm && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <form className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <textarea
                      rows={3}
                      placeholder="Message"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      defaultValue={`I'm interested in ${property.title}`}
                    />
                    <button
                      type="submit"
                      className="w-full bg-accent-500 text-white py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Property Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Property Type</span>
                  <span className="font-medium capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Listing Type</span>
                  <span className="font-medium capitalize">For {property.listingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Status</span>
                  <span className="font-medium capitalize text-accent-600">{property.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Listed</span>
                  <span className="font-medium">{new Date(property.datePosted).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}