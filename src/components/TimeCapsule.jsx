import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function TimeCapsule() {
  const [unlockedCapsule, setUnlockedCapsule] = useState(null);
  const [overrideUnlock, setOverrideUnlock] = useState(false);

  const now = new Date();
  const isSunday = now.getDay() === 0;
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();

  const { sundayMessages, specialDates } = DATA.timeCapsuleConfig;

  // Check matching special date
  const activeSpecialDate = specialDates.find(
    (d) => d.month === currentMonth && d.day === currentDay
  );

  const handleOpenCapsule = (type, data) => {
    setUnlockedCapsule({ type, data });
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#E11D48', '#FB7185', '#FCD34D'],
    });
  };

  return (
    <section className="section-dark py-14 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-dark text-xs">
            <span>⏳</span> TIME-LOCKED TREASURES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-2 sm:mb-3"
        >
          Our Secret Time Capsule
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-200 mb-6 sm:mb-10 max-w-lg"
        >
          Certain messages are meant to unlock only when time aligns with love
        </motion.p>

        {/* Master Key of Love Bypass Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setOverrideUnlock(!overrideUnlock)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-all flex items-center gap-2 ${
              overrideUnlock
                ? 'bg-amber-400 text-stone-950 border-amber-300 font-semibold shadow-lg shadow-amber-400/20'
                : 'bg-stone-900/80 text-warm-300/80 border-white/10 hover:border-amber-400/40'
            }`}
          >
            <span>🗝️</span>
            <span>{overrideUnlock ? 'Master Key Active (All Unlocked)' : "Use Mudassir's Key of Love (Unlock Anytime)"}</span>
          </button>
        </div>

        {/* Capsules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
          {/* 1. Sunday Capsule */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-rose-400/30 flex flex-col items-center justify-between text-center relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-2xl mb-3 shadow-inner">
              {isSunday || overrideUnlock ? '🔓' : '🔒'}
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300/80 mb-1">
              WEEKLY SUNDAY VAULT
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
              Sunday Comfort & Treats
            </h3>
            <p className="text-xs sm:text-sm text-warm-200/80 mb-4 line-clamp-2">
              {isSunday || overrideUnlock
                ? "Today's Sunday capsule is unlocked and ready for you!"
                : 'Unlocks every Sunday for relaxing talk & food cravings.'}
            </p>

            <button
              onClick={() =>
                handleOpenCapsule('sunday', {
                  title: 'Sunday Capsule Unlocked ✨',
                  messages: sundayMessages,
                })
              }
              disabled={!isSunday && !overrideUnlock}
              className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow ${
                isSunday || overrideUnlock
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:brightness-110 active:scale-95'
                  : 'bg-stone-900 text-warm-400/50 cursor-not-allowed border border-white/5'
              }`}
            >
              {isSunday || overrideUnlock ? 'Open Sunday Capsule 📜' : 'Locked Until Sunday ⏳'}
            </button>
          </div>

          {/* 2. Special Dates Capsule */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-rose-400/30 flex flex-col items-center justify-between text-center relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-2xl mb-3 shadow-inner">
              {activeSpecialDate || overrideUnlock ? '💖' : '🔒'}
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-rose-300/80 mb-1">
              MILESTONE DATES
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
              Anniversary Capsules
            </h3>
            <p className="text-xs sm:text-sm text-warm-200/80 mb-4 line-clamp-2">
              {activeSpecialDate || overrideUnlock
                ? 'Milestone capsule unlocked with memories!'
                : 'Unlocks on 17th Sept & 15th Nov with sacred memories.'}
            </p>

            <button
              onClick={() =>
                handleOpenCapsule('special', {
                  title: activeSpecialDate ? activeSpecialDate.title : 'Milestone Archive 💖',
                  dates: specialDates,
                })
              }
              disabled={!activeSpecialDate && !overrideUnlock}
              className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow ${
                activeSpecialDate || overrideUnlock
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white hover:brightness-110 active:scale-95'
                  : 'bg-stone-900 text-warm-400/50 cursor-not-allowed border border-white/5'
              }`}
            >
              {activeSpecialDate || overrideUnlock ? 'Read Milestone Letters 💌' : 'Locked for Special Dates ⏳'}
            </button>
          </div>
        </div>

        {/* Modal for Unlocked Capsule */}
        <AnimatePresence>
          {unlockedCapsule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setUnlockedCapsule(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-amber-300/40 relative max-h-[85vh] overflow-y-auto text-left shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <h3 className="font-display text-xl font-bold text-amber-300">
                      {unlockedCapsule.data.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setUnlockedCapsule(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Content Render */}
                {unlockedCapsule.type === 'sunday' && (
                  <div className="space-y-4">
                    {unlockedCapsule.data.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/5 border border-amber-400/20 font-hand text-lg sm:text-xl text-warm-100 leading-relaxed"
                      >
                        "{msg}"
                      </div>
                    ))}
                    <a
                      href={`https://wa.me/${DATA.whatsappNumber}?text=${encodeURIComponent(
                        "Happy Sunday, Mudassir! ❤️ I opened our Sunday Time Capsule! Tell me, what's our plan today? 😉"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all text-sm"
                    >
                      <span>💬</span>
                      <span>Send Sunday Reply to Mudassir on WhatsApp</span>
                    </a>
                  </div>
                )}

                {unlockedCapsule.type === 'special' && (
                  <div className="space-y-4">
                    {unlockedCapsule.data.dates.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/5 border border-rose-400/30"
                      >
                        <span className="text-xs font-mono text-rose-300 font-bold block mb-1">
                          {item.title}
                        </span>
                        <p className="font-hand text-lg text-warm-100 leading-relaxed">
                          "{item.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
