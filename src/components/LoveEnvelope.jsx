import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DATA from '../data.js';

export default function LoveEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlapped, setIsFlapped] = useState(false);

  const handleOpen = () => {
    setIsFlapped(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 600);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsFlapped(false);
    }, 300);
  };

  return (
    <section className="section-dark py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto text-center relative z-10">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-4"
        >
          <span className="pill-badge pill-badge-dark text-xs">
            <span>💌</span> A Private Letter
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-gradient-gold"
        >
          Sealed With My Whole Heart
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-300 mb-8 sm:mb-12 max-w-md mx-auto"
        >
          Tap the wax seal to break the seal and read what my soul wrote for you
        </motion.p>

        {/* 3D Envelope Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm perspective-800"
        >
          <div
            onClick={handleOpen}
            className="cursor-pointer group relative bg-gradient-to-br from-[#FFF5EB] via-[#FCEEE2] to-[#EAD5C3] dark:from-[#1e264a] dark:via-[#161e3d] dark:to-[#101730] rounded-2xl p-6 sm:p-8 shadow-2xl border border-amber-200/40 dark:border-indigo-400/30 hover:shadow-rose-950/50 transition-all duration-300 transform group-hover:-translate-y-1"
            style={{
              minHeight: '210px',
            }}
          >
            {/* Envelope flap folded simulation */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 origin-top transition-transform duration-700 rounded-t-2xl flex items-center justify-center ${
                isFlapped ? 'rotate-x-180 -translate-y-2' : ''
              }`}
              style={{
                background: 'linear-gradient(180deg, #F5DFCC 0%, #ECD3BD 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              {/* Wax Seal Centered */}
              <div
                className="wax-seal absolute top-12"
                title="Tap to open"
              >
                <span>{DATA.envelopeSealLetter || 'M'}</span>
              </div>
            </div>

            {/* Letter peek edge */}
            <div className="absolute top-8 left-8 right-8 h-12 bg-white/80 dark:bg-slate-800/80 rounded-t border-t border-dashed border-rose-300/40 opacity-70" />

            {/* Front Envelope Details */}
            <div className="mt-24 text-center">
              <p className="font-hand text-2xl text-rose-900 dark:text-rose-200 font-semibold mb-1">
                For: {DATA.partnerName} ({DATA.nicknames[0]})
              </p>
              <p className="font-hand text-sm text-warm-700/80 dark:text-warm-300/80">
                From: {DATA.gifterName} • Tap seal to open ✦
              </p>
            </div>

            {/* Washi tape accents */}
            <div className="absolute -top-3 right-6 w-16 h-6 bg-rose-400/30 -rotate-6 rounded-sm shadow-sm backdrop-blur-sm pointer-events-none" />
            <div className="absolute -bottom-2 left-6 w-16 h-6 bg-amber-400/25 rotate-3 rounded-sm shadow-sm backdrop-blur-sm pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Reading Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#FFF8F9] dark:bg-[#0f172a]/95 text-stone-900 dark:text-rose-50 rounded-3xl p-6 sm:p-10 shadow-2xl my-8 border border-rose-300/80 dark:border-indigo-400/40 backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-rose-100/80 hover:bg-rose-200 dark:bg-stone-800/80 dark:hover:bg-slate-700 text-stone-700 hover:text-rose-700 dark:text-rose-200 flex items-center justify-center transition-colors text-lg shadow-sm"
                aria-label="Close letter"
              >
                ✕
              </button>

              {/* Decorative Header */}
              <div className="text-center pb-4 mb-6 border-b border-rose-200/70 dark:border-indigo-400/30">
                <span className="text-rose-600 dark:text-rose-400 text-2xl">❦</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-rose-700 dark:text-amber-300 mt-1">
                  میری روحِ من کے نام
                </h3>
                <p className="font-hand text-base sm:text-lg text-stone-600 dark:text-rose-300 mt-1">
                  {DATA.gifterName} کا محبت بھرا خط
                </p>
              </div>

              {/* Letter Body in Beautiful Urdu */}
              <div className="urdu-text text-stone-900 dark:text-rose-50 space-y-5 px-2 sm:px-4 max-h-[60vh] overflow-y-auto pr-3 leading-relaxed">
                {DATA.loveLetter.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="leading-loose">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Footer Signature */}
              <div className="mt-8 pt-4 border-t border-rose-200/70 dark:border-indigo-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="wax-seal w-10 h-10 text-xs">
                    {DATA.envelopeSealLetter || 'M'}
                  </span>
                  <div className="text-left">
                    <p className="font-hand text-xl font-bold text-rose-700 dark:text-amber-300 leading-none">
                      Forever Yours,
                    </p>
                    <p className="font-display text-sm text-stone-700 dark:text-rose-200 mt-0.5">
                      {DATA.gifterName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition-colors shadow-md hover:shadow-rose-500/30 active:scale-95"
                >
                  Keep In My Heart 💖
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
