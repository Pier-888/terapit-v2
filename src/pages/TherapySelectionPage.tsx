import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Heart, Baby, Target, ChevronRight } from 'lucide-react';

export const TherapySelectionPage: React.FC = () => {
  const therapyTypes = [
    {
      id: 'individual',
      title: 'Terapia Individuale',
      description: 'Percorso personalizzato per il tuo benessere emotivo',
      icon: User,
      gradient: 'from-teal-500 to-blue-600',
      features: [
        'Ansia, depressione, stress',
        'Crescita personale',
        'Gestione delle emozioni',
        'Autostima e relazioni'
      ]
    },
    {
      id: 'couple',
      title: 'Terapia di Coppia',
      description: 'Migliora la comunicazione e rafforza la relazione',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-600',
      features: [
        'Comunicazione e conflitti',
        'Fiducia e intimità',
        'Crisi di coppia',
        'Mediazione familiare'
      ]
    },
    {
      id: 'child',
      title: 'Psicologia Infantile',
      description: 'Supporto specializzato per bambini e adolescenti',
      icon: Baby,
      gradient: 'from-purple-500 to-indigo-600',
      features: [
        'Difficoltà comportamentali',
        'Supporto scolastico',
        'Consulenza genitoriale',
        'Sviluppo emotivo'
      ]
    }
  ];

  return (
    <div className="min-h-screen anime-bg-selection py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Che tipo di supporto stai cercando?
          </h1>
          <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto drop-shadow">
            Seleziona il tipo di terapia più adatto alle tue esigenze. Ti guideremo verso i 
            professionisti specializzati nel tuo ambito.
          </p>
        </motion.div>

        {/* Therapy Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {therapyTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white border-opacity-20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${type.gradient} p-8 text-white text-center`}>
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                <p className="text-white text-opacity-90">{type.description}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {type.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  to={`/questionnaire/${type.id}`}
                  className={`w-full bg-gradient-to-r ${type.gradient} text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity font-semibold flex items-center justify-center group`}
                >
                  Seleziona
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white border-opacity-20 p-8 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Continua con il Questionario
            </h3>
            <p className="text-gray-600 mb-6">
              Ogni tipo ha un questionario specifico per garantire il match più accurato
            </p>
            
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">1</div>
                <p className="text-sm text-gray-600">Completa il questionario specializzato</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">2</div>
                <p className="text-sm text-gray-600">Ricevi 3 match personalizzati</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">3</div>
                <p className="text-sm text-gray-600">3 consulenze gratuite per scegliere</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};