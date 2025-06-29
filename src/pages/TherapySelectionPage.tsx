import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Heart, Baby, Target, ChevronRight, Check } from 'lucide-react';

export const TherapySelectionPage: React.FC = () => {
  const [selectedTherapy, setSelectedTherapy] = useState<string>('');
  const navigate = useNavigate();

  const therapyTypes = [
    {
      id: 'individual',
      title: 'Terapia Individuale',
      description: 'Supporto personalizzato per il tuo benessere mentale e crescita personale',
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
      description: 'Migliora la comunicazione e rafforza il legame con il tuo partner',
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
      description: 'Supporto specializzato per bambini e consulenza genitoriale',
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

  const handleCardClick = (therapyId: string) => {
    setSelectedTherapy(therapyId);
  };

  const handleContinue = () => {
    if (selectedTherapy) {
      navigate(`/questionnaire/${selectedTherapy}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Che tipo di supporto stai cercando?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                selectedTherapy === type.id
                  ? 'border-teal-500 ring-4 ring-teal-200 shadow-2xl scale-105'
                  : 'border-gray-100 hover:border-teal-300'
              }`}
              onClick={() => handleCardClick(type.id)}
            >
              {/* Selection Indicator */}
              {selectedTherapy === type.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}

              <div className={`bg-gradient-to-br ${type.gradient} p-8 text-white text-center relative`}>
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
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        selectedTherapy === type.id ? 'bg-teal-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-all ${
                  selectedTherapy === type.id
                    ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {selectedTherapy === type.id ? 'Selezionato' : 'Seleziona'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedTherapy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <button
              onClick={handleContinue}
              className="bg-teal-600 text-white py-4 px-8 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Continua con il Questionario
              <ChevronRight className="w-6 h-6 ml-2" />
            </button>
            <p className="text-gray-600 mt-3">
              Procederai con il questionario per{' '}
              <span className="font-semibold text-teal-600">
                {therapyTypes.find(t => t.id === selectedTherapy)?.title}
              </span>
            </p>
          </motion.div>
        )}

        {/* Bottom Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Come Funziona il Processo
            </h3>
            <p className="text-gray-600 mb-6">
              Ogni tipo di terapia ha un questionario specifico per garantire il match più accurato con i professionisti
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

        {/* Selection Hint */}
        {!selectedTherapy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-500 text-sm">
              👆 Clicca su una delle card sopra per selezionare il tipo di terapia
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};