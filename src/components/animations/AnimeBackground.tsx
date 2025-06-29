import React from 'react';
import { LeavesAnimation } from './LeavesAnimation';
import { StreamAnimation } from './StreamAnimation';
import { AmbientParticles } from './AmbientParticles';

interface AnimeBackgroundProps {
  variant?: 'leaves' | 'stream' | 'ambient' | 'all';
  className?: string;
}

export const AnimeBackground: React.FC<AnimeBackgroundProps> = ({ 
  variant = 'all', 
  className = '' 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50" />
      
      {/* Animated layers */}
      {(variant === 'all' || variant === 'ambient') && <AmbientParticles />}
      {(variant === 'all' || variant === 'stream') && <StreamAnimation />}
      {(variant === 'all' || variant === 'leaves') && <LeavesAnimation />}
      
      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-white bg-opacity-20" />
    </div>
  );
};