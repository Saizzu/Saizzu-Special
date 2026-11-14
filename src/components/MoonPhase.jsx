import React from 'react';
import { motion } from 'framer-motion';
import DATA from '../data.js';

export default function MoonPhase() {
  return (
    <section className="section-dark py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
      {/* Starfield twinkling points */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-dark text-xs">
            <span>🌙</span> Celestial Witness
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-2 sm:mb-3"
        >
          The Moon That Night
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-200 mb-6 sm:mb-12"
        >
          November 26, 2023 — The exact sky that looked down upon our beginning
        </motion.p>

        {/* 3D Glowing Moon Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative inline-block mb-6 sm:mb-8"
        >
          {/* Orbital Glow Aura */}
          <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-r from-amber-200/20 via-rose-300/20 to-amber-200/20 blur-2xl animate-pulse-glow" />

          {/* Moon Sphere */}
          <div
            className="w-44 h-44 sm:w-64 sm:h-64 rounded-full relative overflow-hidden shadow-2xl border border-amber-200/40"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, #FFF6E8 0%, #E8D5B8 35%, #C2AC8A 70%, #4A3A28 100%)',
              boxShadow:
                'inset -20px -20px 40px rgba(0,0,0,0.6), 0 0 50px rgba(212,165,116,0.3)',
            }}
          >
            {/* Crater 1 */}
            <div className="absolute top-12 left-16 w-8 h-8 rounded-full bg-black/10 blur-[1px]" />
            {/* Crater 2 */}
            <div className="absolute top-24 left-28 w-12 h-12 rounded-full bg-black/15 blur-[1px]" />
            {/* Crater 3 */}
            <div className="absolute bottom-16 left-14 w-10 h-10 rounded-full bg-black/12 blur-[1px]" />
            {/* Crater 4 */}
            <div className="absolute top-20 right-14 w-6 h-6 rounded-full bg-black/10 blur-[1px]" />

            {/* Glowing Moon Rim */}
            <div className="absolute inset-0 rounded-full border-t border-l border-white/50 pointer-events-none" />
          </div>
        </motion.div>

        {/* Moon Badge */}
        <div className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs uppercase tracking-widest font-mono font-bold mb-4">
          Waxing Gibbous • 98% Illuminated
        </div>

        <p className="font-hand text-xl sm:text-2xl text-warm-100 max-w-md mx-auto leading-relaxed">
          "The same moon that lights up the sky tonight is the one that watched two souls become one."
        </p>
      </div>
    </section>
  );
}
