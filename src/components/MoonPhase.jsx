import React from 'react';
import { motion } from 'framer-motion';
import DATA from '../data.js';

export default function MoonPhase() {
  return (
    <section className="section-dark py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
      {/* Starfield twinkling points */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(28)].map((_, i) => (
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

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
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
          className="font-hand text-lg sm:text-xl text-warm-200 mb-6 sm:mb-10 max-w-lg"
        >
          November 26, 2023 — The exact sky that looked down upon our beginning
        </motion.p>

        {/* Moon Visual Container */}
        <div className="w-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            {/* Soft Orbital Glow Aura */}
            <div className="absolute -inset-8 sm:-inset-12 rounded-full bg-gradient-to-tr from-amber-200/25 via-rose-400/20 to-amber-100/25 blur-3xl animate-pulse-glow pointer-events-none" />

            {/* Glowing Moon Sphere with Saizzu overlay */}
            <div
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full relative overflow-hidden shadow-2xl border-2 border-amber-200/50 flex items-center justify-center group"
              style={{
                boxShadow:
                  '0 0 45px rgba(251, 191, 36, 0.25), 0 0 80px rgba(244, 63, 94, 0.15), inset 0 0 35px rgba(0, 0, 0, 0.65)',
              }}
            >
              {/* Actual Moon Image provided by user */}
              <img
                src="./photos/moon.avif"
                alt="Moon on November 26, 2023"
                className="w-full h-full object-cover select-none pointer-events-none"
                onError={(e) => {
                  // Fallback to absolute path if relative fails
                  if (!e.target.dataset.triedAbsolute) {
                    e.target.dataset.triedAbsolute = 'true';
                    e.target.src = '/photos/moon.avif';
                  }
                }}
              />

              {/* Saizzu's photo layered over the moon with 40% opacity */}
              <img
                src="./photos/saizzu-moon.jpg"
                alt="Shaista (Saizzu) on the Moon"
                className="absolute inset-0 w-full h-full object-cover object-[center_32%] rounded-full select-none pointer-events-none transition-opacity duration-500"
                style={{ opacity: 0.4 }}
                onError={(e) => {
                  if (!e.target.dataset.triedAbsolute) {
                    e.target.dataset.triedAbsolute = 'true';
                    e.target.src = '/photos/saizzu-moon.jpg';
                  }
                }}
              />

              {/* Subtle inner spherical vignette & rim glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(18, 9, 26, 0.7), inset -10px -10px 30px rgba(0,0,0,0.5)',
                }}
              />
            </div>
          </motion.div>

          {/* Centered Moon Phase Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center w-full mt-6 sm:mt-8 mb-5 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs sm:text-sm uppercase tracking-widest font-mono font-bold shadow-lg">
              <span>🌕</span>
              <span>Waxing Gibbous • 98% Illuminated</span>
            </div>
          </motion.div>

          {/* Romantic Quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-2 max-w-md mx-auto"
          >
            <p className="font-hand text-xl sm:text-2xl text-warm-100 leading-relaxed">
              "The same moon that lights up the sky tonight is the one that watched two souls become one."
            </p>
            <p className="font-hand text-sm sm:text-base text-rose-300/80">
              Chaand mein bhi tera hi chehra nazar aata hai... ✨
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
