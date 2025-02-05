import React from 'react';

const TechBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Tech Grid */}
      <div className="absolute inset-0 tech-grid opacity-10"></div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      
      {/* Scanlines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 scanline opacity-5"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 200 + 100 + 'px',
              height: Math.random() * 200 + 100 + 'px',
              background: `radial-gradient(circle at 30% 30%, rgba(255, 107, 53, ${Math.random() * 0.1}), transparent)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 4 + 6}s ease-in-out infinite ${i * -1.5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Tech Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FF6B35]/20 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `pulse ${Math.random() * 2 + 2}s ease-in-out infinite ${i * -0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechBackground;