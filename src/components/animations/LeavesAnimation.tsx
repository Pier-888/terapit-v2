import React, { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  size: number;
  opacity: number;
  rotationSpeed: number;
  type: number;
}

export const LeavesAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
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

    // Initialize leaves
    const initLeaves = () => {
      leavesRef.current = [];
      const leafCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < leafCount; i++) {
        leavesRef.current.push({
          x: Math.random() * (canvas.width + 200) - 100,
          y: Math.random() * (canvas.height + 200) - 100,
          rotation: Math.random() * 360,
          speed: 0.3 + Math.random() * 0.8,
          size: 8 + Math.random() * 12,
          opacity: 0.1 + Math.random() * 0.3,
          rotationSpeed: (Math.random() - 0.5) * 2,
          type: Math.floor(Math.random() * 3)
        });
      }
    };

    initLeaves();

    // Draw leaf function
    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate((leaf.rotation * Math.PI) / 180);
      ctx.globalAlpha = leaf.opacity;

      // Different leaf shapes
      const colors = ['#4ade80', '#22c55e', '#16a34a'];
      ctx.fillStyle = colors[leaf.type];

      ctx.beginPath();
      if (leaf.type === 0) {
        // Oval leaf
        ctx.ellipse(0, 0, leaf.size * 0.6, leaf.size, 0, 0, Math.PI * 2);
      } else if (leaf.type === 1) {
        // Heart-shaped leaf
        ctx.moveTo(0, -leaf.size * 0.3);
        ctx.bezierCurveTo(-leaf.size * 0.5, -leaf.size * 0.8, -leaf.size * 0.8, -leaf.size * 0.3, 0, leaf.size * 0.3);
        ctx.bezierCurveTo(leaf.size * 0.8, -leaf.size * 0.3, leaf.size * 0.5, -leaf.size * 0.8, 0, -leaf.size * 0.3);
      } else {
        // Simple oval with pointed end
        ctx.ellipse(0, 0, leaf.size * 0.4, leaf.size * 0.8, 0, 0, Math.PI * 2);
      }
      ctx.fill();

      // Add subtle vein
      ctx.strokeStyle = colors[leaf.type];
      ctx.globalAlpha = leaf.opacity * 0.5;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -leaf.size * 0.8);
      ctx.lineTo(0, leaf.size * 0.8);
      ctx.stroke();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leavesRef.current.forEach((leaf) => {
        // Update position
        leaf.x += Math.cos((leaf.rotation * Math.PI) / 180) * leaf.speed;
        leaf.y += Math.sin((leaf.rotation * Math.PI) / 180) * leaf.speed + leaf.speed * 0.5;
        leaf.rotation += leaf.rotationSpeed;

        // Wrap around screen
        if (leaf.x > canvas.width + 50) leaf.x = -50;
        if (leaf.y > canvas.height + 50) leaf.y = -50;
        if (leaf.x < -50) leaf.x = canvas.width + 50;

        drawLeaf(leaf);
      });

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