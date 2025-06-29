import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  MessageCircle, 
  Calendar, 
  Award,
  BookOpen,
  Users,
  Heart,
  ChevronLeft,
  Phone,
  Video,
  Globe
} from 'lucide-react';

// Mock therapist data
const therapistData = {
  1: {
    id: 1,
    name: 'Dr.ssa Maria Rossi',
    title: 'Psicologa Clinica',
    specializations: ['Ansia', 'Depressione', 'Terapia Cognitivo-Comportamentale', 'Disturbi dell\'Umore'],
    rating: 4.9,
    reviews: 127,
    experience: 8,
    location: 'Milano Centro',
    price: 80,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    languages: ['Italiano', 'Inglese'],
    approach: 'Cognitivo-Comportamentale',
    education: [
      'Laurea in Psicologia - Università Statale di Milano',
      'Specializzazione in Psicoterapia Cognitivo-Comportamentale',
      'Master in Disturbi dell\'Ansia - Università Bocconi'
    ],
    certifications: [
      'Ordine degli Psicologi della Lombardia',
      'Certificazione CBT - Beck Institute',
      'Formazione EMDR - Livello I'
    ],
    bio: 'La Dr.ssa Maria Rossi è una psicologa clinica specializzata nel trattamento di ansia e depressione attraverso l\'approccio cognitivo-comportamentale. Con oltre 8 anni di esperienza, ha aiutato centinaia di pazienti a superare le loro difficoltà emotive e a sviluppare strategie efficaci per il benessere mentale. La sua metodologia si basa su tecniche evidence-based e un approccio personalizzato per ogni paziente.',
    sessionTypes: [
      { type: 'In presenza', icon: Users, description: 'Sessioni nel mio studio a Milano Centro' },
      { type: 'Online', icon: Video, description: 'Videochiamate tramite piattaforma sicura' },
      { type: 'Telefonica', icon: Phone, description: 'Chiamate telefoniche per sessioni di supporto' }
    ],
    availability: [
      'Lunedì: 9:00 - 18:00',
      'Martedì: 9:00 - 18:00',
      'Mercoledì: 14:00 - 20:00',
      'Giovedì: 9:00 - 18:00',
      'Venerdì: 9:00 - 16:00'
    ],
    nextAvailable: '2025-01-25 14:30'
  }
};

const reviews = [
  {
    id: 1,
    author: 'Anna M.',
    rating: 5,
    date: '2025-01-15',
    text: 'La Dr.ssa Rossi mi ha aiutato enormemente con la mia ansia. Il suo approccio è professionale ma allo stesso tempo molto umano. Consiglio vivamente!'
  },
  {
    id: 2,
    author: 'Marco R.',
    rating: 5,
    date: '2025-01-10',
    text: 'Dopo mesi di terapia posso dire di aver fatto progressi incredibili. La dottoressa è molto preparata e sa come mettere a proprio agio.'
  },
  {
    id: 3,
    author: 'Giulia S.',
    rating: 4,
    date: '2025-01-05',
    text: 'Esperienza molto positiva. Le tecniche CBT che mi ha insegnato sono state fondamentali per gestire i miei attacchi di panico.'
  }
];

export const TherapistProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const therapist = therapistData[Number(id) as keyof typeof therapistData];

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Terapeuta non trovato</h2>
          <Link to="/search" className="text-teal-600 hover:text-teal-700">
            Torna alla ricerca
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Panoramica' },
    { id: 'about', label: 'Chi sono' },
    { id: 'reviews', label: 'Recensioni' },
    { id: 'availability', label: 'Disponibilità' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            to="/search"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Torna alla ricerca
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={therapist.avatar}
              alt={therapist.name}
              className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
            />
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{therapist.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{therapist.title}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-500 mb-4">
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
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{therapist.languages.join(', ')}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {therapist.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">€{therapist.price}</div>
              <div className="text-sm text-gray-500 mb-4">per sessione</div>
              <div className="space-y-2">
                <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Prenota Consulenza Gratuita
                </button>
                <button className="w-full bg-white text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors font-semibold">
                  <MessageCircle className="w-5 h-5 inline mr-2" />
                  Invia Messaggio
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Approccio Terapeutico</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {therapist.approach} - Un metodo evidence-based che si concentra sui pensieri, 
                    emozioni e comportamenti per aiutare i pazienti a sviluppare strategie efficaci 
                    per gestire le loro difficoltà.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Modalità di Sessione</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {therapist.sessionTypes.map((session, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <session.icon className="w-5 h-5 text-teal-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">{session.type}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{session.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Prossima Disponibilità</h3>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-teal-600 mr-2" />
                      <span className="text-teal-800 font-medium">
                        {new Date(therapist.nextAvailable).toLocaleDateString('it-IT', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Chi sono</h3>
                  <p className="text-gray-700 leading-relaxed">{therapist.bio}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Formazione
                  </h3>
                  <ul className="space-y-2">
                    {therapist.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Certificazioni
                  </h3>
                  <ul className="space-y-2">
                    {therapist.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Recensioni dei Pazienti</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-lg font-semibold text-gray-900">{therapist.rating}</span>
                    <span className="text-gray-500 ml-1">({therapist.reviews} recensioni)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-medium">
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{review.author}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('it-IT')}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900">Orari di Disponibilità</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Orari Settimanali</h4>
                    <div className="space-y-2">
                      {therapist.availability.map((schedule, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-700">{schedule.split(':')[0]}</span>
                          <span className="text-gray-600">{schedule.split(': ')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Prenota un Appuntamento</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600 mb-4">
                        Seleziona un orario disponibile per la tua consulenza gratuita di 30 minuti.
                      </p>
                      <button className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                        <Calendar className="w-5 h-5 inline mr-2" />
                        Visualizza Calendario
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 mt-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Pronto a iniziare il tuo percorso?</h3>
          <p className="text-teal-100 mb-6">
            Prenota una consulenza gratuita di 30 minuti con {therapist.name.split(' ')[1]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              <Calendar className="w-5 h-5 inline mr-2" />
              Prenota Consulenza Gratuita
            </button>
            <button className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-400 transition-colors font-semibold">
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Invia Messaggio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};