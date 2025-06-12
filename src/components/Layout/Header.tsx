import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, User, Menu, X, Settings, LogOut, Shield, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { favorites } = useApp();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-900 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary-900">rEnEstate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/properties" className="flex items-center space-x-1 text-neutral-700 hover:text-primary-900 transition-colors">
              <Search className="h-4 w-4" />
              <span>Browse</span>
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/favorites" className="flex items-center space-x-1 text-neutral-700 hover:text-primary-900 transition-colors relative">
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                  {favorites.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                
                {(currentUser.role === 'agent' || currentUser.role === 'admin') && (
                  <Link to="/add-property" className="flex items-center space-x-1 text-neutral-700 hover:text-primary-900 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Property</span>
                  </Link>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-1 text-neutral-700 hover:text-primary-900 transition-colors"
                  >
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                    <span>{currentUser.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-hover border border-neutral-200 py-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                      >
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      {currentUser.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <hr className="my-2 border-neutral-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-neutral-700 hover:text-primary-900 transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-900 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/properties"
                className="flex items-center space-x-2 text-neutral-700 hover:text-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Browse Properties</span>
              </Link>
              
              {currentUser ? (
                <>
                  <Link
                    to="/favorites"
                    className="flex items-center space-x-2 text-neutral-700 hover:text-primary-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Favorites ({favorites.length})</span>
                  </Link>
                  
                  {(currentUser.role === 'agent' || currentUser.role === 'admin') && (
                    <Link
                      to="/add-property"
                      className="flex items-center space-x-2 text-neutral-700 hover:text-primary-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Property</span>
                    </Link>
                  )}

                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-neutral-700 hover:text-primary-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-6 w-6 rounded-full" />
                    <span>{currentUser.name}</span>
                  </Link>

                  {currentUser.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 text-neutral-700 hover:text-primary-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 text-neutral-700 hover:text-primary-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-900 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}