import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DATA from '../data.js';

export default function MonthlyPamper() {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const now = new Date();
  const is15th = now.getDate() === 15;

  const { monthlyPamperMessages, monthlyPamperDay } = DATA.timeCapsuleConfig;
  const currentCare = monthlyPamperMessages[selectedPackage];

  const handleClaimWhatsApp = (treat) => {
    const text = `Hey Mudassir ❤️ I'm claiming my Comfort & Pamper Treat today:\n\n✨ "${treat}"\n\nPlease take care of this and spoil me! 🧸🍫`;
    window.open(
      `https://wa.me/${DATA.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section className="section-light py-14 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-rose text-xs">
            <span>🧸</span> THE 15TH MONTHLY COMFORT HUB
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-love-900 mb-2 sm:mb-3"
        >
          Monthly Pamper & Care Capsule
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-700 mb-6 sm:mb-8 max-w-lg"
        >
          {is15th
            ? "It's the 15th! Today is strictly a zero-stress, maximum-pampering day for you, Saizzu."
            : 'For around the 15th (or whenever you feel low or tired)—a safe space with unlimited pampering.'}
        </motion.p>

        {/* Package Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 w-full max-w-xl">
          {monthlyPamperMessages.map((pkg, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPackage(idx)}
              className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-display font-medium transition-all ${
                selectedPackage === idx
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105'
                  : 'bg-white/80 text-warm-700 border border-rose-200/80 hover:bg-white'
              }`}
            >
              Package #{idx + 1}
            </button>
          ))}
        </div>

        {/* Featured Care Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPackage}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-white/90 backdrop-blur-md border-2 border-rose-300/80 rounded-3xl p-6 sm:p-8 shadow-xl text-left relative overflow-hidden"
          >
            {/* Top Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-rose-100 text-rose-800 font-bold tracking-wider">
                15TH OF THE MONTH CARE
              </span>
              <span className="text-2xl">🍫</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-rose-950 mb-3">
              {currentCare.title}
            </h3>

            <p className="font-hand text-lg sm:text-xl text-warm-800 leading-relaxed mb-6">
              "{currentCare.message}"
            </p>

            {/* Pamper Treat Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-rose-600 font-bold block mb-1">
                  INCLUDED PAMPER TREAT:
                </span>
                <p className="font-display text-base sm:text-lg font-bold text-stone-900">
                  {currentCare.pamperTreat}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleClaimWhatsApp(currentCare.pamperTreat)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>🎁</span>
                <span>Claim This Treat</span>
              </button>
            </div>

            <p className="text-[11px] text-warm-500 font-mono text-center sm:text-left">
              *One tap sends this treat directly to Mudassir on WhatsApp with zero hesitation! 💕
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
