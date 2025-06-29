import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  life: number;
  maxLife: number;
  type: 'pollen' | 'light';
}

export const AmbientParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          size: 1 + Math.random() * 3,
          opacity: 0.1 + Math.random() * 0.4,
          speed: 0.2 + Math.random() * 0.5,
          life: 0,
          maxLife: 300 + Math.random() * 400,
          type: Math.random() > 0.7 ? 'light' : 'pollen'
        });
      }
    };

    initParticles();

    // Draw background gradient
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(240, 249, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(224, 242, 254, 0.05)');
      gradient.addColorStop(1, 'rgba(186, 230, 253, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Draw distant hills
    const drawHills = () => {
      ctx.save();
      ctx.globalAlpha = 0.1;
      
      // Back hills
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.6);
      for (let x = 0; x <= canvas.width; x += 50) {
        const y = canvas.height * 0.6 + Math.sin(x * 0.01) * 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Front hills
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.75);
      for (let x = 0; x <= canvas.width; x += 40) {
        const y = canvas.height * 0.75 + Math.sin(x * 0.015 + 1) * 25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();
      
      ctx.restore();
    };

    // Draw particle
    const drawParticle = (particle: Particle) => {
      const progress = particle.life / particle.maxLife;
      const fadeOpacity = Math.sin(progress * Math.PI) * particle.opacity;
      
      ctx.save();
      ctx.globalAlpha = fadeOpacity;
      
      if (particle.type === 'pollen') {
        // Pollen particle
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Soft glow
        ctx.globalAlpha = fadeOpacity * 0.3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Light particle
        ctx.fillStyle = '#f0f9ff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Sparkle effect
        ctx.strokeStyle = '#f0f9ff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size * 1.5, particle.y);
        ctx.lineTo(particle.x + particle.size * 1.5, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size * 1.5);
        ctx.lineTo(particle.x, particle.y + particle.size * 1.5);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    // Camera breathing effect
    const getCameraScale = (time: number) => {
      return 1 + Math.sin(time * 0.001) * 0.02; // ±2% zoom
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 16; // Approximate 60fps
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply camera breathing
      const scale = getCameraScale(timeRef.current);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      
      drawBackground();
      drawHills();
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.y -= particle.speed;
        particle.x += Math.sin(timeRef.current * 0.001 + index) * 0.2;
        particle.life++;
        
        // Reset particle if it's off screen or life ended
        if (particle.y < -50 || particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height + Math.random() * 100;
          particle.life = 0;
          particle.maxLife = 300 + Math.random() * 400;
        }
        
        drawParticle(particle);
      });
      
      ctx.restore();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};