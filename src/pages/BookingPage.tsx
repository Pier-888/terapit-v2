import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Users, Phone, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  type: 'free-consultation' | 'regular-session';
  format: 'in-person' | 'online' | 'phone';
}

const therapists = [
  {
    id: '1',
    name: 'Dr.ssa Maria Rossi',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Psicologa Clinica'
  },
  {
    id: '2',
    name: 'Dr. Giuseppe Bianchi',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Psicoterapeuta'
  },
  {
    id: '3',
    name: 'Dr.ssa Anna Verde',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Psicologa dell\'Età Evolutiva'
  }
];

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:30', available: false },
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: false },
  { time: '11:30', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: false },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: false },
  { time: '17:00', available: true },
  { time: '17:30', available: true }
];

export const BookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<'free-consultation' | 'regular-session'>('free-consultation');
  const [sessionFormat, setSessionFormat] = useState<'in-person' | 'online' | 'phone'>('online');
  const [notes, setNotes] = useState<string>('');
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const steps = [
    { number: 1, title: 'Seleziona Terapeuta', description: 'Scegli il professionista' },
    { number: 2, title: 'Data e Ora', description: 'Seleziona quando' },
    { number: 3, title: 'Dettagli', description: 'Tipo di sessione' },
    { number: 4, title: 'Conferma', description: 'Rivedi e conferma' }
  ];

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete booking
      setIsBookingComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedTherapist !== '';
      case 2:
        return selectedTime !== '';
      case 3:
        return sessionFormat !== '';
      case 4:
        return true;
      default:
        return false;
    }
  };

  const selectedTherapistData = therapists.find(t => t.id === selectedTherapist);

  if (isBookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prenotazione Confermata!
          </h2>
          <p className="text-gray-600 mb-6">
            La tua {sessionType === 'free-consultation' ? 'consulenza gratuita' : 'sessione'} con{' '}
            {selectedTherapistData?.name} è stata prenotata per{' '}
            {selectedDate.toLocaleDateString('it-IT')} alle {selectedTime}.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Vai alla Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/messages'}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Invia un Messaggio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-teal-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-6 ${
                    currentStep > step.number ? 'bg-teal-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Step 1: Select Therapist */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Seleziona il Terapeuta</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {therapists.map((therapist) => (
                  <button
                    key={therapist.id}
                    onClick={() => setSelectedTherapist(therapist.id)}
                    className={`p-6 border-2 rounded-xl transition-all ${
                      selectedTherapist === therapist.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                    }`}
                  >
                    <img
                      src={therapist.avatar}
                      alt={therapist.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">{therapist.name}</h3>
                    <p className="text-sm text-gray-600">{therapist.specialization}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date and Time */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Seleziona Data e Ora</h2>
              
              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scegli una data</h3>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 text-center rounded-lg transition-colors ${
                        selectedDate.toDateString() === date.toDateString()
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {date.toLocaleDateString('it-IT', { weekday: 'short' })}
                      </div>
                      <div className="font-semibold">
                        {date.getDate()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scegli un orario</h3>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 text-center rounded-lg transition-colors ${
                        selectedTime === slot.time
                          ? 'bg-teal-600 text-white'
                          : slot.available
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Session Details */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dettagli della Sessione</h2>
              
              {/* Session Type */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo di sessione</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSessionType('free-consultation')}
                    className={`p-6 border-2 rounded-xl transition-all text-left ${
                      sessionType === 'free-consultation'
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">Consulenza Gratuita</h4>
                    <p className="text-sm text-gray-600 mb-2">30 minuti - Gratuito</p>
                    <p className="text-xs text-gray-500">
                      Prima sessione conoscitiva per valutare la compatibilità
                    </p>
                  </button>
                  <button
                    onClick={() => setSessionType('regular-session')}
                    className={`p-6 border-2 rounded-xl transition-all text-left ${
                      sessionType === 'regular-session'
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">Sessione Regolare</h4>
                    <p className="text-sm text-gray-600 mb-2">50 minuti - €80</p>
                    <p className="text-xs text-gray-500">
                      Sessione di terapia completa
                    </p>
                  </button>
                </div>
              </div>

              {/* Session Format */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Modalità</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setSessionFormat('online')}
                    className={`p-6 border-2 rounded-xl transition-all text-center ${
                      sessionFormat === 'online'
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <Video className="w-8 h-8 mx-auto mb-3 text-teal-600" />
                    <h4 className="font-semibold text-gray-900 mb-1">Online</h4>
                    <p className="text-xs text-gray-500">Videochiamata sicura</p>
                  </button>
                  <button
                    onClick={() => setSessionFormat('in-person')}
                    className={`p-6 border-2 rounded-xl transition-all text-center ${
                      sessionFormat === 'in-person'
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <Users className="w-8 h-8 mx-auto mb-3 text-teal-600" />
                    <h4 className="font-semibold text-gray-900 mb-1">Di Persona</h4>
                    <p className="text-xs text-gray-500">Nello studio del terapeuta</p>
                  </button>
                  <button
                    onClick={() => setSessionFormat('phone')}
                    className={`p-6 border-2 rounded-xl transition-all text-center ${
                      sessionFormat === 'phone'
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <Phone className="w-8 h-8 mx-auto mb-3 text-teal-600" />
                    <h4 className="font-semibold text-gray-900 mb-1">Telefonica</h4>
                    <p className="text-xs text-gray-500">Chiamata telefonica</p>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Note aggiuntive (opzionale)</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Aggiungi eventuali note o richieste specifiche per il terapeuta..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Conferma Prenotazione</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Riepilogo</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Terapeuta:</span>
                    <span className="font-medium text-gray-900">{selectedTherapistData?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Data:</span>
                    <span className="font-medium text-gray-900">
                      {selectedDate.toLocaleDateString('it-IT', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Orario:</span>
                    <span className="font-medium text-gray-900">{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium text-gray-900">
                      {sessionType === 'free-consultation' ? 'Consulenza Gratuita (30 min)' : 'Sessione Regolare (50 min)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Modalità:</span>
                    <span className="font-medium text-gray-900">
                      {sessionFormat === 'online' ? 'Online' : sessionFormat === 'in-person' ? 'Di Persona' : 'Telefonica'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-lg font-semibold text-gray-900">Costo:</span>
                    <span className="text-lg font-bold text-teal-600">
                      {sessionType === 'free-consultation' ? 'Gratuito' : '€80'}
                    </span>
                  </div>
                </div>
              </div>

              {notes && (
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Note:</h4>
                  <p className="text-gray-700">{notes}</p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Riceverai una email di conferma con i dettagli dell'appuntamento 
                  e le istruzioni per accedere alla sessione.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Indietro
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {currentStep === 4 ? 'Conferma Prenotazione' : 'Avanti'}
              {currentStep !== 4 && <ChevronRight className="w-5 h-5 ml-1" />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};