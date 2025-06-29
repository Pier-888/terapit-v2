import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Menu, X, User, MessageCircle, Calendar, Settings, LogOut, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Terapit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user && (
              <Link to="/messages" className="text-gray-600 hover:text-teal-600 transition-colors">
                Messaggi
              </Link>
            )}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <img
                    src={user.avatar || `https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Messaggi
                      </Link>
                      <Link
                        to="/booking"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Appuntamenti
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Esci
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Accedi
                </Link>
                <Link
                  to="/therapy-selection"
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Inizia il Questionario
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-teal-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/messages"
                      className="text-gray-600 hover:text-teal-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Messaggi
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      Esci
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-teal-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Accedi
                    </Link>
                    <Link
                      to="/therapy-selection"
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium text-center flex items-center justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Inizia il Questionario
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};