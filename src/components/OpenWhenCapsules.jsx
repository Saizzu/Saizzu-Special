import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function OpenWhenCapsules() {
  const [activeCapsule, setActiveCapsule] = useState(null);
  const notes = DATA.openWhenNotes || [];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCapsule(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpen = (note) => {
    setActiveCapsule(note);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FCD34D'],
    });
  };

  const getEmojiForNote = (id) => {
    if (id === 'miss-me') return '🥺';
    if (id === 'angry') return '😤';
    if (id === 'stressed') return '🌧️';
    if (id === 'hungry') return '😋';
    return '💌';
  };

  return (
    <section className="section-dark py-14 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-dark text-xs">
            <span>💌</span> EMOTIONAL FIRST-AID
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-2 sm:mb-3"
        >
          "Open When..." Envelopes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-200 mb-8 sm:mb-12 max-w-lg"
        >
          No matter how your mood changes, there is a letter waiting right here for your heart
        </motion.p>

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl">
          {notes.map((note, idx) => (
            <motion.div
              key={note.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleOpen(note)}
              className="glass-card p-5 sm:p-6 rounded-3xl border border-rose-400/30 hover:border-amber-300/60 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-between text-center relative overflow-hidden shadow-lg hover:shadow-rose-950/40"
            >
              {/* Wax Seal / Stamp Icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 via-pink-600 to-amber-500 p-[2px] mb-3 shadow-lg shadow-rose-900/40 group-hover:rotate-6 transition-transform">
                <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-2xl">
                  {getEmojiForNote(note.id)}
                </div>
              </div>

              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300/80 mb-1">
                SEALED CAPSULE #{idx + 1}
              </span>

              <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                {note.label}
              </h3>

              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-300 font-medium group-hover:text-amber-300 transition-colors">
                <span>Break Wax Seal</span>
                <span>✨</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spring-Animated Modal */}
        <AnimatePresence>
          {activeCapsule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveCapsule(null)}
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                initial={{ scale: 0.85, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 30, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-amber-300/40 relative max-h-[90vh] overflow-y-auto text-left shadow-2xl"
              >
                {/* Accessible Close Button */}
                <button
                  onClick={() => setActiveCapsule(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
                  aria-label="Close"
                >
                  ×
                </button>

                {/* Mood Tag */}
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                  {activeCapsule.label}
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                  {activeCapsule.title}
                </h3>

                {/* Cute GIF with Centered Responsive Frame & Fallback Handling */}
                {activeCapsule.gifUrl && (
                  <div className="w-full mb-5 flex items-center justify-center relative">
                    <img
                      src={activeCapsule.gifUrl}
                      alt={activeCapsule.title}
                      loading="lazy"
                      className="w-full max-h-64 sm:max-h-72 object-contain mx-auto rounded-2xl bg-black/10 dark:bg-slate-950/40 p-1.5 border border-white/10 shadow-inner"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full py-8 rounded-2xl bg-black/20 dark:bg-slate-950/40 border border-white/10 flex-col items-center justify-center text-center p-4">
                      <span className="text-3xl mb-1">💖</span>
                      <span className="font-hand text-lg text-rose-300">Sending you the warmest hug, Saizzu!</span>
                    </div>
                  </div>
                )}

                {/* Heartfelt Note */}
                <p className="font-hand text-lg sm:text-xl text-warm-100 dark:text-rose-100 leading-relaxed mb-6">
                  "{activeCapsule.message}"
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-warm-300/80 dark:text-rose-200/70">
                  <span>Always with you, no matter what</span>
                  <span className="font-hand text-amber-300 text-sm">With all my love, Mudassir ♥</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
