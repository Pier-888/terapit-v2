import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
}

interface Glint {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const StreamAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const glintsRef = useRef<Glint[]>([]);
  const animationRef = useRef<number>();

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

    // Stream path points
    const getStreamPath = () => {
      const points = [];
      const segments = 20;
      const amplitude = 60;
      const frequency = 0.02;
      
      for (let i = 0; i <= segments; i++) {
        const x = (canvas.width / segments) * i;
        const y = canvas.height * 0.7 + Math.sin(x * frequency) * amplitude;
        points.push({ x, y });
      }
      return points;
    };

    // Initialize ripples
    const initRipples = () => {
      ripplesRef.current = [];
      for (let i = 0; i < 8; i++) {
        const streamPath = getStreamPath();
        const point = streamPath[Math.floor(Math.random() * streamPath.length)];
        ripplesRef.current.push({
          x: point.x + (Math.random() - 0.5) * 40,
          y: point.y + (Math.random() - 0.5) * 20,
          radius: Math.random() * 10,
          opacity: 0.1 + Math.random() * 0.2,
          speed: 0.3 + Math.random() * 0.5
        });
      }
    };

    // Initialize glints
    const initGlints = () => {
      glintsRef.current = [];
      for (let i = 0; i < 12; i++) {
        const streamPath = getStreamPath();
        const point = streamPath[Math.floor(Math.random() * streamPath.length)];
        glintsRef.current.push({
          x: point.x + (Math.random() - 0.5) * 60,
          y: point.y + (Math.random() - 0.5) * 30,
          size: 2 + Math.random() * 4,
          opacity: 0,
          life: 0,
          maxLife: 60 + Math.random() * 120
        });
      }
    };

    initRipples();
    initGlints();

    // Draw stream
    const drawStream = () => {
      const streamPath = getStreamPath();
      
      // Draw main stream
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(streamPath[0].x, streamPath[0].y);
      for (let i = 1; i < streamPath.length; i++) {
        ctx.lineTo(streamPath[i].x, streamPath[i].y);
      }
      ctx.stroke();

      // Draw stream highlight
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      ctx.restore();
    };

    // Draw ripples
    const drawRipples = () => {
      ripplesRef.current.forEach((ripple) => {
        ctx.save();
        ctx.globalAlpha = ripple.opacity * (1 - ripple.radius / 30);
        ctx.strokeStyle = '#0ea5e9';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();

        // Update ripple
        ripple.radius += ripple.speed;
        if (ripple.radius > 30) {
          const streamPath = getStreamPath();
          const point = streamPath[Math.floor(Math.random() * streamPath.length)];
          ripple.x = point.x + (Math.random() - 0.5) * 40;
          ripple.y = point.y + (Math.random() - 0.5) * 20;
          ripple.radius = 0;
          ripple.opacity = 0.1 + Math.random() * 0.2;
        }
      });
    };

    // Draw glints
    const drawGlints = () => {
      glintsRef.current.forEach((glint) => {
        const progress = glint.life / glint.maxLife;
        const opacity = Math.sin(progress * Math.PI) * 0.6;
        
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#f0f9ff';
        
        // Draw star-like glint
        ctx.translate(glint.x, glint.y);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.moveTo(0, 0);
          ctx.lineTo(0, glint.size);
        }
        ctx.stroke();
        
        // Small circle in center
        ctx.beginPath();
        ctx.arc(0, 0, glint.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Update glint
        glint.life++;
        if (glint.life > glint.maxLife) {
          const streamPath = getStreamPath();
          const point = streamPath[Math.floor(Math.random() * streamPath.length)];
          glint.x = point.x + (Math.random() - 0.5) * 60;
          glint.y = point.y + (Math.random() - 0.5) * 30;
          glint.life = 0;
          glint.maxLife = 60 + Math.random() * 120;
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawStream();
      drawRipples();
      drawGlints();

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
      style={{ zIndex: 1 }}
    />
  );
};