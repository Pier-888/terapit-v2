import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, MessageCircle, Calendar, Star, Shield, CheckCircle, FileText, Brain, Target, User, Baby } from 'lucide-react';

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
      {/* Hero Section - Sunset Mountain */}
      <section className="relative anime-bg-hero py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Cherry Petals */}
        <div className="cherry-petals">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="cherry-petal"></div>
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trova il <span className="text-yellow-200">Match Terapeutico</span><br />
                Perfetto per Te
              </h1>
              <p className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto drop-shadow">
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
                className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <Target className="w-6 h-6 mr-2" />
                Inizia il Questionario
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-white text-opacity-80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-yellow-200" />
                <span>Oltre 500+ psicologi verificati</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-yellow-200" />
                <span>Consulenza gratuita di 30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-yellow-200" />
                <span>Privacy e sicurezza garantite</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scegli il Tuo Percorso Section - Aurora Forest */}
      <section className="anime-bg-selection py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Scegli il Tuo Percorso
            </h2>
            <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto drop-shadow">
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
                  className={`block bg-gradient-to-br ${type.gradient} text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm bg-opacity-90`}
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

      {/* Come Funziona Section - Misty Mountains */}
      <section className="anime-bg-features py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Come Funziona Terapit
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
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
                className="text-center bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Il Tuo Percorso Section - Cherry Blossom */}
      <section className="anime-bg-process py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
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
                className="text-center bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Night Sky */}
      <section className="anime-bg-testimonials py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Cosa Dicono di Noi
            </h2>
            <p className="text-xl text-white text-opacity-90 drop-shadow">
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

      {/* CTA Section - Sunset Ocean */}
      <section className="anime-bg-cta py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Pronto a Trovare il Tuo Match Perfetto?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8 drop-shadow">
              Inizia con il questionario gratuito e ricevi 3 consulenze gratuite con i terapeuti più adatti a te
            </p>
            <Link
              to="/therapy-selection"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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