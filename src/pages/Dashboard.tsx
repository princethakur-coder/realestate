import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Heart, Bell, User, Settings, Plus, BarChart3, 
  MapPin, Calendar, TrendingUp, MessageCircle, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/UI/PropertyCard';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { properties } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const userProperties = properties.filter(p => p.agent.id === currentUser?.id);
  const favoriteProperties = properties.filter(p => currentUser?.favorites.includes(p.id));
  const recentViews = properties.slice(0, 3); // Mock recent views

  const stats = {
    totalListings: userProperties.length,
    totalViews: userProperties.reduce((sum, p) => sum + Math.floor(Math.random() * 1000), 0),
    inquiries: Math.floor(Math.random() * 50) + 10,
    favorites: favoriteProperties.length
  };

  const notifications = [
    {
      id: '1',
      type: 'inquiry',
      title: 'New inquiry for Modern Luxury Penthouse',
      message: 'Neha is interested in scheduling a viewing',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'favorite',
      title: 'Property added to favorites',
      message: 'Your listing was favorited by 3 users today',
      time: '4 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'review',
      title: 'New review received',
      message: 'You received a 5-star review from Joshdeep',
      time: '1 day ago',
      read: true
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'listings', label: 'My Listings', icon: Home },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-neutral-600">
            Manage your properties and track your real estate activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-neutral-900">{currentUser?.name}</h3>
                  <p className="text-sm text-neutral-600 capitalize">{currentUser?.role}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-900'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {currentUser?.role === 'agent' && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Link
                    to="/add-property"
                    className="w-full bg-primary-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Property</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Total Listings</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.totalListings}</p>
                      </div>
                      <Home className="h-8 w-8 text-primary-900" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Total Views</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.totalViews}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-secondary-400" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Inquiries</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.inquiries}</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-accent-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Favorites</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.favorites}</p>
                      </div>
                      <Heart className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                      <div className="bg-primary-900 p-2 rounded-full">
                        <Home className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">New property listing created</p>
                        <p className="text-xs text-neutral-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                      <div className="bg-accent-500 p-2 rounded-full">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">New inquiry received</p>
                        <p className="text-xs text-neutral-600">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                      <div className="bg-secondary-400 p-2 rounded-full">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">Property featured in search results</p>
                        <p className="text-xs text-neutral-600">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Views */}
                {recentViews.length > 0 && (
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recently Viewed</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recentViews.map(property => (
                        <div key={property.id} className="border border-neutral-200 rounded-lg p-4">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <Link
                            to={`/property/${property.id}`}
                            className="text-sm font-medium text-neutral-900 hover:text-primary-900"
                          >
                            {property.title}
                          </Link>
                          <p className="text-xs text-neutral-600 mt-1">
                            {property.location.city}, {property.location.state}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900">My Listings</h3>
                  {currentUser?.role === 'agent' && (
                    <Link
                      to="/add-property"
                      className="bg-primary-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Property</span>
                    </Link>
                  )}
                </div>
                
                {userProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <Home className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-neutral-900 mb-2">No listings yet</h4>
                    <p className="text-neutral-600 mb-4">Start by adding your first property listing</p>
                    {currentUser?.role === 'agent' && (
                      <Link
                        to="/add-property"
                        className="bg-primary-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors inline-block"
                      >
                        Add Your First Property
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userProperties.map(property => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Favorite Properties</h3>
                
                {favoriteProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-neutral-900 mb-2">No favorites yet</h4>
                    <p className="text-neutral-600 mb-4">Save properties you're interested in</p>
                    <Link
                      to="/properties"
                      className="bg-primary-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors inline-block"
                    >
                      Browse Properties
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map(property => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Notifications</h3>
                
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-white border-neutral-200' : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'inquiry' ? 'bg-accent-100 text-accent-600' :
                          notification.type === 'favorite' ? 'bg-red-100 text-red-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {notification.type === 'inquiry' && <MessageCircle className="h-4 w-4" />}
                          {notification.type === 'favorite' && <Heart className="h-4 w-4" />}
                          {notification.type === 'review' && <Star className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-neutral-900">{notification.title}</h4>
                          <p className="text-sm text-neutral-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-neutral-500 mt-2">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Profile Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="h-20 w-20 rounded-full"
                    />
                    <div>
                      <button className="bg-primary-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors">
                        Change Photo
                      </button>
                      <p className="text-sm text-neutral-600 mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={currentUser?.name || ''}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={currentUser?.phone || ''}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    {currentUser?.role === 'agent' && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={currentUser?.company || ''}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-primary-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}