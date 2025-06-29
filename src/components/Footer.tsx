import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Terapit</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              La piattaforma che connette pazienti e psicologi attraverso un sistema di matching intelligente. 
              Trova il terapeuta giusto per il tuo percorso di benessere mentale.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@terapit.com" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+390123456789" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/questionnaire/individual" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Terapia Individuale
                </Link>
              </li>
              <li>
                <Link to="/questionnaire/couple" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Terapia di Coppia
                </Link>
              </li>
              <li>
                <Link to="/questionnaire/child" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Psicologia Infantile
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Registrati
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Supporto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Termini di Servizio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Contattaci
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Terapit. Tutti i diritti riservati.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Milano, Italia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};