import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  MessageCircle, 
  Calendar, 
  Heart,
  ChevronRight,
  Clock,
  CheckCircle,
  Star,
  Target,
  Brain,
  Baby
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Terapia Individuale',
      description: 'Inizia il questionario personalizzato',
      icon: User,
      link: '/questionnaire/individual',
      color: 'bg-gradient-to-br from-teal-500 to-blue-600'
    },
    {
      title: 'Terapia di Coppia',
      description: 'Questionario per la relazione',
      icon: Heart,
      link: '/questionnaire/couple',
      color: 'bg-gradient-to-br from-pink-500 to-rose-600'
    },
    {
      title: 'Psicologia Infantile',
      description: 'Supporto per bambini e adolescenti',
      icon: Baby,
      link: '/questionnaire/child',
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    },
    {
      title: 'I Tuoi Match',
      description: 'Vedi i terapeuti compatibili',
      icon: Target,
      link: '/matching',
      color: 'bg-green-500'
    }
  ];

  const recentMatches = [
    {
      id: 1,
      name: 'Dr.ssa Maria Rossi',
      specialization: 'Psicologa Clinica',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'available'
    },
    {
      id: 2,
      name: 'Dr. Giuseppe Bianchi',
      specialization: 'Psicoterapeuta',
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'booked'
    },
    {
      id: 3,
      name: 'Dr.ssa Anna Verdi',
      specialization: 'Psicologa dell\'età evolutiva',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'available'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      therapist: 'Dr.ssa Maria Rossi',
      date: '2025-01-25',
      time: '14:30',
      type: 'Consulenza gratuita',
      status: 'confirmed'
    },
    {
      id: 2,
      therapist: 'Dr. Giuseppe Bianchi',
      date: '2025-01-27',
      time: '16:00',
      type: 'Sessione di terapia',
      status: 'pending'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Benvenuto, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Trova il tuo match terapeutico perfetto attraverso i nostri questionari scientifici
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Inizia il Tuo Percorso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1`}
                >
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-white">{action.title}</h3>
                      <p className="text-sm text-white text-opacity-90">{action.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">I Tuoi Match</h2>
              <Link to="/matching" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Vedi tutti
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {recentMatches.map((match, index) => (
                <div key={match.id} className={`p-6 ${index !== recentMatches.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={match.avatar}
                        alt={match.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-900">{match.name}</h3>
                        <p className="text-sm text-gray-600">{match.specialization}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{match.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {match.status === 'available' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Disponibile
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Prenotato
                        </span>
                      )}
                      <Link
                        to={`/therapist/${match.id}`}
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-teal-500 to-blue-600 text-white p-6 rounded-xl"
          >
            <h3 className="font-semibold mb-2">Il Tuo Percorso</h3>
            <p className="text-teal-100 text-sm mb-4">
              Hai completato 2 su 3 consulenze gratuite
            </p>
            <div className="w-full bg-teal-400 rounded-full h-2 mb-4">
              <div className="bg-white h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
            <Link
              to="/matching"
              className="inline-flex items-center text-sm font-medium text-white hover:text-teal-100"
            >
              Continua il matching
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Prossimi Appuntamenti</h3>
              <Link to="/booking" className="text-teal-600 hover:text-teal-700">
                <Calendar className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{appointment.therapist}</h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confermato' : 'In attesa'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{appointment.type}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(appointment.date).toLocaleDateString('it-IT')} alle {appointment.time}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Hai bisogno di aiuto?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Il nostro team di supporto è sempre disponibile per aiutarti
            </p>
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Contatta il Supporto
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};