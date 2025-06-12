import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';
import SearchBar from '../components/UI/SearchBar';
import PropertyCard from '../components/UI/PropertyCard';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { properties } = useApp();
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the perfect property with our comprehensive real estate platform
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={() => window.location.href = '/properties'} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose EstateHub?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide comprehensive real estate solutions with cutting-edge technology and personalized service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-primary-900" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Advanced Search</h3>
              <p className="text-neutral-600">
                Find properties with our powerful search filters and interactive map views
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="bg-accent-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Secure Transactions</h3>
              <p className="text-neutral-600">
                Your data and transactions are protected with enterprise-grade security
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="bg-secondary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Expert Agents</h3>
              <p className="text-neutral-600">
                Connect with verified professional agents in your area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-neutral-600">
                Handpicked premium properties from our expert team
              </p>
            </div>
            <Link
              to="/properties"
              className="flex items-center space-x-2 text-primary-900 hover:text-primary-800 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-primary-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Expert Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Join thousands of satisfied customers who found their dream homes with rEnEstate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-primary-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              to="/agents"
              className="border border-primary-900 text-primary-900 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Find an Agent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}