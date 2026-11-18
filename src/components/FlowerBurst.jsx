import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function FlowerBurst() {
  const [flowerCount, setFlowerCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleBloom = (e) => {
    setFlowerCount((prev) => prev + 1);
    setShowToast(true);

    // Get click position for origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Center burst with flower-like colors and emojis
    confetti({
      origin: { x, y },
      particleCount: 50,
      spread: 70,
      startVelocity: 35,
      colors: ['#E11D48', '#FB7185', '#FDA4AF', '#F43F5E', '#D4A574'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Left bloom
    setTimeout(() => {
      confetti({
        origin: { x: Math.max(0.1, x - 0.15), y },
        particleCount: 35,
        angle: 60,
        spread: 55,
        startVelocity: 30,
        colors: ['#FECDD3', '#F43F5E', '#FFF1F2', '#D4A574'],
      });
    }, 150);

    // Right bloom
    setTimeout(() => {
      confetti({
        origin: { x: Math.min(0.9, x + 0.15), y },
        particleCount: 35,
        angle: 120,
        spread: 55,
        startVelocity: 30,
        colors: ['#E11D48', '#FB7185', '#FECDD3', '#FDE68A'],
      });
    }, 300);

    // Hide toast after 3.5s
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <section className="section-light py-10 sm:py-20 px-3 sm:px-6 text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span className="pill-badge pill-badge-rose mb-2 sm:mb-3 text-xs">
            <span>💐</span> Spontaneous Blooms
          </span>
          <h3 className="font-display text-xl sm:text-3xl font-bold text-love-900 dark:text-rose-100 mb-1.5 sm:mb-2">
            Just In Case Nobody Told You Today
          </h3>
          <p className="font-hand text-base sm:text-xl text-warm-700 dark:text-rose-200/90 mb-6 sm:mb-8">
            You deserve every flower that ever bloomed under the sun
          </p>

          {/* Interactive Button */}
          <button
            onClick={handleBloom}
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-6 py-3.5 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white font-hand text-lg sm:text-2xl shadow-xl hover:shadow-2xl hover:shadow-rose-500/40 transform hover:-translate-y-1 active:scale-95 transition-all duration-300 border-2 border-rose-300/40"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
              🌸
            </span>
            <span>{DATA.flowerButtonText}</span>
            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
              🌹
            </span>
          </button>

          {/* Bouquet count tracker */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-warm-700 dark:text-rose-200/80">
            <span>Bouquets sent today:</span>
            <span className="font-mono font-bold text-rose-600 dark:text-amber-300 text-base">
              {flowerCount}
            </span>
            <span>{flowerCount > 0 ? '💐' : '🌱'}</span>
          </div>

          {/* Toast Notification */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : 10 }}
            className={`mt-4 font-hand text-xl text-rose-700 dark:text-rose-300 transition-opacity duration-300 ${
              showToast ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            A shower of roses delivered straight to your heart, Saizzu 💕
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
