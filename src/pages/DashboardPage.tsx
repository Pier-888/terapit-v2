import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PatientDashboard } from '../components/PatientDashboard';
import { TherapistDashboard } from '../components/TherapistDashboard';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen anime-bg-dashboard flex items-center justify-center">
        <div className="text-center bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <p className="text-gray-600">Devi essere autenticato per accedere alla dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen anime-bg-dashboard">
      <div className="relative z-10">
        {user.role === 'patient' ? <PatientDashboard /> : <TherapistDashboard />}
      </div>
    </div>
  );
};