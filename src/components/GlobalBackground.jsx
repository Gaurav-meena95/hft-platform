import React, { useEffect, useRef } from 'react';

const GlobalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 0.8,
      opacity: Math.random() * 0.5,
      speed: Math.random() * 0.005 + 0.002,
      direction: Math.random() > 0.5 ? 1 : -1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 237, 232, ${star.opacity})`;
        ctx.fill();

        star.opacity += star.speed * star.direction;
        if (star.opacity >= 0.5 || star.opacity <= 0) {
          star.direction *= -1;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
      {/* Subtle Nebula Gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      
      {/* Star Field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
    </div>
  );
};

export default GlobalBackground;

