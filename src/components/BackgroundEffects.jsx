import { useMemo } from 'react';

// ── Ambient floating love particles & magical starry midnight effects ──
const PARTICLE_COUNT = 36;
const STAR_COUNT = 48;

function BackgroundEffects({ darkMode = false }) {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const isHeart = i % 3 === 0;
      const isSparkle = i % 3 === 1;
      const size = isHeart ? 14 + (i % 4) * 4 : 2 + (i % 3) * 2;
      const left = ((i * 2.8) + (i % 7) * 11) % 100;
      const startTop = 70 + (i % 5) * 6;
      const duration = 14 + (i % 5) * 3;
      const delay = -(i * 0.8);
      const swayAmp = 20 + (i % 4) * 15;
      const opacity = isHeart ? 0.2 + (i % 3) * 0.12 : 0.15 + (i % 4) * 0.1;
      const color = isHeart
        ? i % 6 === 0
          ? '#E11D48'
          : i % 6 === 3
          ? '#FB7185'
          : '#FDA4AF'
        : '#D4A574';

      return {
        id: i,
        isHeart,
        isSparkle,
        size,
        left,
        startTop,
        duration,
        delay,
        swayAmp,
        opacity,
        color,
      };
    });
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      top: (i * 11) % 96,
      left: (i * 19 + (i % 5) * 7) % 98,
      size: i % 4 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
      delay: (i * 0.2) % 4,
      duration: 1.8 + (i % 4) * 0.8,
      color: i % 3 === 0 ? '#FDE68A' : i % 3 === 1 ? '#FDA4AF' : '#BAE6FD',
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none transition-opacity duration-700"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes float-heart-rise {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10%  { opacity: var(--max-op); }
          50%  { transform: translateY(-50vh) translateX(var(--sway)) rotate(12deg); }
          90%  { opacity: var(--max-op); }
          100% { transform: translateY(-105vh) translateX(calc(var(--sway) * -0.5)) rotate(-12deg); opacity: 0; }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%      { opacity: 0.95; transform: scale(1.4); }
        }
        @keyframes shooting-star {
          0%   { transform: translateX(0) translateY(0) rotate(-45deg) scale(0); opacity: 0; }
          10%  { opacity: 1; transform: translateX(-50px) translateY(50px) rotate(-45deg) scale(1); }
          25%  { transform: translateX(-200px) translateY(200px) rotate(-45deg) scale(1); opacity: 0; }
          100% { transform: translateX(-200px) translateY(200px) rotate(-45deg) scale(0); opacity: 0; }
        }
      `}</style>

      {/* Midnight Ambient Constellations & Nebulae */}
      {darkMode && (
        <div className="absolute inset-0">
          {/* Subtle cosmic ambient glow orbs */}
          <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-2/3 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />

          {/* Twinkling Starfield */}
          {stars.map((s) => (
            <span
              key={`star-${s.id}`}
              className="absolute rounded-full"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                backgroundColor: s.color,
                boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
                animation: `star-twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
              }}
            />
          ))}

          {/* Gentle Shooting Star */}
          <div
            className="absolute top-16 right-20 w-24 h-0.5 bg-gradient-to-l from-white via-amber-200 to-transparent rounded-full opacity-0"
            style={{
              animation: 'shooting-star 9s 3s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Floating hearts */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            top: `${p.startTop}%`,
            color: p.color,
            fontSize: p.isHeart ? `${p.size}px` : undefined,
            width: !p.isHeart ? `${p.size}px` : undefined,
            height: !p.isHeart ? `${p.size}px` : undefined,
            backgroundColor: !p.isHeart ? p.color : undefined,
            borderRadius: !p.isHeart ? '50%' : undefined,
            '--sway': `${p.swayAmp}px`,
            '--max-op': darkMode ? p.opacity * 0.9 : p.opacity,
            animation: `float-heart-rise ${p.duration}s ${p.delay}s linear infinite`,
            willChange: 'transform, opacity',
          }}
        >
          {p.isHeart ? '♥' : ''}
        </span>
      ))}
    </div>
  );
}

export default BackgroundEffects;
