import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Clock, MessageCircle, Calendar, CheckCircle } from 'lucide-react';

interface Therapist {
  id: number;
  name: string;
  title: string;
  specializations: string[];
  rating: number;
  reviews: number;
  experience: number;
  location: string;
  price: string;
  avatar: string;
  description: string;
  matchPercentage: number;
  availableSlots: string[];
  languages: string[];
  approach: string;
}

const mockTherapists: Therapist[] = [
  {
    id: 1,
    name: 'Dr.ssa Maria Rossi',
    title: 'Psicologa Clinica',
    specializations: ['Ansia', 'Depressione', 'Terapia Cognitivo-Comportamentale'],
    rating: 4.9,
    reviews: 127,
    experience: 8,
    location: 'Milano Centro',
    price: '80€',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Specializzata nel trattamento di ansia e depressione con approccio cognitivo-comportamentale. Esperienza particolare con giovani adulti.',
    matchPercentage: 95,
    availableSlots: ['Martedì 14:00', 'Giovedì 16:30', 'Venerdì 10:00'],
    languages: ['Italiano', 'Inglese'],
    approach: 'Cognitivo-Comportamentale'
  },
  {
    id: 2,
    name: 'Dr. Giuseppe Bianchi',
    title: 'Psicoterapeuta',
    specializations: ['Terapia di Coppia', 'Stress Lavorativo', 'Terapia Sistemica'],
    rating: 4.8,
    reviews: 89,
    experience: 12,
    location: 'Milano Navigli',
    price: '90€',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Esperto in terapia di coppia e familiare. Aiuta le persone a gestire lo stress lavorativo e migliorare le relazioni interpersonali.',
    matchPercentage: 88,
    availableSlots: ['Lunedì 15:00', 'Mercoledì 17:00', 'Sabato 11:00'],
    languages: ['Italiano', 'Francese'],
    approach: 'Sistemico-Familiare'
  },
  {
    id: 3,
    name: 'Dr.ssa Anna Verde',
    title: 'Psicologa dell\'Età Evolutiva',
    specializations: ['Disturbi del Sonno', 'Autostima', 'EMDR'],
    rating: 4.9,
    reviews: 156,
    experience: 10,
    location: 'Milano Porta Garibaldi',
    price: '75€',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Specialista in EMDR per il trattamento di traumi. Esperienza con disturbi del sonno e problemi di autostima.',
    matchPercentage: 92,
    availableSlots: ['Martedì 16:00', 'Giovedì 14:30', 'Venerdì 15:00'],
    languages: ['Italiano', 'Inglese', 'Spagnolo'],
    approach: 'EMDR e Umanistico'
  }
];

export const MatchingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTherapists, setSelectedTherapists] = useState<number[]>([]);

  useEffect(() => {
    // Simulate matching algorithm processing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectTherapist = (therapistId: number) => {
    if (selectedTherapists.includes(therapistId)) {
      setSelectedTherapists(selectedTherapists.filter(id => id !== therapistId));
    } else if (selectedTherapists.length < 3) {
      setSelectedTherapists([...selectedTherapists, therapistId]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen anime-bg-matching flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full"
        >
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-teal-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stiamo trovando i tuoi match perfetti
          </h2>
          <p className="text-gray-600 mb-6">
            Il nostro algoritmo sta analizzando le tue risposte per selezionare i 3 terapeuti più compatibili...
          </p>
          <div className="space-y-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full bg-gray-200 rounded-full h-2"
            >
              <div className="bg-teal-600 h-2 rounded-full w-full" />
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full bg-gray-200 rounded-full h-2"
            >
              <div className="bg-teal-600 h-2 rounded-full w-3/4" />
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="w-full bg-gray-200 rounded-full h-2"
            >
              <div className="bg-teal-600 h-2 rounded-full w-3/5" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen anime-bg-matching py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            I Tuoi 3 Match Perfetti
          </h1>
          <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto drop-shadow">
            Basandoci sulle tue risposte, abbiamo selezionato questi terapeuti altamente compatibili. 
            Prenota una consulenza gratuita di 30 minuti con ognuno.
          </p>
        </motion.div>

        {/* Therapists Cards */}
        <div className="space-y-8 mb-12">
          {mockTherapists.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border-2 transition-all duration-300 ${
                selectedTherapists.includes(therapist.id)
                  ? 'border-teal-500 shadow-2xl'
                  : 'border-white border-opacity-20 hover:border-teal-300 hover:shadow-2xl'
              }`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={therapist.avatar}
                      alt={therapist.name}
                      className="w-20 h-20 rounded-full object-cover mr-6"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{therapist.name}</h3>
                      <p className="text-gray-600 mb-2">{therapist.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span>{therapist.rating} ({therapist.reviews} recensioni)</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{therapist.experience} anni di esperienza</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{therapist.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-2">
                      {therapist.matchPercentage}% Match
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{therapist.price}</div>
                    <div className="text-sm text-gray-500">per sessione</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{therapist.description}</p>

                {/* Specializations */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Specializzazioni:</h4>
                  <div className="flex flex-wrap gap-2">
                    {therapist.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Slots */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Prossimi slot disponibili:</h4>
                  <div className="flex flex-wrap gap-2">
                    {therapist.availableSlots.map((slot, index) => (
                      <span
                        key={index}
                        className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm border border-teal-200"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Approccio: </span>
                    <span className="text-gray-600">{therapist.approach}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Lingue: </span>
                    <span className="text-gray-600">{therapist.languages.join(', ')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={() => handleSelectTherapist(therapist.id)}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      selectedTherapists.includes(therapist.id)
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                    }`}
                  >
                    {selectedTherapists.includes(therapist.id) ? (
                      <span className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Selezionato per Consulenza Gratuita
                      </span>
                    ) : (
                      'Seleziona per Consulenza Gratuita'
                    )}
                  </button>
                  <Link
                    to={`/therapist/${therapist.id}`}
                    className="flex-1 md:flex-none bg-white text-teal-600 border-2 border-teal-600 py-3 px-6 rounded-lg font-semibold hover:bg-teal-50 transition-colors text-center"
                  >
                    Vedi Profilo Completo
                  </Link>
                  <button className="flex-1 md:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Messaggio
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {selectedTherapists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Hai selezionato {selectedTherapists.length} terapeut{selectedTherapists.length === 1 ? 'a' : 'i'}
            </h3>
            <p className="text-gray-600 mb-6">
              Procedi per prenotare le tue consulenze gratuite di 30 minuti con {selectedTherapists.length === 1 ? 'questo professionista' : 'questi professionisti'}.
            </p>
            <Link
              to="/booking"
              className="bg-teal-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Prenota le Consulenze Gratuite
            </Link>
          </motion.div>
        )}

        {selectedTherapists.length === 0 && (
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Seleziona i terapeuti che ti interessano
            </h3>
            <p className="text-gray-700">
              Puoi scegliere fino a 3 professionisti per le consulenze gratuite
            </p>
          </div>
        )}
      </div>
    </div>
  );
};