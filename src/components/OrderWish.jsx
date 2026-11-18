import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function OrderWish() {
  const { cravings, vibes, urgencies } = DATA.wishOptions;

  const [selectedCraving, setSelectedCraving] = useState(cravings[0]);
  const [selectedVibe, setSelectedVibe] = useState(vibes[0]);
  const [selectedUrgency, setSelectedUrgency] = useState(urgencies[0]);
  const [customNote, setCustomNote] = useState('');

  const handleSendOrder = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#10B981', '#F59E0B', '#FB7185'],
    });

    let message = `Hey Mudassir! 🛎️❤️ I'm placing an official wish order from our special page:\n\n`;
    message += `🍽️ Craving: ${selectedCraving}\n`;
    message += `✨ Vibe: ${selectedVibe}\n`;
    message += `🚨 Urgency: ${selectedUrgency}\n`;
    if (customNote.trim()) {
      message += `💌 Note: "${customNote.trim()}"\n`;
    }
    message += `\nOrder is officially placed, now fulfill it soon, Jaan! 😘💕`;

    const url = `https://wa.me/${DATA.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="order-wish" className="section-dark py-14 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center scroll-mt-10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-dark text-xs">
            <span>🛎️</span> SAIZZU CRAVING & VIBE HOTLINE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-2 sm:mb-3"
        >
          Order Your Wish
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-200 mb-8 sm:mb-12 max-w-lg"
        >
          No explanations needed. Select your craving and vibe, and tap to send the order directly to my phone.
        </motion.p>

        {/* Main Interactive Form Card */}
        <div className="w-full glass-card border border-rose-400/30 rounded-3xl p-6 sm:p-8 text-left shadow-2xl relative">
          {/* Step 1: Craving */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-3">
              1. What is your stomach or heart craving? 🍽️
            </label>
            <div className="flex flex-wrap gap-2">
              {cravings.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCraving(item)}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                    selectedCraving === item
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 ring-2 ring-rose-400/50'
                      : 'bg-white/5 text-warm-200 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Vibe */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-3">
              2. What kind of date or vibe do you need? ✨
            </label>
            <div className="flex flex-wrap gap-2">
              {vibes.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedVibe(item)}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                    selectedVibe === item
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-lg shadow-amber-500/30 ring-2 ring-amber-300/50'
                      : 'bg-white/5 text-warm-200 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Urgency */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-3">
              3. When should this wish be fulfilled? ⏰
            </label>
            <div className="flex flex-wrap gap-2">
              {urgencies.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedUrgency(item)}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                    selectedUrgency === item
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg ring-2 ring-pink-400/40'
                      : 'bg-white/5 text-warm-200 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Optional Sweet Note */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-2">
              4. Any special instructions for Mudassir? (Optional) 📝
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g., Don't forget my favourite sweets, or call me right away! 💕"
              className="w-full px-4 py-3 rounded-2xl bg-stone-900/90 border border-white/10 text-warm-100 placeholder-warm-400/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400/50 transition-colors"
            />
          </div>

          {/* Live Order Receipt Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/70 border border-amber-400/20 mb-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 text-amber-300 font-bold">
              <span>🧾 THE SAIZZU EXPRESS RECEIPT</span>
              <span>LIVE PREVIEW</span>
            </div>
            <div className="space-y-1 text-warm-200">
              <p>• Craving: <span className="text-white font-bold">{selectedCraving}</span></p>
              <p>• Vibe: <span className="text-white font-bold">{selectedVibe}</span></p>
              <p>• Urgency: <span className="text-white font-bold">{selectedUrgency}</span></p>
              {customNote.trim() && (
                <p>• Special Note: <span className="text-rose-300">"{customNote.trim()}"</span></p>
              )}
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <button
            type="button"
            onClick={handleSendOrder}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>📲</span>
            <span>Dispatch Wish to Mudassir on WhatsApp</span>
            <span>✨</span>
          </button>
        </div>
      </div>
    </section>
  );
}
