import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  MessageCircle, 
  Calendar, 
  DollarSign,
  TrendingUp,
  ChevronRight,
  Clock,
  CheckCircle,
  Star,
  Users,
  FileText
} from 'lucide-react';

export const TherapistDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Pazienti Attivi',
      value: '12',
      change: '+2 questo mese',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Appuntamenti Oggi',
      value: '5',
      change: '3 confermati',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Rating Medio',
      value: '4.9',
      change: '+0.1 questo mese',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Guadagni Mensili',
      value: '€2,450',
      change: '+15% vs scorso mese',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Anna M.',
      lastSession: '2025-01-20',
      nextSession: '2025-01-27',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Marco R.',
      lastSession: '2025-01-18',
      nextSession: '2025-01-25',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Giulia S.',
      lastSession: '2025-01-15',
      nextSession: null,
      status: 'needs_scheduling',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Anna M.',
      time: '14:30',
      type: 'Sessione di terapia',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Marco R.',
      time: '16:00',
      type: 'Consulenza gratuita',
      status: 'confirmed'
    },
    {
      id: 3,
      patient: 'Lucia P.',
      time: '17:30',
      type: 'Prima sessione',
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
          Gestisci la tua pratica professionale e i tuoi pazienti
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gray-50`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Patients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Pazienti Recenti</h2>
              <Link to="/patients" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Vedi tutti
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {recentPatients.map((patient, index) => (
                <div key={patient.id} className={`p-6 ${index !== recentPatients.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">
                          Ultima sessione: {new Date(patient.lastSession).toLocaleDateString('it-IT')}
                        </p>
                        {patient.nextSession && (
                          <p className="text-sm text-gray-500">
                            Prossima: {new Date(patient.nextSession).toLocaleDateString('it-IT')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {patient.status === 'active' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Attivo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Da programmare
                        </span>
                      )}
                      <button className="text-teal-600 hover:text-teal-700">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Azioni Rapide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/profile"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Profilo</h3>
                    <p className="text-sm text-gray-600">Aggiorna le tue info</p>
                  </div>
                </div>
              </Link>
              
              <Link
                to="/availability"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="bg-green-500 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Disponibilità</h3>
                    <p className="text-sm text-gray-600">Gestisci orari</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/reports"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Report</h3>
                    <p className="text-sm text-gray-600">Statistiche mensili</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Appuntamenti Oggi</h3>
              <Link to="/booking" className="text-teal-600 hover:text-teal-700">
                <Calendar className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{appointment.patient}</h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confermato' : 'In attesa'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{appointment.type}</p>
                  <p className="text-xs text-gray-500">Ore {appointment.time}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-teal-500 to-blue-600 text-white p-6 rounded-xl"
          >
            <h3 className="font-semibold mb-2">Performance del Mese</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-teal-100">Sessioni completate</span>
                <span>42</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-teal-100">Nuovi pazienti</span>
                <span>6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-teal-100">Tasso di soddisfazione</span>
                <span>96%</span>
              </div>
            </div>
            <Link
              to="/analytics"
              className="inline-flex items-center text-sm font-medium text-white hover:text-teal-100"
            >
              Vedi dettagli
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          {/* Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Messaggi</h3>
              <div className="flex items-center">
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mr-2">3</span>
                <Link to="/messages" className="text-teal-600 hover:text-teal-700">
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Hai 3 nuovi messaggi da pazienti in attesa di risposta
            </p>
            <Link
              to="/messages"
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-center block"
            >
              Vai ai Messaggi
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};