import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function CompatibilityMeter() {
  const [person1] = useState(DATA.compatPerson1 || 'Mudassir');
  const [person2, setPerson2] = useState(DATA.compatPerson2 || 'Shaista');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStep, setCalculationStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const steps = [
    'Scanning heart wavelengths...',
    'Analyzing mutual teasing and laughter...',
    'Calculating tolerance for sleeping on call 😴...',
    'Measuring unconditional loyalty & care...',
    'Consulting the destiny alignment...',
    'Result computed!',
  ];

  const handleCalculate = () => {
    if (!person2.trim() || isCalculating) return;

    setIsCalculating(true);
    setResult(null);
    setProgress(0);

    let currentStepIndex = 0;
    setCalculationStep(steps[0]);

    const interval = setInterval(() => {
      currentStepIndex += 1;
      if (currentStepIndex < steps.length) {
        setCalculationStep(steps[currentStepIndex]);
        setProgress(Math.round(((currentStepIndex + 1) / steps.length) * 100));
      } else {
        clearInterval(interval);
        setIsCalculating(false);
        setResult(DATA.compatResult || 101);

        // Confetti!
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E11D48', '#FDA4AF', '#FCD34D'],
        });
      }
    }, 600);
  };

  return (
    <section className="section-light py-12 sm:py-20 px-3 sm:px-6 text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-rose text-xs">
            <span>🔬</span> Cosmic Soulmate Algorithm
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-love-900 dark:text-rose-100 mb-2 sm:mb-3"
        >
          Love Compatibility Meter
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-700 dark:text-rose-200/90 mb-6 sm:mb-10"
        >
          Let's run our names through the love observatory
        </motion.p>

        {/* Input Names Box */}
        <div className="glass-card-light p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <label className="block text-xs uppercase tracking-wider text-warm-700/80 dark:text-rose-300/80 font-semibold mb-1 text-left">
                His Name
              </label>
              <input
                type="text"
                value={person1}
                readOnly
                className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-100/80 to-rose-50 dark:from-indigo-900/60 dark:to-slate-900/60 border-2 border-rose-300/70 dark:border-indigo-400/40 text-rose-950 dark:text-rose-200 font-display font-semibold text-center cursor-default outline-none shadow-sm"
              />
            </div>

            <div className="text-3xl animate-heartbeat text-rose-500 py-1">
              ❤️
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-xs uppercase tracking-wider text-warm-700/80 dark:text-rose-300/80 font-semibold mb-1 text-left">
                Her Name
              </label>
              <input
                type="text"
                value={person2}
                onChange={(e) => setPerson2(e.target.value)}
                placeholder="Enter her name..."
                className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50/50 dark:from-indigo-900/60 dark:to-slate-900/60 border-2 border-rose-300 dark:border-indigo-400/40 text-stone-900 dark:text-rose-100 font-display font-semibold text-center focus:ring-2 focus:ring-rose-500 outline-none shadow-sm transition-all placeholder:text-rose-400 dark:placeholder:text-indigo-300/50"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={isCalculating || !person2.trim()}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-display font-bold shadow-md hover:shadow-rose-400/30 transition-all duration-300 disabled:opacity-50"
          >
            {isCalculating ? 'Computing Resonance...' : 'Calculate Compatibility ✦'}
          </button>

          {/* Calculating Progress State */}
          {isCalculating && (
            <div className="mt-6">
              <div className="w-full h-2.5 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="font-hand text-lg text-rose-800 dark:text-rose-300 animate-pulse">
                {calculationStep}
              </p>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="mt-8 pt-6 border-t border-rose-200/60 dark:border-indigo-400/20"
            >
              {/* Radial Meter Visual */}
              <div className="relative inline-flex items-center justify-center mb-3">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-rose-100 dark:text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-rose-500"
                    strokeDasharray="364"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-4xl font-extrabold text-gradient-rose">
                    {result}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-warm-700 dark:text-rose-300 tracking-wider">
                    Off the charts
                  </span>
                </div>
              </div>

              <h4 className="font-display text-2xl font-bold text-love-900 dark:text-amber-200 mb-1">
                {DATA.compatVerdict}
              </h4>
              <p className="font-hand text-xl text-warm-800 dark:text-rose-200 max-w-md mx-auto">
                "Math cannot measure what God already destined. You and I are forever, Saizzu."
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
