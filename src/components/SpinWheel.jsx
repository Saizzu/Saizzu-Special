import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [winningIndex, setWinningIndex] = useState(null);
  const [rotationDegree, setRotationDegree] = useState(0);

  const items = DATA.wheelItems;
  const numSegments = items.length;
  const segmentAngle = 360 / numSegments;

  // Short clean labels for inside the wheel wedges
  const shortLabels = [
    'Food Treat',
    'Movie Night',
    'Video Call',
    'Wishlist Gift',
    'Love Letter',
    'Next Meet-Up',
    'Golden Ticket',
  ];

  const spinTheWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    // Pick winning index
    const chosenIndex = Math.floor(Math.random() * numSegments);

    // 5 full rotations (1800) + target wedge adjustment so the top needle (at 0° / 12 o'clock) lands on winning wedge
    const extraSpins = 360 * 5;
    const targetAngle = 360 - (chosenIndex * segmentAngle + segmentAngle / 2);
    const totalRotation = rotationDegree + extraSpins + (targetAngle - (rotationDegree % 360));

    setRotationDegree(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setWinningIndex(chosenIndex);

      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D4A574', '#E11D48', '#FBBF24', '#FB7185', '#FFF1F2'],
      });
    }, 4500);
  };

  // Helper to calculate SVG wedge path
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', x, y,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z',
    ].join(' ');
  };

  const winningItem = winningIndex !== null ? items[winningIndex] : null;

  return (
    <section className="section-dark py-12 sm:py-20 px-3 sm:px-6 relative overflow-hidden text-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-rose-950/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-dark text-xs">
            <span>🎡</span> Date & Gift Roulette
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-rose-950 dark:text-gradient-gold mb-2 sm:mb-3"
        >
          Spin for Your Surprise
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-2xl text-stone-800 dark:text-warm-200 mb-6 sm:mb-10 max-w-xl mx-auto"
        >
          {DATA.wheelNote}
        </motion.p>

        {/* Wheel Container with Pointer */}
        <div className="relative inline-flex flex-col items-center justify-center my-2">
          {/* Top Indicator Needle */}
          <div className="relative z-30 -mb-4 drop-shadow-xl">
            <svg width="36" height="42" viewBox="0 0 36 42" fill="none">
              <path
                d="M18 42L4 8C2 4 5 0 9 0H27C31 0 34 4 32 8L18 42Z"
                fill="url(#needleGrad)"
                stroke="#FFE082"
                strokeWidth="2"
              />
              <circle cx="18" cy="12" r="5" fill="#881337" />
              <defs>
                <linearGradient id="needleGrad" x1="18" y1="0" x2="18" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE68A" />
                  <stop offset="0.5" stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* High-Resolution SVG Wheel */}
          <div className="relative p-2 rounded-full bg-gradient-to-br from-amber-300 via-rose-500 to-amber-600 shadow-2xl shadow-rose-950/80">
            <svg
              className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden"
              viewBox="0 0 400 400"
              style={{
                transform: `rotate(${rotationDegree}deg)`,
                transition: isSpinning
                  ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)'
                  : 'none',
              }}
            >
              {/* Outer Golden Border Circle */}
              <circle cx="200" cy="200" r="198" fill="none" stroke="#D4A574" strokeWidth="4" />

              {/* Segments */}
              {items.map((item, idx) => {
                const startAngle = idx * segmentAngle;
                const endAngle = (idx + 1) * segmentAngle;
                const midAngle = startAngle + segmentAngle / 2;
                const pathData = describeArc(200, 200, 196, startAngle, endAngle);

                return (
                  <g key={idx}>
                    {/* Wedge Slice */}
                    <path
                      d={pathData}
                      fill={item.color}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      opacity="0.95"
                    />

                    {/* Wedge Content Rotated to Mid-Angle */}
                    <g transform={`rotate(${midAngle}, 200, 200)`}>
                      {/* Emoji */}
                      <text
                        x="200"
                        y="55"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="26"
                        className="select-none pointer-events-none"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                      >
                        {item.emoji}
                      </text>

                      {/* Clean Short Label */}
                      <text
                        x="200"
                        y="88"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#FFFFFF"
                        fontSize="12"
                        fontWeight="800"
                        fontFamily="'Inter', sans-serif"
                        className="select-none pointer-events-none uppercase tracking-wider"
                        style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}
                      >
                        {shortLabels[idx] || item.label}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Center Golden Medallion */}
              <circle cx="200" cy="200" r="42" fill="#1C0F28" stroke="#FDE68A" strokeWidth="4" />
              <circle cx="200" cy="200" r="34" fill="url(#centerGrad)" />
              <text
                x="200"
                y="203"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="24"
                fill="#881337"
                className="select-none pointer-events-none font-bold"
              >
                ♥
              </text>

              <defs>
                <linearGradient id="centerGrad" x1="166" y1="166" x2="234" y2="234" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE68A" />
                  <stop offset="0.5" stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Spin Action Button */}
        <div className="mt-8 mb-12">
          <button
            onClick={spinTheWheel}
            disabled={isSpinning || hasSpun}
            className={`px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-display text-base sm:text-lg font-bold shadow-xl transition-all duration-300 ${
              hasSpun
                ? 'bg-stone-800 text-stone-700 dark:text-warm-300/80 border border-warm-700/50 cursor-not-allowed'
                : isSpinning
                ? 'bg-amber-500/80 text-stone-950 cursor-wait animate-pulse'
                : 'bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-white hover:shadow-rose-500/40 hover:scale-105 active:scale-95'
            }`}
          >
            {hasSpun
              ? '✨ Destiny Has Spoken!'
              : isSpinning
              ? 'Spinning for you, Saizzu...'
              : 'Spin the Wheel 🎡'}
          </button>
        </div>

        {/* Winner Announcement Card */}
        <AnimatePresence>
          {winningItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="p-6 sm:p-8 bg-[#FFD6E0]/90 dark:glass-card border-2 border-rose-400/80 dark:border-amber-400/80 max-w-lg mx-auto mb-12 shadow-md dark:shadow-2xl"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs uppercase font-bold tracking-widest mb-2 border border-amber-400/30">
                🎉 Your Claimed Prize
              </div>
              <div className="flex items-center justify-center gap-3 my-3">
                <span className="text-4xl sm:text-5xl">{winningItem.emoji}</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-rose-950 dark:text-white">
                  {winningItem.label}
                </h3>
              </div>
              <p className="font-hand text-xl text-stone-800 dark:text-warm-200 mt-2">
                "A promise is a promise, Babu. Screenshot this and send it to me whenever you want to redeem it! 💕"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Visible Prize Menu (Ensures 100% of all options are readable & clear) */}
        <div className="text-left mt-8 pt-8 border-t border-white/10">
          <p className="text-xs uppercase tracking-widest text-stone-700 dark:text-rose-900/90 dark:text-warm-300/70 font-semibold text-center mb-6">
            ✦ All 7 Wheel Prizes &amp; Promises ✦
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item, idx) => {
              const isWinner = winningIndex === idx;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 border ${
                    isWinner
                      ? 'bg-amber-400/20 border-amber-400 shadow-lg shadow-amber-400/20 scale-[1.02]'
                      : 'bg-[#FFC4D3]/50 hover:bg-[#FFB3C6]/60 dark:bg-white/5 dark:hover:bg-white/10 border border-rose-300/60 dark:border-white/10'
                  }`}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: `${item.color}33` }}
                  >
                    {item.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 dark:text-white truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-stone-700 dark:text-warm-300/70 font-hand">
                      {isWinner ? '★ WON! Redeemable with Mudassir' : `Slot 0${idx + 1}`}
                    </p>
                  </div>
                  {isWinner && (
                    <span className="text-amber-400 font-bold text-xs uppercase px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/40">
                      Won
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
