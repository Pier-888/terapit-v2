import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, MessageCircle, Calendar, Star, Shield, CheckCircle, FileText, Brain, Target, User, Baby } from 'lucide-react';
import { AnimeBackground } from '../components/animations';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'Questionario Personalizzato',
      description: '15 domande scientifiche per analizzare le tue esigenze specifiche'
    },
    {
      icon: Brain,
      title: '3 Match Selezionati',
      description: 'Il nostro algoritmo trova i terapeuti più compatibili con te'
    },
    {
      icon: MessageCircle,
      title: 'Consulenze Gratuite',
      description: '30 minuti gratis con ogni terapeuta selezionato'
    },
    {
      icon: Shield,
      title: 'Sicuro e Privato',
      description: 'I tuoi dati sono protetti e la privacy garantita'
    }
  ];

  const therapyTypes = [
    {
      id: 'individual',
      title: 'Terapia Individuale',
      description: 'Percorso personalizzato per il tuo benessere emotivo',
      icon: User,
      gradient: 'from-teal-500 to-blue-600'
    },
    {
      id: 'couple',
      title: 'Terapia di Coppia',
      description: 'Migliora la comunicazione e rafforza la relazione',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      id: 'child',
      title: 'Psicologia Infantile',
      description: 'Supporto specializzato per bambini e adolescenti',
      icon: Baby,
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  const testimonials = [
    {
      name: 'Maria R.',
      role: 'Paziente',
      text: 'Il questionario mi ha aiutato a trovare la terapeuta perfetta. Il matching è incredibile!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Dr. Giuseppe M.',
      role: 'Psicologo',
      text: 'Terapit mi permette di incontrare pazienti davvero compatibili con il mio approccio.',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Anna S.',
      role: 'Paziente',
      text: 'Le consulenze gratuite mi hanno dato la sicurezza di scegliere il professionista giusto.',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimeBackground variant="ambient" />
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Trova il <span className="text-teal-600">Match Terapeutico</span><br />
                Perfetto per Te
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Completa il nostro questionario scientifico e ricevi 3 consulenze gratuite con i 
                terapeuti più adatti a te. Nessuna ricerca, nessuna pressione - solo il match perfetto.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/therapy-selection"
                className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <Target className="w-6 h-6 mr-2" />
                Inizia il Questionario
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span>Oltre 500+ psicologi verificati</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span>Consulenza gratuita di 30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span>Privacy e sicurezza garantite</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scegli il Tuo Percorso Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <AnimeBackground variant="leaves" />
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Scegli il Tuo Percorso
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ogni tipo di terapia ha un questionario specifico per garantire il match più accurato
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {therapyTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <Link
                  to={`/questionnaire/${type.id}`}
                  className={`block bg-gradient-to-br ${type.gradient} text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                    <p className="text-white text-opacity-90 mb-6">{type.description}</p>
                    <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                      Inizia il Questionario
                      <Target className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Come Funziona Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <AnimeBackground variant="stream" />
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Come Funziona Terapit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processo semplice e scientifico per trovare il terapeuta giusto per te, senza 
              stress o incertezze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-white bg-opacity-80 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Il Tuo Percorso Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <AnimeBackground variant="ambient" />
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Il Tuo Percorso in 4 Semplici Passi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Scegli il Tipo di Terapia',
                description: 'Seleziona tra terapia individuale, di coppia o psicologia infantile per ricevere un questionario specifico.'
              },
              {
                step: '2',
                title: 'Completa il Questionario',
                description: 'Rispondi alle domande scientifiche per analizzare le tue esigenze e preferenze specifiche.'
              },
              {
                step: '3',
                title: '3 Consulenze Gratuite',
                description: 'Conosci personalmente i tuoi 3 match attraverso consulenze gratuite di 30 minuti ciascuna.'
              },
              {
                step: '4',
                title: 'Scegli e Inizia',
                description: 'Seleziona il terapeuta con cui ti senti più a tuo agio e inizia il tuo percorso di benessere.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <AnimeBackground variant="leaves" />
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Cosa Dicono di Noi
            </h2>
            <p className="text-xl text-gray-600">
              Le esperienze di pazienti e terapeuti che hanno scelto Terapit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perché utilizzare Terapit Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Il Problema che Risolviamo
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-4xl mx-auto"
            >
              La maggioranza dei pazienti non trova il terapeuta giusto al primo tentativo, 
              portando a tassi elevati di abbandono precoce
            </motion.p>
          </div>

          {/* Problem Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Abbandono Precoce */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#fee2e2"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray="34.8, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">34.8%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">34,8%</h3>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Abbandono Precoce</h4>
              <p className="text-sm text-gray-600 mb-4">
                Basato su una meta-analisi di 146 studi occidentali
              </p>
              <div className="bg-white rounded-lg p-3 border border-red-200">
                <p className="text-xs text-gray-700">
                  La maggioranza abbandona dopo 2 sedute
                </p>
              </div>
            </motion.div>

            {/* Maggioranza Dopo Una Seduta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-2">Maggioranza</h3>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Dopo Una Seduta</h4>
              <p className="text-sm text-gray-600 mb-4">
                Interrompe il percorso dopo una sola seduta
              </p>
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <p className="text-xs text-gray-700">
                  Spesso a causa di incompatibilità con il terapeuta
                </p>
              </div>
            </motion.div>

            {/* 3 Terapeuti */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">3 Terapeuti</h3>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Ricerca dei Match</h4>
              <p className="text-sm text-gray-600 mb-4">
                In media servono 3 tentativi per trovare il terapeuta giusto
              </p>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-gray-700">
                  Tempo e costi spesso proibitivi
                </p>
              </div>
            </motion.div>
          </div>

          {/* Platform Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Quanti Terapeuti Servono per Trovare il Match Giusto?
            </h3>
            <p className="text-gray-600 text-center mb-8">
              Dati da piattaforme di terapia online maggiormente utilizzate negli USA
            </p>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Piattaforma</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">1 Terapeuta</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">2 Terapeuti</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">3+ Terapeuti</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: 'BetterHelp', first: '57%', second: '28%', third: '15%' },
                      { name: 'MDLive', first: '57%', second: '32%', third: '11%' },
                      { name: 'Doctor on Demand', first: '53%', second: '37%', third: '10%' },
                      { name: 'Talkspace', first: '39%', second: '50%', third: '11%' }
                    ].map((platform, index) => (
                      <tr key={platform.name} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{platform.name}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {platform.first}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {platform.second}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            {platform.third}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-yellow-50 border-t border-yellow-200 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-yellow-800 text-xs font-bold">!</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Dato Allarmante:</strong> Solo una minoranza trova subito il terapeuta giusto. 
                      La maggioranza deve provare più professionisti, con costi e tempi aggiuntivi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Single Session Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-16 text-center border border-blue-200"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Il Fenomeno della "Seduta Singola"
            </h3>
            <div className="text-5xl font-bold text-blue-600 mb-4">26%</div>
            <p className="text-lg text-blue-800 mb-4">
              dei pazienti completa il percorso dopo una sola seduta, dichiarando di aver ottenuto i benefici 
              desiderati
            </p>
            <p className="text-sm text-blue-700 italic">
              Studio regionale del Lazio - Dati di follow-up
            </p>
            <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-700">
                Questo dimostra l'importanza cruciale del <strong>match iniziale</strong> tra paziente e terapeuta. 
                Quando il match è giusto, anche una sola seduta può essere trasformativa.
              </p>
            </div>
          </motion.div>

          {/* Key Models */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              La Soluzione Terapit
            </h3>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Combiniamo la scienza e l'esperienza. Il nostro 3-match scientificamente validato è 
              3 consulenze gratuite per scegliere senza pressioni
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Match Scientifico */}
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-8 text-white text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4">Match Scientifico</h4>
                <div className="text-3xl font-bold mb-2">3 Match</div>
                <p className="text-teal-100 mb-4">
                  Algoritmo basato su ricerca scientifica per trovare i terapeuti più compatibili
                </p>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm">Questionario validato scientificamente</p>
                </div>
              </div>

              {/* Consulenze Gratuite */}
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-white text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4">3 Consulenze Gratuite</h4>
                <div className="text-3xl font-bold mb-2">30 min</div>
                <p className="text-green-100 mb-4">
                  Conosci personalmente ogni terapeuta senza impegno economico
                </p>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm">Nessuna pressione, scegli con calma</p>
                </div>
              </div>

              {/* Successo Garantito */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4">Successo Garantito</h4>
                <div className="text-3xl font-bold mb-2">94%</div>
                <p className="text-purple-100 mb-4">
                  dei nostri clienti trova il terapeuta giusto al primo o secondo match
                </p>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm">Tasso di successo verificato</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Success Rate Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-center text-white"
          >
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Il Nostro Tasso di Successo</h3>
            <div className="text-6xl font-bold mb-4">94%</div>
            <p className="text-xl text-green-100 mb-6">
              dei nostri clienti trova il terapeuta giusto al primo o secondo 3 consulenze gratuite
            </p>
            <Link
              to="/therapy-selection"
              className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Target className="w-6 h-6 mr-2" />
              Inizia il Tuo Match Scientifico
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <AnimeBackground variant="all" />
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-teal-600 to-blue-600 p-12 rounded-2xl text-white shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto a Trovare il Tuo Match Perfetto?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Inizia con il questionario gratuito e ricevi 3 consulenze gratuite con i terapeuti più adatti a te
            </p>
            <Link
              to="/therapy-selection"
              className="bg-white text-teal-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Target className="w-6 h-6 inline mr-2" />
              Inizia il Questionario
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};