import React, { useState } from 'react';
import { Camera, Save, User, Mail, Phone, Building, MapPin, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    company: currentUser?.company || '',
    bio: '',
    location: '',
    website: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProfile(formData);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      company: currentUser?.company || '',
      bio: '',
      location: '',
      website: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-neutral-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <button className="absolute bottom-0 right-0 bg-primary-900 text-white p-2 rounded-full hover:bg-primary-800 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                {currentUser?.name}
              </h3>
              <p className="text-neutral-600 capitalize mb-2">{currentUser?.role}</p>
              
              {currentUser?.verified && (
                <div className="inline-flex items-center space-x-1 bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Verified</span>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="text-sm text-neutral-600">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {currentUser?.joinDate}</span>
                  </div>
                  {currentUser?.role === 'agent' && currentUser?.licenseNumber && (
                    <div className="flex items-center justify-center space-x-1">
                      <Shield className="h-4 w-4" />
                      <span>License: {currentUser.licenseNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-soft p-6 mt-6">
              <h4 className="font-semibold text-neutral-900 mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Favorites</span>
                  <span className="font-medium">{currentUser?.favorites?.length || 0}</span>
                </div>
                {currentUser?.role === 'agent' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Active Listings</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Total Views</span>
                      <span className="font-medium">0</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Personal Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-accent-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isSaving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                    />
                  </div>
                </div>

                {currentUser?.role === 'agent' && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="City, State"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                />
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl shadow-soft p-6 mt-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">
                Account Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">Email Notifications</h4>
                    <p className="text-sm text-neutral-600">Receive updates about your listings and inquiries</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">SMS Notifications</h4>
                    <p className="text-sm text-neutral-600">Get text messages for urgent updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">Marketing Communications</h4>
                    <p className="text-sm text-neutral-600">Receive tips and market insights</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h4 className="font-medium text-neutral-900 mb-4">Danger Zone</h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    Change Password
                  </button>
                  <button className="w-full text-left p-3 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    Deactivate Account
                  </button>
                  <button className="w-full text-left p-3 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}