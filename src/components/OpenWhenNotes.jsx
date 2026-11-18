import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function OpenWhenNotes() {
  const [activeNote, setActiveNote] = useState(null);
  const notes = DATA.openWhenNotes;

  const handleOpenNote = (note) => {
    setActiveNote(note);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FCD34D'],
    });
  };

  const handleScrollToWish = () => {
    setActiveNote(null);
    const el = document.getElementById('order-wish');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-dark py-14 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
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
          "Open When..." Letters
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-200 mb-8 sm:mb-12 max-w-lg"
        >
          For whenever words are needed most. Pick the letter that speaks to your heart right now.
        </motion.p>

        {/* 4 Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl">
          {notes.map((note, idx) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleOpenNote(note)}
              className="glass-card p-5 sm:p-6 rounded-3xl border border-rose-400/30 hover:border-amber-300/60 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              {/* Wax Seal Stamp Icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 to-amber-600 p-[2px] mb-3 shadow-lg shadow-rose-900/40 group-hover:rotate-6 transition-transform">
                <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-xl">
                  {idx === 0 ? '🥺' : idx === 1 ? '😤' : idx === 2 ? '🌧️' : '😋'}
                </div>
              </div>

              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300/80 mb-1">
                SEALED LETTER #{idx + 1}
              </span>

              <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                {note.label}
              </h3>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-300 font-medium group-hover:text-amber-300 transition-colors">
                <span>Tap to Break Wax Seal</span>
                <span>✨</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Reveal for Note */}
        <AnimatePresence>
          {activeNote && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveNote(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-amber-300/50 relative max-h-[90vh] overflow-y-auto text-left shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveNote(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
                >
                  ✕
                </button>

                {/* Badge & Title */}
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                  {activeNote.label}
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                  {activeNote.title}
                </h3>

                {/* GIF Display */}
                {activeNote.gifUrl && (
                  <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-5 bg-stone-900 border border-white/10 flex items-center justify-center">
                    <img
                      src={activeNote.gifUrl}
                      alt={activeNote.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Heartfelt Letter */}
                <p className="font-hand text-lg sm:text-xl text-warm-100 leading-relaxed mb-6">
                  "{activeNote.message}"
                </p>

                {/* Hungry Special Link to Order Your Wish */}
                {activeNote.id === 'hungry' && (
                  <button
                    onClick={handleScrollToWish}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm mb-2"
                  >
                    <span>🍗</span>
                    <span>Scroll to 'Order Your Wish' Menu Immediately!</span>
                  </button>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-warm-300/60">
                  <span>Forever in your corner</span>
                  <span className="font-hand text-amber-300 text-sm">With love, Mudassir ♥</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
