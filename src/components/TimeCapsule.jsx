import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

const TREAT_OPTIONS = [
  'Dark & Milk Chocolates 🍫',
  'Ice Cream Tub / Cone 🍦',
  'Warm Brown Gulab Jamun 🍮',
  'Soanpapdi 📦',
  'Chicken Biryani 🍗',
  'Panipuri & Chaat 🥟',
  'Extra Long Hugs & Cuddles 🤗',
];

function getWeekOfYear(d) {
  const start = new Date(d.getFullYear(), 0, 1);
  const diff = d - start + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(Math.floor(diff / oneDay) / 7);
}

function getNextUnlockCandidate(now) {
  const candidates = [];

  // 1. Next Sunday at 00:00:00
  const nextSunday = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(0, 0, 0, 0);
  candidates.push({
    targetDate: nextSunday,
    label: 'Sunday Surprise ✨',
  });

  // 2. Next 15th of the month at 00:00:00
  const next15th = new Date(now);
  if (now.getDate() < 15) {
    next15th.setDate(15);
  } else {
    next15th.setMonth(next15th.getMonth() + 1);
    next15th.setDate(15);
  }
  next15th.setHours(0, 0, 0, 0);
  candidates.push({
    targetDate: next15th,
    label: 'Monthly 15th Pamper Capsule 🧸',
  });

  // 3. Next September 17 at 00:00:00 (month index 8)
  const nextSept17 = new Date(now.getFullYear(), 8, 17, 0, 0, 0);
  if (now > nextSept17) {
    nextSept17.setFullYear(now.getFullYear() + 1);
  }
  candidates.push({
    targetDate: nextSept17,
    label: '17th September Milestone ✨',
  });

  // 4. Next November 15 at 00:00:00 (month index 10)
  const nextNov15 = new Date(now.getFullYear(), 10, 15, 0, 0, 0);
  if (now > nextNov15) {
    nextNov15.setFullYear(now.getFullYear() + 1);
  }
  candidates.push({
    targetDate: nextNov15,
    label: '15th November Special 💖',
  });

  candidates.sort((a, b) => a.targetDate - b.targetDate);
  return candidates[0];
}

export default function TimeCapsule() {
  const [now, setNow] = useState(new Date());
  const [overrideKey, setOverrideKey] = useState(false);
  const [previewMode, setPreviewMode] = useState('pamper'); // 'milestone' | 'pamper' | 'sunday'

  // Interactive treat selection state
  const [selectedTreats, setSelectedTreats] = useState(['Warm Brown Gulab Jamun 🍮']);
  const [customTreat, setCustomTreat] = useState('');

  const config = DATA.timeCapsuleConfig || {};
  const { specialDates = [], monthlyPamperMessages = [], sundayMessages = [] } = config;

  // Live clock for ticking countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const month = now.getMonth(); // 0-indexed (8 = Sept, 10 = Nov)
  const date = now.getDate();
  const day = now.getDay(); // 0 = Sunday

  // Priority 1 — Milestone Special Dates: Sept 17 or Nov 15
  const isSept17 = month === 8 && date === 17;
  const isNov15 = month === 10 && date === 15;
  const isMilestone = isSept17 || isNov15;
  const matchedMilestone = specialDates.find((d) =>
    isSept17 ? d.month === 9 && d.day === 17 : isNov15 ? d.month === 11 && d.day === 15 : false
  );

  // Priority 2 — Monthly 15th Comfort & Pamper Day (if not Nov 15 milestone)
  const isMonthly15th = date === 15 && !isNov15;
  const pamperMsgIndex = monthlyPamperMessages.length
    ? (month + 1) % monthlyPamperMessages.length
    : 0;
  const matchedPamper = monthlyPamperMessages[pamperMsgIndex] || monthlyPamperMessages[0];

  // Priority 3 — Every Sunday
  const isSunday = day === 0;
  const weekIdx = sundayMessages.length ? getWeekOfYear(now) % sundayMessages.length : 0;
  const matchedSunday = sundayMessages[weekIdx] || sundayMessages[0];

  // Determine active unlock state
  const isUnlockedNaturally = isMilestone || isMonthly15th || isSunday;
  const isUnlocked = isUnlockedNaturally || overrideKey;

  // Countdown to next unlock
  const nextUnlock = getNextUnlockCandidate(now);
  const diffMs = Math.max(0, nextUnlock.targetDate - now);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const toggleTreat = (item) => {
    setSelectedTreats((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
    );
  };

  const handleClaimDynamicTreat = () => {
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FB7185', '#E11D48', '#FCD34D', '#10B981'],
    });

    const activeCapsuleName = isMilestone || (overrideKey && previewMode === 'milestone')
      ? (matchedMilestone ? matchedMilestone.title : 'Milestone Special Date Capsule 💖')
      : isMonthly15th || (overrideKey && previewMode === 'pamper')
      ? 'Monthly 15th Pamper & Comfort Capsule 🧸'
      : 'Sunday Surprise Time Capsule ✨';

    let msg = `Hey Mudassir! ❤️ I opened our *${activeCapsuleName}* on our special page:\n\n`;

    if (selectedTreats.length > 0) {
      msg += `✨ *Cravings & Pamper Treats Picked:*\n${selectedTreats.map((t) => `• ${t}`).join('\n')}\n\n`;
    }

    if (customTreat.trim()) {
      msg += `💌 *Special Wish:* "${customTreat.trim()}"\n\n`;
    }

    msg += `Please spoil me today, my love! Can't wait! 🧸🍫😘`;

    window.open(
      `https://wa.me/${DATA.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
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
            <span>⏳</span> OUR TIME-LOCKED VAULT
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
          className="font-hand text-lg sm:text-xl text-warm-200 mb-6 sm:mb-8 max-w-lg"
        >
          Locked capsules that open only when the calendar reaches our sacred days
        </motion.p>

        {/* Discreet Master Key Bypass / Preview Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setOverrideKey(!overrideKey)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
              overrideKey
                ? 'bg-amber-400 text-stone-950 border-amber-300 font-semibold shadow-md shadow-amber-400/20'
                : 'bg-stone-900/80 text-warm-300/70 border-white/10 hover:border-amber-400/30'
            }`}
          >
            <span>🗝️</span>
            <span>{overrideKey ? "Preview Mode Active (Unlocked)" : "Preview Unlocked Mode (Mudassir's Key)"}</span>
          </button>

          {overrideKey && (
            <div className="inline-flex rounded-full bg-stone-900 p-0.5 border border-white/10 text-[11px]">
              <button
                onClick={() => setPreviewMode('pamper')}
                className={`px-2.5 py-1 rounded-full ${previewMode === 'pamper' ? 'bg-rose-600 text-white font-bold' : 'text-warm-300'}`}
              >
                15th Pamper
              </button>
              <button
                onClick={() => setPreviewMode('sunday')}
                className={`px-2.5 py-1 rounded-full ${previewMode === 'sunday' ? 'bg-rose-600 text-white font-bold' : 'text-warm-300'}`}
              >
                Sunday
              </button>
              <button
                onClick={() => setPreviewMode('milestone')}
                className={`px-2.5 py-1 rounded-full ${previewMode === 'milestone' ? 'bg-rose-600 text-white font-bold' : 'text-warm-300'}`}
              >
                Milestone
              </button>
            </div>
          )}
        </div>

        {/* ── Dynamic State Rendering ── */}
        <div className="w-full max-w-xl">
          {isUnlocked ? (
            /* ═══ UNLOCKED STATE (Priority 1, 2, or 3) ═══ */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-300/40 text-left shadow-2xl relative overflow-hidden"
            >
              {/* Top Shimmer Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                  {isMilestone || (overrideKey && previewMode === 'milestone')
                    ? 'PRIORITY 1 • MILESTONE UNLOCKED'
                    : isMonthly15th || (overrideKey && previewMode === 'pamper')
                    ? 'PRIORITY 2 • 15TH PAMPER DAY'
                    : 'PRIORITY 3 • SUNDAY VAULT'}
                </span>
                <span className="text-2xl animate-bounce">
                  {isMilestone || (overrideKey && previewMode === 'milestone')
                    ? '💖'
                    : isMonthly15th || (overrideKey && previewMode === 'pamper')
                    ? '🧸'
                    : '✨'}
                </span>
              </div>

              {/* Priority 1 Message */}
              {(isMilestone || (overrideKey && previewMode === 'milestone')) && (
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 text-gradient-gold">
                    {matchedMilestone ? matchedMilestone.title : specialDates[0]?.title || 'Milestone Special'}
                  </h3>
                  <p className="font-hand text-xl text-warm-100 leading-relaxed mb-4">
                    "{matchedMilestone ? matchedMilestone.message : specialDates[0]?.message}"
                  </p>
                </div>
              )}

              {/* Priority 2 Message */}
              {(isMonthly15th || (overrideKey && previewMode === 'pamper')) && (
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 text-rose-300">
                    {matchedPamper?.title || 'Your Monthly Comfort & Pamper Capsule 🧸🍫'}
                  </h3>
                  <p className="font-hand text-lg sm:text-xl text-warm-100 leading-relaxed mb-4">
                    "{matchedPamper?.message}"
                  </p>
                </div>
              )}

              {/* Priority 3 Message */}
              {(isSunday || (overrideKey && previewMode === 'sunday')) &&
                !isMilestone &&
                !isMonthly15th && (
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-300 mb-3">
                      Happy Sunday, Saizzu! 🌸
                    </h3>
                    <p className="font-hand text-xl text-warm-100 leading-relaxed mb-4">
                      "{matchedSunday}"
                    </p>
                  </div>
                )}

              {/* ── Interactive Treat Selector & Custom Input (Upgraded for All Unlocked States) ── */}
              <div className="mt-5 pt-5 border-t border-white/10 text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                    <span>🎁</span>
                    <span>Pick What You Want to Be Pampered With:</span>
                  </span>
                  {selectedTreats.length > 0 && (
                    <span className="text-[11px] font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-400/20">
                      {selectedTreats.length} selected
                    </span>
                  )}
                </div>

                {/* Quick-Pick Multi-Select Toggle Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {TREAT_OPTIONS.map((item, idx) => {
                    const isSelected = selectedTreats.includes(item);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleTreat(item)}
                        className={`px-3 py-1.5 rounded-2xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/40 ring-2 ring-rose-300/50 scale-[1.02]'
                            : 'bg-white/5 text-warm-200 border border-white/10 hover:bg-white/10 hover:border-amber-400/30'
                        }`}
                      >
                        <span>{isSelected ? '✓' : '+'}</span>
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Wish / Craving Text Input */}
                <div className="mb-5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-warm-300/80 mb-1.5">
                    Or write any custom wish, craving, or mood: 💭
                  </label>
                  <input
                    type="text"
                    value={customTreat}
                    onChange={(e) => setCustomTreat(e.target.value)}
                    placeholder="e.g., Dairy Milk Silk, Butterscotch ice cream, or a late-night walk..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-900/90 border border-white/15 text-warm-100 placeholder-warm-400/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  />
                </div>

                {/* Dynamic WhatsApp Claim Button */}
                <button
                  type="button"
                  onClick={handleClaimDynamicTreat}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-rose-950/40 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span>Claim My Pamper / Special Treat 💌</span>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-warm-300/60">
                <span>Unlocked on {now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                <span className="font-hand text-amber-300 text-sm">Always yours, Mudassir ♥</span>
              </div>
            </motion.div>
          ) : (
            /* ═══ LOCKED STATE: FROSTED GLASS & COUNTDOWN ═══ */
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 backdrop-blur-xl text-center relative overflow-hidden shadow-2xl">
              {/* Lock Badge */}
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-900/80 border border-amber-400/30 flex items-center justify-center text-3xl mb-4 shadow-inner">
                🔒
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
                CAPSULE CURRENTLY SEALED
              </span>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                Time-Locked Love Note
              </h3>

              {/* Softly Blurred Preview Text */}
              <p className="font-hand text-base sm:text-lg text-warm-200/40 select-none blur-[4px] pointer-events-none mb-6">
                "Words fall short when I try to describe how special today is for us... Take good care of yourself today, my strong girl..."
              </p>

              {/* Live Ticking Countdown Box */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto mb-6">
                {[
                  { val: days, label: 'DAYS' },
                  { val: hours, label: 'HOURS' },
                  { val: minutes, label: 'MINS' },
                  { val: seconds, label: 'SECS' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-3 rounded-2xl bg-stone-900/90 border border-amber-400/20 flex flex-col items-center"
                  >
                    <span className="font-mono text-xl sm:text-2xl font-bold text-gradient-gold">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono text-warm-400/70">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtle Pill Badge for Next Unlock */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-200">
                <span>Next unlock:</span>
                <span className="font-bold text-amber-300">{nextUnlock.label}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
