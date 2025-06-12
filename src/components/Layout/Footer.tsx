import React from 'react';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-900 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">rEnEstate</span>
            </div>
            <p className="text-neutral-300 mb-4 max-w-md">
              Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with professional agents nationwide.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-neutral-300">
                <Phone className="h-4 w-4" />
                <span>(985) 123-4927</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Mail className="h-4 w-4" />
                <span>info@renestate.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="/properties" className="hover:text-white transition-colors">Browse Properties</a></li>
              <li><a href="/agents" className="hover:text-white transition-colors">Find Agents</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="/buy" className="hover:text-white transition-colors">Buy Property</a></li>
              <li><a href="/sell" className="hover:text-white transition-colors">Sell Property</a></li>
              <li><a href="/rent" className="hover:text-white transition-colors">Rent Property</a></li>
              <li><a href="/invest" className="hover:text-white transition-colors">Investment</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400">© 2024 rEnEstate. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}