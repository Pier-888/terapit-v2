import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TherapistProfilePage } from './pages/TherapistProfilePage';
import { MatchingPage } from './pages/MatchingPage';
import { MessagesPage } from './pages/MessagesPage';
import { BookingPage } from './pages/BookingPage';
import { QuestionnaireePage } from './pages/QuestionnaireePage';
import { TherapySelectionPage } from './pages/TherapySelectionPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/therapist/:id" element={<TherapistProfilePage />} />
            <Route path="/matching" element={<MatchingPage />} />
            <Route path="/therapy-selection" element={<TherapySelectionPage />} />
            <Route path="/questionnaire/:type" element={<QuestionnaireePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;