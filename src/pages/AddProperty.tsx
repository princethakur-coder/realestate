import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, X, Plus, MapPin, Home, DollarSign, 
  Bed, Bath, Square, Calendar, Tag, Image
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AddProperty() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'house',
    listingType: 'sale',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    yearBuilt: '',
    features: [] as string[],
    images: [] as string[]
  });
  const [newFeature, setNewFeature] = useState('');

  const steps = [
    { id: 1, title: 'Basic Information', icon: Home },
    { id: 2, title: 'Property Details', icon: Square },
    { id: 3, title: 'Features & Images', icon: Image },
    { id: 4, title: 'Review & Publish', icon: Tag }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f !== feature)
    });
  };

  const addSampleImages = () => {
    const sampleImages = [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    setFormData({
      ...formData,
      images: sampleImages
    });
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    console.log('Property data:', formData);
    alert('Property listing created successfully! (This is a demo)');
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Add New Property
          </h1>
          <p className="text-neutral-600">
            Create a comprehensive listing to attract potential buyers or renters
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                        isActive
                          ? 'bg-primary-900 border-primary-900 text-white'
                          : isCompleted
                          ? 'bg-accent-500 border-accent-500 text-white'
                          : 'bg-white border-neutral-300 text-neutral-400'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive || isCompleted ? 'text-neutral-900' : 'text-neutral-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-accent-500' : 'bg-neutral-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-soft p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Property Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Modern Luxury Penthouse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe the property features, location, and unique selling points..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Listing Type
                    </label>
                    <select
                      name="listingType"
                      value={formData.listingType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Price ({formData.listingType === 'rent' ? 'per month' : 'total'})
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <input
                        type="number"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Property Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Property Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Bedrooms
                    </label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <input
                        type="number"
                        name="bedrooms"
                        required
                        min="0"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Bathrooms
                    </label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <input
                        type="number"
                        name="bathrooms"
                        required
                        min="0"
                        step="0.5"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Square Footage
                    </label>
                    <div className="relative">
                      <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <input
                        type="number"
                        name="squareFootage"
                        required
                        min="0"
                        value={formData.squareFootage}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Year Built
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <input
                        type="number"
                        name="yearBuilt"
                        required
                        min="1800"
                        max={new Date().getFullYear()}
                        value={formData.yearBuilt}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="2020"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Features & Images */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Features & Images</h2>
                
                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-4">
                    Property Features
                  </label>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Add a feature (e.g., Swimming Pool, Garage, etc.)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="bg-primary-900 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-900"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="ml-2 text-primary-700 hover:text-primary-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-4">
                    Property Images
                  </label>
                  
                  {formData.images.length === 0 ? (
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-neutral-900 mb-2">
                        Upload Property Images
                      </h4>
                      <p className="text-neutral-600 mb-4">
                        Drag and drop images here, or click to select files
                      </p>
                      <div className="space-y-2">
                        <button
                          type="button"
                          className="bg-primary-900 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors"
                        >
                          Choose Files
                        </button>
                        <p className="text-sm text-neutral-500">or</p>
                        <button
                          type="button"
                          onClick={addSampleImages}
                          className="text-primary-900 hover:text-primary-800 font-medium"
                        >
                          Use Sample Images (Demo)
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Property ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && (
                              <span className="absolute bottom-2 left-2 bg-primary-900 text-white px-2 py-1 rounded text-xs">
                                Main Photo
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add More Images</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review & Publish */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Review & Publish</h2>
                
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Listing Preview</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-neutral-900">{formData.title}</h4>
                      <p className="text-neutral-600">{formData.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-600">Price:</span>
                        <p className="font-medium">${parseInt(formData.price).toLocaleString()}{formData.listingType === 'rent' ? '/mo' : ''}</p>
                      </div>
                      <div>
                        <span className="text-neutral-600">Type:</span>
                        <p className="font-medium capitalize">{formData.propertyType}</p>
                      </div>
                      <div>
                        <span className="text-neutral-600">Bedrooms:</span>
                        <p className="font-medium">{formData.bedrooms}</p>
                      </div>
                      <div>
                        <span className="text-neutral-600">Bathrooms:</span>
                        <p className="font-medium">{formData.bathrooms}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-600">Address:</span>
                      <p className="font-medium">
                        {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>

                    {formData.features.length > 0 && (
                      <div>
                        <span className="text-neutral-600">Features:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-100 text-primary-900 rounded text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Ready to Publish?</h4>
                  <p className="text-sm text-blue-800">
                    Your property listing will be reviewed and published within 24 hours. 
                    You can edit or manage your listing from your dashboard at any time.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full ${
                      currentStep === step.id
                        ? 'bg-primary-900'
                        : currentStep > step.id
                        ? 'bg-accent-500'
                        : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center space-x-2"
                >
                  <span>Publish Listing</span>
                  <Tag className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}