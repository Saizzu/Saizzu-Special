import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = password.trim().toLowerCase();

    if (cleanInput === 'iloveyoushaista') {
      setIsSuccess(true);
      setError(false);

      // Heart confetti explosion
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#FB7185', '#FDA4AF', '#F43F5E', '#FCD34D'],
        shapes: ['circle'],
        scalar: 1.3,
      });

      setTimeout(() => {
        localStorage.setItem('saizzu_auth_unlocked', 'true');
        onUnlock();
      }, 900);
    } else {
      setError(true);
      // Trigger subtle vibration if supported on mobile
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(200);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #261129 0%, #160A1C 50%, #0D0412 100%)',
      }}
    >
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-rose-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating subtle hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute text-rose-500/20 text-xl animate-float-slow select-none"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 92}%`,
              animationDelay: `${i * 0.7}s`,
              fontSize: `${14 + (i % 3) * 8}px`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={
          error
            ? { x: [-10, 10, -8, 8, -4, 4, 0], transition: { duration: 0.45 } }
            : { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
        }
        className="relative z-10 w-full max-w-md bg-stone-950/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center"
      >
        {/* Animated Padlock Badge */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 p-[2px] shadow-lg shadow-rose-600/30 mb-5 flex items-center justify-center">
          <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
            {isSuccess ? '💖' : '🔒'}
          </div>
        </div>

        {/* Header */}
        <span className="inline-block px-3.5 py-1 rounded-full text-[11px] tracking-widest uppercase border border-rose-500/30 text-rose-300 bg-rose-500/10 mb-3">
          FOR SHAISTA'S EYES ONLY ♥
        </span>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          Private Love Space
        </h1>

        <p className="font-hand text-base sm:text-lg text-warm-200/90 mb-6 leading-relaxed">
          {isSuccess
            ? 'Correct password! Opening our special universe, Saizzu... ✨'
            : 'Enter our secret phrase to unlock this surprise from Mudassir.'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter secret password..."
              autoFocus
              disabled={isSuccess}
              className={`w-full px-4 py-3 sm:py-3.5 pr-11 rounded-2xl bg-stone-900/90 border text-warm-100 placeholder-warm-400/40 text-sm sm:text-base focus:outline-none transition-all duration-300 ${
                error
                  ? 'border-red-500/80 ring-2 ring-red-500/30 shadow-red-500/20'
                  : 'border-rose-400/30 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400/60 hover:text-warm-200 text-sm px-1.5 py-1 transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-xs sm:text-sm text-rose-400 font-medium"
              >
                Wrong password, my love! Try again 💕
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSuccess || !password.trim()}
            className={`w-full py-3 sm:py-3.5 rounded-2xl font-display font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isSuccess
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-rose-500 text-white shadow-rose-600/30 hover:shadow-rose-600/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isSuccess ? (
              <span>Unlocked with Love! 💖</span>
            ) : (
              <>
                <span>Unlock My Heart</span>
                <span>✨</span>
              </>
            )}
          </button>
        </form>

        {/* Password Hint Toggle */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-300/80 hover:text-amber-200 underline underline-offset-4 transition-colors"
          >
            {showHint ? 'Hide hint' : 'Need a hint? 💡'}
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-xs text-warm-300/80 bg-stone-900/60 p-2.5 rounded-xl border border-amber-300/20"
              >
                <p>
                  "3 words declaring my feelings for you (no spaces, all lowercase)"
                </p>
                <p className="text-[11px] text-amber-400 mt-1">
                  iloveyou... ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cute footer note */}
        <p className="mt-5 text-[11px] text-warm-400/50 font-mono">
          Made exclusively for Shaista by Mudassir 💍
        </p>
      </motion.div>
    </div>
  );
}
