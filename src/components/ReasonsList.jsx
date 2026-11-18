import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DATA from '../data.js';

export default function ReasonsList() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="section-light py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/3 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-2 sm:mb-3"
          >
            <span className="pill-badge pill-badge-rose text-xs">
              <span>💖</span> Five Beautiful Truths
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-love-900 dark:text-rose-100 mb-2 sm:mb-3"
          >
            Why My Heart Chose You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-hand text-lg sm:text-xl text-warm-700 dark:text-rose-200/90 max-w-xl mx-auto"
          >
            Just a few reasons out of thousands that I keep close to my soul
          </motion.p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-3.5 sm:space-y-6">
          {DATA.reasons.map((reason, index) => {
            const isLast = index === DATA.reasons.length - 1;
            const isExpanded = activeCard === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setActiveCard(isExpanded ? null : index)}
                className={`cursor-pointer relative p-4 sm:p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                  isLast
                    ? 'bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white shadow-xl shadow-rose-500/25 border-2 border-rose-300/40'
                    : 'bg-[#FFD6E0]/75 dark:glass-card-light backdrop-blur-md border border-rose-300/70 shadow-sm shadow-rose-300/30 hover:shadow-md'
                }`}
              >
                {/* Washi Tape on top left corner (except last) */}
                {!isLast && (
                  <div className="absolute -top-3 left-8 w-20 h-6 bg-rose-300/40 -rotate-3 rounded-sm shadow-sm backdrop-blur-sm pointer-events-none" />
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Number Badge */}
                    <span
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-lg flex-shrink-0 ${
                        isLast
                          ? 'bg-white/20 text-white'
                          : 'bg-[#FFC4D3]/80 dark:bg-indigo-900/80 text-rose-900 dark:text-rose-300'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{reason.icon}</span>
                      <h3
                        className={`font-display text-xl sm:text-2xl font-bold ${
                          isLast ? 'text-white' : 'text-stone-900 dark:text-rose-100'
                        }`}
                      >
                        {reason.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      isLast
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-100/90 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-300/60'
                    }`}
                  >
                    {isExpanded ? 'Fold ↑' : 'Read ✦'}
                  </span>
                </div>

                {/* Reason description */}
                <div
                  className={`mt-4 pt-4 border-t transition-all duration-300 ${
                    isLast
                      ? 'border-white/20 text-rose-50'
                      : 'border-rose-300/60 dark:border-indigo-400/20 text-stone-900 dark:text-rose-100'
                  }`}
                >
                  <p className="font-hand text-xl sm:text-2xl leading-relaxed">
                    "{reason.text}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="font-hand text-xl text-warm-600 dark:text-rose-300/80 italic">
            ...and a hundred thousand more reasons that words can never capture.
          </p>
        </div>
      </div>
    </section>
  );
}
