import React, { useState } from 'react';
import { 
  Users, Home, TrendingUp, AlertTriangle, CheckCircle, X, 
  Eye, Edit, Trash2, Ban, Shield, BarChart3, Search,
  Calendar, DollarSign, MapPin, Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { properties } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock admin data
  const stats = {
    totalUsers: 1547,
    totalProperties: properties.length,
    activeListings: properties.filter(p => p.status === 'active').length,
    pendingReviews: 12,
    totalRevenue: 145000,
    monthlyGrowth: 12.5
  };

  const recentUsers = [
    {
      id: '1',
      name: 'Disha',
      email: 'disha@example.com',
      role: 'buyer',
      joinDate: '2024-01-15',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Sarah',
      email: 'sarah@example.com',
      role: 'agent',
      joinDate: '2024-01-12',
      status: 'pending',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Rohit',
      email: 'rohit@example.com',
      role: 'buyer',
      joinDate: '2024-01-10',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const pendingListings = [
    {
      id: '1',
      title: 'Luxury Downtown Condo',
      agent: 'Akash Thakur',
      price: 850000,
      location: 'golden temple, Amritsar',
      submittedDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Suburban Family Home',
      agent: 'Simran',
      price: 425000,
      location: 'Sukhna enclave, Khrar',
      submittedDate: '2024-01-14',
      status: 'pending'
    }
  ];

  const flaggedContent = [
    {
      id: '1',
      type: 'property',
      title: 'Suspicious pricing on luxury home',
      description: 'Property priced significantly below market value',
      reportedBy: 'System',
      date: '2024-01-15'
    },
    {
      id: '2',
      type: 'user',
      title: 'Spam messages from user',
      description: 'Multiple users reported spam messages',
      reportedBy: 'Multiple users',
      date: '2024-01-14'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'flagged', label: 'Flagged Content', icon: AlertTriangle }
  ];

  const approveProperty = (propertyId: string) => {
    // Mock approval
    alert(`Property ${propertyId} approved!`);
  };

  const rejectProperty = (propertyId: string) => {
    // Mock rejection
    alert(`Property ${propertyId} rejected!`);
  };

  const suspendUser = (userId: string) => {
    // Mock suspension
    alert(`User ${userId} suspended!`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600">
            Manage users, properties, and site activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6">
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
                      {tab.id === 'reviews' && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {stats.pendingReviews}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Total Users</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.totalUsers.toLocaleString()}</p>
                        <p className="text-sm text-accent-600">+12% this month</p>
                      </div>
                      <Users className="h-8 w-8 text-primary-900" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Total Properties</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.totalProperties}</p>
                        <p className="text-sm text-accent-600">+8% this month</p>
                      </div>
                      <Home className="h-8 w-8 text-secondary-400" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Active Listings</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.activeListings}</p>
                        <p className="text-sm text-accent-600">+15% this month</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-accent-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Pending Reviews</p>
                        <p className="text-2xl font-bold text-neutral-900">{stats.pendingReviews}</p>
                        <p className="text-sm text-red-600">Needs attention</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Revenue</p>
                        <p className="text-2xl font-bold text-neutral-900">${stats.totalRevenue.toLocaleString()}</p>
                        <p className="text-sm text-accent-600">+{stats.monthlyGrowth}% this month</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-accent-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">System Status</p>
                        <p className="text-2xl font-bold text-accent-600">Healthy</p>
                        <p className="text-sm text-neutral-600">All systems operational</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-accent-500" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Users</h3>
                    <div className="space-y-4">
                      {recentUsers.map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-neutral-900">{user.name}</p>
                              <p className="text-sm text-neutral-600 capitalize">{user.role}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' 
                              ? 'bg-accent-100 text-accent-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Pending Approvals</h3>
                    <div className="space-y-4">
                      {pendingListings.map(listing => (
                        <div key={listing.id} className="p-3 border border-neutral-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-neutral-900">{listing.title}</h4>
                            <span className="text-lg font-bold text-primary-900">
                              ${listing.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 mb-2">by {listing.agent}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">{listing.location}</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveProperty(listing.id)}
                                className="text-accent-600 hover:text-accent-800"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => rejectProperty(listing.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900">User Management</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-neutral-900">User</th>
                        <th className="px-4 py-3 text-left font-medium text-neutral-900">Role</th>
                        <th className="px-4 py-3 text-left font-medium text-neutral-900">Join Date</th>
                        <th className="px-4 py-3 text-left font-medium text-neutral-900">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-neutral-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {recentUsers.map(user => (
                        <tr key={user.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <div>
                                <p className="font-medium text-neutral-900">{user.name}</p>
                                <p className="text-neutral-600">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="capitalize">{user.role}</span>
                          </td>
                          <td className="px-4 py-3">{user.joinDate}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'active' 
                                ? 'bg-accent-100 text-accent-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <button className="text-primary-600 hover:text-primary-800">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-neutral-600 hover:text-neutral-800">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => suspendUser(user.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Ban className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Property Management</h3>
                
                <div className="space-y-4">
                  {properties.slice(0, 5).map(property => (
                    <div key={property.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="h-16 w-20 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-neutral-900">{property.title}</h4>
                          <p className="text-sm text-neutral-600">{property.location.city}, {property.location.state}</p>
                          <p className="text-sm font-medium text-primary-900">
                            ${property.price.toLocaleString()}{property.listingType === 'rent' ? '/mo' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          property.status === 'active' 
                            ? 'bg-accent-100 text-accent-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="text-primary-600 hover:text-primary-800">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-neutral-600 hover:text-neutral-800">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'flagged' && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Flagged Content</h3>
                
                <div className="space-y-4">
                  {flaggedContent.map(item => (
                    <div key={item.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-900 capitalize">{item.type}</span>
                          </div>
                          <h4 className="font-medium text-neutral-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
                          <p className="text-xs text-neutral-500">
                            Reported by {item.reportedBy} on {item.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-accent-600 hover:text-accent-800 text-sm">
                            Resolve
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-sm">
                            Take Action
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}