import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Heart, Users, Star } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale' | 'text' | 'emotion-scale';
  options?: string[];
  required: boolean;
  category?: string;
  therapyType: 'individual' | 'couple' | 'child';
}

// Questionario Terapia Individuale (esistente)
const individualQuestions: Question[] = [
  {
    id: 'main_difficulties',
    question: 'Quali sono le principali difficoltà o sofferenze che stai vivendo in questo momento?',
    type: 'text',
    required: true,
    category: 'Stato emotivo',
    therapyType: 'individual'
  },
  {
    id: 'emotional_state',
    question: 'In che misura ti senti ansioso, triste, stressato o sopraffatto nella tua quotidianità?',
    type: 'emotion-scale',
    required: true,
    category: 'Stato emotivo',
    therapyType: 'individual'
  },
  {
    id: 'previous_diagnosis',
    question: 'Hai mai ricevuto una diagnosi psicologica o psichiatrica in passato?',
    type: 'single',
    options: [
      'No, mai',
      'Sì, disturbi d\'ansia',
      'Sì, disturbi dell\'umore (depressione, bipolare)',
      'Sì, disturbi di personalità',
      'Sì, disturbi alimentari',
      'Sì, altro (specificare nei commenti finali)'
    ],
    required: true,
    category: 'Stato emotivo',
    therapyType: 'individual'
  },
  {
    id: 'communication_style',
    question: 'Ti senti più a tuo agio a parlare con persone dirette o con chi usa uno stile più empatico e riflessivo?',
    type: 'single',
    options: [
      'Preferisco uno stile diretto e pratico',
      'Preferisco uno stile empatico e riflessivo',
      'Nessuna preferenza particolare'
    ],
    required: true,
    category: 'Relazioni',
    therapyType: 'individual'
  },
  {
    id: 'thinking_style',
    question: 'Tendi a esplorare i tuoi pensieri parlando o preferisci prima riflettere da solo?',
    type: 'single',
    options: [
      'Preferisco parlare per elaborare i pensieri (estroverso)',
      'Preferisco riflettere prima da solo (introverso)',
      'Dipende dalla situazione (misto)'
    ],
    required: true,
    category: 'Relazioni',
    therapyType: 'individual'
  },
  {
    id: 'therapy_experience',
    question: 'Hai già fatto psicoterapia in passato?',
    type: 'single',
    options: [
      'No, è la prima volta',
      'Sì, terapia cognitivo-comportamentale (CBT)',
      'Sì, terapia psicodinamica/psicoanalitica',
      'Sì, terapia sistemico-familiare',
      'Sì, terapia umanistica',
      'Sì, EMDR',
      'Sì, altro approccio'
    ],
    required: true,
    category: 'Preferenze terapeutiche',
    therapyType: 'individual'
  },
  {
    id: 'therapist_gender',
    question: 'Ti senti più a tuo agio con uno psicologo uomo o donna, o non hai preferenze?',
    type: 'single',
    options: [
      'Preferisco un terapeuta uomo',
      'Preferisco una terapeuta donna',
      'Non ho preferenze di genere'
    ],
    required: false,
    category: 'Preferenze terapeutiche',
    therapyType: 'individual'
  },
  {
    id: 'therapy_approach',
    question: 'Preferiresti un terapeuta che ti dia strumenti pratici o uno che lavori più in profondità sulla tua storia e inconscio?',
    type: 'single',
    options: [
      'Preferisco strumenti pratici e concreti',
      'Preferisco lavorare in profondità sulla mia storia',
      'Entrambi gli approcci mi interessano'
    ],
    required: true,
    category: 'Preferenze terapeutiche',
    therapyType: 'individual'
  },
  {
    id: 'specialist_competencies',
    question: 'Quanto è importante per te che lo psicologo abbia competenze specifiche in ambito neuroscientifico, medico o spirituale?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5'],
    required: true,
    category: 'Preferenze terapeutiche',
    therapyType: 'individual'
  },
  {
    id: 'therapy_goals',
    question: 'Cosa speri di ottenere dalla psicoterapia?',
    type: 'multiple',
    options: [
      'Superare un blocco emotivo specifico',
      'Capire meglio me stesso/a',
      'Migliorare le mie relazioni',
      'Sviluppare resilienza e gestire lo stress',
      'Elaborare un trauma o evento difficile',
      'Migliorare l\'autostima',
      'Gestire ansia o attacchi di panico',
      'Superare una depressione',
      'Altro'
    ],
    required: true,
    category: 'Obiettivi',
    therapyType: 'individual'
  },
  {
    id: 'commitment_level',
    question: 'Quanto sei disposto/a a metterti in gioco nel percorso terapeutico?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
    category: 'Obiettivi',
    therapyType: 'individual'
  },
  {
    id: 'life_areas',
    question: 'In quali aree della tua vita senti maggiore bisogno di supporto?',
    type: 'multiple',
    options: [
      'Area emotiva e gestione delle emozioni',
      'Area lavorativa e professionale',
      'Relazioni sentimentali',
      'Relazioni familiari',
      'Relazioni sociali e amicizie',
      'Autostima e fiducia in se stessi',
      'Gestione dello stress',
      'Altro'
    ],
    required: true,
    category: 'Obiettivi',
    therapyType: 'individual'
  },
  {
    id: 'time_availability',
    question: 'Quante ore puoi realisticamente dedicare alla terapia ogni settimana?',
    type: 'single',
    options: [
      '1 ora a settimana',
      '1-2 ore a settimana',
      '2-3 ore a settimana',
      'Più di 3 ore a settimana',
      'Flessibile in base alle necessità'
    ],
    required: true,
    category: 'Contesto',
    therapyType: 'individual'
  },
  {
    id: 'life_changes',
    question: 'Ti trovi in una fase di cambiamento significativo?',
    type: 'single',
    options: [
      'No, la mia vita è relativamente stabile',
      'Sì, lutto o perdita importante',
      'Sì, separazione o divorzio',
      'Sì, trasferimento o cambio città',
      'Sì, cambio lavoro o situazione professionale',
      'Sì, problemi di salute',
      'Sì, altro cambiamento importante'
    ],
    required: true,
    category: 'Contesto',
    therapyType: 'individual'
  },
  {
    id: 'session_format',
    question: 'Quali modalità ti renderebbero più comodo iniziare il percorso?',
    type: 'multiple',
    options: [
      'Sessioni in presenza (studio del terapeuta)',
      'Sessioni online (videochiamata)',
      'Sessioni telefoniche',
      'Modalità mista (in presenza + online)'
    ],
    required: true,
    category: 'Contesto',
    therapyType: 'individual'
  }
];

// Questionario Terapia di Coppia
const coupleQuestions: Question[] = [
  {
    id: 'relationship_status',
    question: 'Qual è attualmente lo stato della vostra relazione?',
    type: 'single',
    options: [
      'Stabile',
      'In crisi',
      'In transizione',
      'Separati ma in contatto'
    ],
    required: true,
    category: 'Dinamica relazionale',
    therapyType: 'couple'
  },
  {
    id: 'partner_participation',
    question: 'Entrambi i partner sono disposti a partecipare alla terapia?',
    type: 'single',
    options: [
      'Sì, entrambi siamo motivati',
      'No, solo io sono interessato/a',
      'Non ancora certo, ma speriamo di sì'
    ],
    required: true,
    category: 'Dinamica relazionale',
    therapyType: 'couple'
  },
  {
    id: 'main_problems',
    question: 'Quali sono i principali problemi che vorreste affrontare?',
    type: 'multiple',
    options: [
      'Comunicazione',
      'Fiducia',
      'Sessualità',
      'Gestione della famiglia',
      'Conflitti frequenti',
      'Distanza emotiva',
      'Problemi economici',
      'Interferenze familiari',
      'Altro'
    ],
    required: true,
    category: 'Obiettivi condivisi',
    therapyType: 'couple'
  },
  {
    id: 'conflict_style',
    question: 'Come affrontate solitamente un conflitto?',
    type: 'single',
    options: [
      'Evitamento - preferiamo non affrontare i problemi',
      'Discussione accesa - tendiamo ad alzare la voce',
      'Dialogo costruttivo - cerchiamo di parlarne',
      'Silenzio prolungato - uno o entrambi si chiudono'
    ],
    required: true,
    category: 'Comunicazione e conflitto',
    therapyType: 'couple'
  },
  {
    id: 'relationship_importance',
    question: 'Quanto è importante per voi mantenere la relazione?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
    category: 'Obiettivi condivisi',
    therapyType: 'couple'
  },
  {
    id: 'shared_responsibilities',
    question: 'Avete figli o responsabilità condivise?',
    type: 'single',
    options: [
      'No, nessuna responsabilità condivisa',
      'Sì, figli piccoli (0-6 anni)',
      'Sì, figli in età scolare (7-12 anni)',
      'Sì, adolescenti (13-18 anni)',
      'Sì, figli adulti',
      'Sì, altre responsabilità (casa, genitori anziani, etc.)'
    ],
    required: true,
    category: 'Dinamica relazionale',
    therapyType: 'couple'
  },
  {
    id: 'serious_issues',
    question: 'Ci sono episodi di infedeltà, violenza verbale/fisica o dipendenze?',
    type: 'single',
    options: [
      'No, nessuno di questi problemi',
      'Sì, episodi di infedeltà',
      'Sì, violenza verbale',
      'Sì, violenza fisica',
      'Sì, problemi di dipendenza',
      'Preferisco non dire'
    ],
    required: true,
    category: 'Dinamica relazionale',
    therapyType: 'couple'
  },
  {
    id: 'feeling_heard',
    question: 'Vi sentite ascoltati dall\'altro partner?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
    category: 'Comunicazione e conflitto',
    therapyType: 'couple'
  },
  {
    id: 'communication_style_couple',
    question: 'Qual è il vostro stile comunicativo predominante?',
    type: 'single',
    options: [
      'Assertivo - esprimiamo chiaramente i nostri bisogni',
      'Passivo - tendiamo a evitare i conflitti',
      'Aggressivo - spesso discutiamo animatamente',
      'Ironico - usiamo spesso sarcasmo o ironia'
    ],
    required: true,
    category: 'Comunicazione e conflitto',
    therapyType: 'couple'
  },
  {
    id: 'previous_couple_therapy',
    question: 'Avete già fatto terapia di coppia in passato?',
    type: 'single',
    options: [
      'No, è la prima volta',
      'Sì, terapia sistemico-familiare',
      'Sì, terapia cognitivo-comportamentale',
      'Sì, mediazione familiare',
      'Sì, consulenza matrimoniale religiosa',
      'Sì, altro tipo di terapia'
    ],
    required: true,
    category: 'Preferenze terapeutiche',
    therapyType: 'couple'
  },
  {
    id: 'therapist_style_preference',
    question: 'Preferite un terapeuta che sia più diretto o più contenitivo?',
    type: 'single',
    options: [
      'Diretto - che ci dia feedback chiari e consigli pratici',
      'Empatico - che ci ascolti e ci contenga emotivamente',
      'Neutro - che mantenga un approccio equilibrato'
    ],
    required: true,
    category: 'Preferenze terapeutiche',
    therapyType: 'couple'
  },
  {
    id: 'therapy_expectations',
    question: 'Cosa sperate di ottenere dalla terapia?',
    type: 'multiple',
    options: [
      'Prendere una decisione sul futuro della relazione',
      'Riavvicinamento emotivo',
      'Migliorare la comunicazione',
      'Gestire meglio i conflitti',
      'Ritrovare l\'intimità',
      'Imparare a perdonare',
      'Definire nuovi accordi nella coppia',
      'Altro'
    ],
    required: true,
    category: 'Obiettivi condivisi',
    therapyType: 'couple'
  },
  {
    id: 'cultural_aspects',
    question: 'Che importanza date agli aspetti culturali, religiosi o spirituali del vostro percorso?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5'],
    required: true,
    category: 'Stile emotivo e valori',
    therapyType: 'couple'
  },
  {
    id: 'therapist_gender_couple',
    question: 'Avete preferenze rispetto al genere del terapeuta?',
    type: 'single',
    options: [
      'Preferisco una terapeuta donna',
      'Preferisco un terapeuta uomo',
      'Nessuna preferenza'
    ],
    required: false,
    category: 'Preferenze terapeutiche',
    therapyType: 'couple'
  },
  {
    id: 'therapy_duration',
    question: 'Che tipo di percorso immaginate?',
    type: 'single',
    options: [
      'Breve e orientato alla soluzione (poche sessioni)',
      'Approfondito e a lungo termine',
      'Non so, dipende da come va'
    ],
    required: true,
    category: 'Preferenze logistiche',
    therapyType: 'couple'
  }
];

// Questionario Psicologia Infantile
const childQuestions: Question[] = [
  {
    id: 'child_age_gender',
    question: 'Qual è l\'età e il sesso del bambino/a?',
    type: 'text',
    required: true,
    category: 'Sviluppo del bambino',
    therapyType: 'child'
  },
  {
    id: 'support_reason',
    question: 'Perché stai cercando un supporto psicologico in questo momento?',
    type: 'text',
    required: true,
    category: 'Obiettivi genitoriali',
    therapyType: 'child'
  },
  {
    id: 'behavioral_changes',
    question: 'Hai notato cambiamenti nel comportamento, nel sonno o nel rendimento scolastico?',
    type: 'single',
    options: [
      'No, nessun cambiamento significativo',
      'Sì, cambiamenti nel comportamento',
      'Sì, problemi di sonno',
      'Sì, calo del rendimento scolastico',
      'Sì, tutti i precedenti',
      'Sì, altro (specificare nei commenti)'
    ],
    required: true,
    category: 'Comportamenti osservati',
    therapyType: 'child'
  },
  {
    id: 'previous_diagnosis_child',
    question: 'Il bambino ha ricevuto diagnosi precedenti (DSA, ADHD, spettro autistico...)?',
    type: 'single',
    options: [
      'No, nessuna diagnosi',
      'Sì, Disturbi Specifici dell\'Apprendimento (DSA)',
      'Sì, ADHD (Disturbo dell\'Attenzione e Iperattività)',
      'Sì, Disturbi dello Spettro Autistico',
      'Sì, Disturbi dell\'Umore',
      'Sì, Disturbi d\'Ansia',
      'Sì, altro (specificare nei commenti)'
    ],
    required: true,
    category: 'Sviluppo del bambino',
    therapyType: 'child'
  },
  {
    id: 'child_temperament',
    question: 'Come descriveresti il suo temperamento?',
    type: 'multiple',
    options: [
      'Calmo e tranquillo',
      'Irascibile e facilmente frustrato',
      'Timido e riservato',
      'Estroverso e socievole',
      'Ansioso e preoccupato',
      'Impulsivo',
      'Sensibile',
      'Altro'
    ],
    required: true,
    category: 'Sviluppo del bambino',
    therapyType: 'child'
  },
  {
    id: 'stressful_events',
    question: 'Ci sono eventi stressanti recenti nella vita del bambino?',
    type: 'multiple',
    options: [
      'No, nessun evento particolare',
      'Separazione o divorzio dei genitori',
      'Lutto in famiglia',
      'Trasloco o cambio scuola',
      'Nascita di un fratellino/sorellina',
      'Bullismo o problemi con i compagni',
      'Malattia in famiglia',
      'Altro evento stressante'
    ],
    required: true,
    category: 'Relazioni familiari e scolastiche',
    therapyType: 'child'
  },
  {
    id: 'peer_relationships',
    question: 'Come si comporta con i coetanei?',
    type: 'single',
    options: [
      'Ben integrato, ha buoni rapporti',
      'Ha qualche difficoltà ma se la cava',
      'Ha molte difficoltà nelle relazioni',
      'Tende a evitare i coetanei',
      'Non so, non ho abbastanza informazioni'
    ],
    required: true,
    category: 'Relazioni familiari e scolastiche',
    therapyType: 'child'
  },
  {
    id: 'previous_therapy_child',
    question: 'Il bambino ha già fatto terapia in passato?',
    type: 'single',
    options: [
      'No, è la prima volta',
      'Sì, psicoterapia individuale',
      'Sì, terapia familiare',
      'Sì, logopedia',
      'Sì, psicomotricità',
      'Sì, neuropsichiatria infantile',
      'Sì, altro tipo di supporto'
    ],
    required: true,
    category: 'Sviluppo del bambino',
    therapyType: 'child'
  },
  {
    id: 'school_involvement',
    question: 'C\'è un coinvolgimento della scuola o richieste da parte degli insegnanti?',
    type: 'single',
    options: [
      'No, nessun coinvolgimento della scuola',
      'Sì, gli insegnanti hanno segnalato delle difficoltà',
      'Sì, è in corso una valutazione scolastica',
      'Sì, abbiamo già un PDP/PEI attivo',
      'Non applicabile (bambino non in età scolare)'
    ],
    required: true,
    category: 'Relazioni familiari e scolastiche',
    therapyType: 'child'
  },
  {
    id: 'consultation_goals',
    question: 'Cosa speri di ottenere dalla consulenza psicologica?',
    type: 'multiple',
    options: [
      'Strumenti educativi per gestire meglio mio figlio',
      'Valutazione delle capacità cognitive',
      'Supporto emotivo per il bambino',
      'Miglioramento del comportamento',
      'Aiuto per l\'autostima',
      'Gestione dell\'ansia o delle paure',
      'Supporto per difficoltà scolastiche',
      'Altro'
    ],
    required: true,
    category: 'Obiettivi genitoriali',
    therapyType: 'child'
  },
  {
    id: 'therapist_preferences_child',
    question: 'Hai preferenze rispetto al genere o approccio del terapeuta?',
    type: 'single',
    options: [
      'Preferisco una terapeuta donna',
      'Preferisco un terapeuta uomo',
      'Nessuna preferenza di genere',
      'Importante che sia specializzato in età evolutiva',
      'Importante che usi tecniche ludiche'
    ],
    required: false,
    category: 'Aspetti logistici e preferenze',
    therapyType: 'child'
  },
  {
    id: 'therapy_format_child',
    question: 'Preferisci un percorso solo genitoriale, con il bambino, o misto?',
    type: 'single',
    options: [
      'Solo incontri con i genitori',
      'Solo terapia con il bambino',
      'Percorso misto (genitori + bambino)',
      'Non so, lasciamo decidere al professionista'
    ],
    required: true,
    category: 'Aspetti logistici e preferenze',
    therapyType: 'child'
  },
  {
    id: 'emotional_expression',
    question: 'Il bambino ha difficoltà nell\'esprimere emozioni o pensieri?',
    type: 'single',
    options: [
      'No, si esprime bene',
      'Sì, ha molte difficoltà',
      'A volte, dipende dalla situazione',
      'Non so valutare'
    ],
    required: true,
    category: 'Comportamenti osservati',
    therapyType: 'child'
  },
  {
    id: 'session_modality_child',
    question: 'Con quali modalità ti senti più comodo a iniziare il percorso?',
    type: 'single',
    options: [
      'In presenza (studio del terapeuta)',
      'Online (per consulenze genitoriali)',
      'Modalità mista',
      'Dipende dalle raccomandazioni del professionista'
    ],
    required: true,
    category: 'Aspetti logistici e preferenze',
    therapyType: 'child'
  },
  {
    id: 'schedule_compatibility',
    question: 'Quali orari sarebbero più compatibili con la vostra routine familiare?',
    type: 'single',
    options: [
      'Mattina (prima della scuola)',
      'Pomeriggio (dopo la scuola)',
      'Sera (dopo cena)',
      'Weekend',
      'Flessibile, ci adattiamo'
    ],
    required: true,
    category: 'Aspetti logistici e preferenze',
    therapyType: 'child'
  }
];

const therapyTypeInfo = {
  individual: {
    title: 'Terapia Individuale',
    icon: Users,
    color: 'from-teal-500 to-blue-600'
  },
  couple: {
    title: 'Terapia di Coppia',
    icon: Heart,
    color: 'from-pink-500 to-rose-600'
  },
  child: {
    title: 'Psicologia Infantile',
    icon: Star,
    color: 'from-purple-500 to-indigo-600'
  }
};

export const QuestionnaireePage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | Record<string, number>>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  // Validate therapy type
  useEffect(() => {
    if (!type || !['individual', 'couple', 'child'].includes(type)) {
      navigate('/');
    }
  }, [type, navigate]);

  // Get questions based on therapy type
  const getQuestions = () => {
    switch (type) {
      case 'individual':
        return individualQuestions;
      case 'couple':
        return coupleQuestions;
      case 'child':
        return childQuestions;
      default:
        return [];
    }
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const therapyInfo = therapyTypeInfo[type as keyof typeof therapyTypeInfo];

  const handleAnswer = (questionId: string, answer: string | string[] | Record<string, number>) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleEmotionScaleAnswer = (emotions: Record<string, number>) => {
    handleAnswer('emotional_state', emotions);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      // Simulate processing time
      setTimeout(() => {
        navigate('/matching');
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    
    const answer = answers[currentQuestion.id];
    if (!currentQuestion.required) return true;
    
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    if (currentQuestion.type === 'emotion-scale') {
      return answer && typeof answer === 'object' && Object.keys(answer).length > 0;
    }
    return Boolean(answer);
  };

  if (!type || !therapyInfo) {
    return null;
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questionario Completato!
          </h2>
          <p className="text-gray-600 mb-6">
            Stiamo elaborando le tue risposte per {therapyInfo.title.toLowerCase()} e trovando i 3 terapeuti più compatibili con te...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
              className="bg-teal-600 h-2 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              {therapyInfo.title} - Domanda {currentStep + 1} di {questions.length}
            </span>
            <span className="text-sm font-medium text-teal-600">
              {Math.round(progress)}% completato
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="bg-teal-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Content Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {currentQuestion && (
            <div>
              {currentQuestion.category && (
                <div className="mb-4">
                  <span className="inline-block bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
                    {currentQuestion.category}
                  </span>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {/* Single Choice */}
                {currentQuestion.type === 'single' && (
                  <>
                    {currentQuestion.options?.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-teal-300 hover:bg-teal-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                          className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                        />
                        <span className="ml-3 text-gray-900">{option}</span>
                      </label>
                    ))}
                  </>
                )}

                {/* Multiple Choice */}
                {currentQuestion.type === 'multiple' && (
                  <>
                    {currentQuestion.options?.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-teal-300 hover:bg-teal-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={Array.isArray(answers[currentQuestion.id]) && 
                                   (answers[currentQuestion.id] as string[]).includes(option)}
                          onChange={(e) => {
                            const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
                            if (e.target.checked) {
                              handleAnswer(currentQuestion.id, [...currentAnswers, option]);
                            } else {
                              handleAnswer(currentQuestion.id, currentAnswers.filter(a => a !== option));
                            }
                          }}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="ml-3 text-gray-900">{option}</span>
                      </label>
                    ))}
                  </>
                )}

                {/* Scale */}
                {currentQuestion.type === 'scale' && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Per niente</span>
                    <div className="flex space-x-2">
                      {currentQuestion.options?.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center justify-center w-12 h-12 border-2 border-gray-200 rounded-full cursor-pointer hover:border-teal-300 hover:bg-teal-50 transition-colors"
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={option}
                            checked={answers[currentQuestion.id] === option}
                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                            className="sr-only"
                          />
                          <span className={`font-medium ${
                            answers[currentQuestion.id] === option 
                              ? 'text-teal-600' 
                              : 'text-gray-600'
                          }`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Molto</span>
                  </div>
                )}

                {/* Emotion Scale */}
                {currentQuestion.type === 'emotion-scale' && (
                  <div className="space-y-6">
                    {['Ansioso', 'Triste', 'Stressato', 'Sopraffatto'].map((emotion) => (
                      <div key={emotion} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{emotion}</span>
                          <span className="text-sm text-gray-600">
                            {(answers[currentQuestion.id] as Record<string, number>)?.[emotion] || 1}/10
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                            <button
                              key={value}
                              onClick={() => {
                                const currentEmotions = (answers[currentQuestion.id] as Record<string, number>) || {};
                                handleEmotionScaleAnswer({
                                  ...currentEmotions,
                                  [emotion]: value
                                });
                              }}
                              className={`w-8 h-8 rounded border-2 text-sm font-medium transition-colors ${
                                (answers[currentQuestion.id] as Record<string, number>)?.[emotion] === value
                                  ? 'border-teal-500 bg-teal-500 text-white'
                                  : 'border-gray-300 text-gray-600 hover:border-teal-300'
                              }`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Text */}
                {currentQuestion.type === 'text' && (
                  <textarea
                    value={(answers[currentQuestion.id] as string) || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                    rows={4}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring-teal-500 resize-none"
                    placeholder="Scrivi qui la tua risposta..."
                  />
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
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
              {currentStep === questions.length - 1 ? 'Completa Questionario' : 'Avanti'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </motion.div>

        {/* Optional indicator */}
        {currentQuestion && !currentQuestion.required && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Questa domanda è opzionale - puoi saltarla se preferisci
          </p>
        )}
      </div>
    </div>
  );
};