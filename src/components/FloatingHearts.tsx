import React, { useMemo } from 'react';

interface HeartConfig {
  id: number;
  left: number; // percentage (0 - 100)
  size: number; // px (12 - 36)
  duration: number; // seconds (8 - 20)
  delay: number; // seconds (0 - 10)
  opacity: number; // 0.15 - 0.4
  rotation: number; // degrees (-45 to 45)
}

export const FloatingHearts: React.FC = () => {
  // Gera uma quantidade controlada de corações (16 unidades) para manter performance 60fps até em celulares antigos
  const hearts = useMemo<HeartConfig[]>(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.round((i * 6.25 + (i % 3) * 2.5) % 96 + 2),
      size: 14 + ((i * 7) % 22),
      duration: 9 + ((i * 3) % 9),
      delay: (i * 1.3) % 11,
      opacity: 0.12 + ((i % 5) * 0.05),
      rotation: -30 + ((i * 19) % 60),
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Gradiente sutil de iluminação ambiente rosa no topo e na base */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF2E7E]/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF2E7E]/5 rounded-full blur-[120px]" />

      {/* Corações animados flutuando */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart"
          style={
            {
              left: `${heart.left}%`,
              bottom: '-50px',
              '--heart-duration': `${heart.duration}s`,
              '--heart-delay': `${heart.delay}s`,
              '--heart-opacity': heart.opacity,
              '--heart-rot': `${heart.rotation}deg`,
            } as React.CSSProperties
          }
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="#FF2E7E"
            className="filter drop-shadow-[0_0_8px_rgba(255,46,126,0.6)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
