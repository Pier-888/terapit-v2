import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PatientDashboard } from '../components/PatientDashboard';
import { TherapistDashboard } from '../components/TherapistDashboard';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Devi essere autenticato per accedere alla dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'patient' ? <PatientDashboard /> : <TherapistDashboard />}
    </div>
  );
};