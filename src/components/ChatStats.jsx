import React from 'react';
import { motion } from 'framer-motion';
import DATA from '../data.js';

export default function ChatStats() {
  const { chatStats } = DATA;

  return (
    <section className="section-dark py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-rose-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-amber-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-2 sm:mb-3"
          >
            <span className="pill-badge pill-badge-dark text-xs">
              <span>📊</span> Our Chat Wrapped
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-2 sm:mb-3"
          >
            Our Story in Numbers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-hand text-lg sm:text-xl text-warm-200"
          >
            Every message, every late-night call, and every single "hmmm" between us
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Total Messages (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="sm:col-span-2 glass-card p-6 sm:p-8 flex flex-col justify-between hover:border-rose-400/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-warm-300/70 font-semibold">
                Total Words of Love
              </span>
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <span className="font-mono text-5xl sm:text-6xl font-extrabold text-gradient-rose tracking-tight block">
                {chatStats.totalMessages}
              </span>
              <p className="font-hand text-lg text-warm-200 mt-2">
                Messages typed with love, laughter, and endless care
              </p>
            </div>
          </motion.div>

          {/* Card 2: Daily Average */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-warm-300/70 font-semibold">
                Daily Average
              </span>
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-amber-300 block">
                ~{chatStats.dailyAverage}
              </span>
              <p className="font-hand text-base text-warm-200 mt-2">
                texts exchanged every single day
              </p>
            </div>
          </motion.div>

          {/* Card 3: Peak Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 flex flex-col justify-between hover:border-rose-400/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-warm-300/70 font-semibold">
                Busiest Hours
              </span>
              <span className="text-2xl">⏰</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-rose-300 block leading-tight">
                {chatStats.busiestHours}
              </span>
              <p className="font-hand text-base text-warm-200 mt-2">
                First thing in the morning & late night talks
              </p>
            </div>
          </motion.div>

          {/* Card 4: Split Bar - Who Texts More (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="sm:col-span-2 glass-card p-6 sm:p-8 hover:border-rose-400/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-warm-300/70 font-semibold">
                Who Texts More?
              </span>
              <span className="text-xs text-rose-300 font-mono">50% / 50%</span>
            </div>

            {/* Split Progress Bar */}
            <div className="w-full h-4 bg-stone-900 rounded-full overflow-hidden flex mb-3 p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-l-full flex items-center justify-center text-[10px] text-white font-bold"
                style={{ width: '50%' }}
              >
                Mudassir 50%
              </div>
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-r-full flex items-center justify-center text-[10px] text-stone-950 font-bold"
                style={{ width: '50%' }}
              >
                Shaista 50%
              </div>
            </div>

            <p className="font-hand text-lg text-center text-warm-100">
              ⚖️ Perfectly balanced — two hearts beating at the exact same rhythm
            </p>
          </motion.div>

          {/* Card 5: Most Used Word */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-warm-300/70 font-semibold">
                Our Signature Word
              </span>
              <span className="text-2xl">💭</span>
            </div>
            <div>
              <span className="font-display text-4xl sm:text-5xl font-black text-amber-300 italic block">
                "{chatStats.mostUsedWord}"
              </span>
              <p className="font-hand text-base text-warm-200 mt-2">
                Says a thousand unspoken feelings
              </p>
            </div>
          </motion.div>

          {/* Card 6: Favorite Emojis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="glass-card p-6 flex flex-col justify-between hover:border-rose-400/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-warm-300/70 font-semibold">
                Top Emojis
              </span>
              <span className="text-2xl">✨</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2">
              {chatStats.favoriteEmojis.map((emoji, idx) => (
                <span
                  key={idx}
                  className="text-3xl hover:scale-125 transition-transform duration-200 cursor-default"
                >
                  {emoji}
                </span>
              ))}
            </div>
            <p className="font-hand text-sm text-center text-warm-300/80">
              Our emotional vocabulary
            </p>
          </motion.div>

          {/* Card 7: Total Calls (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="sm:col-span-2 glass-card p-6 sm:p-8 flex items-center justify-between hover:border-rose-400/30 transition-all duration-300"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-warm-300/70 font-semibold block mb-1">
                Hours on Call
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-4xl sm:text-5xl font-bold text-rose-300">
                  {chatStats.totalCalls}
                </span>
                <span className="text-warm-300 text-sm">calls connected</span>
              </div>
              <p className="font-hand text-base text-warm-200 mt-2">
                Longest call: <strong className="text-amber-300">{chatStats.longestCall}</strong> of never wanting to hang up
              </p>
            </div>
            <span className="text-5xl opacity-80">📞</span>
          </motion.div>

          {/* Card 8: The Punchline / Inside Joke (Span 2 or 4 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="sm:col-span-2 lg:col-span-4 glass-card p-6 sm:p-8 border-amber-400/40 bg-gradient-to-r from-rose-950/40 via-amber-950/30 to-rose-950/40 hover:border-amber-400/60 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <span className="text-5xl">😴</span>
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                    Our Greatest Ongoing Mystery
                  </span>
                  <h3 className="font-hand text-2xl sm:text-3xl text-rose-200 mt-1">
                    "{chatStats.funStat.label}"
                  </h3>
                  <p className="font-hand text-lg sm:text-xl text-warm-200 mt-1 max-w-xl">
                    Whether it's 6 AM or midnight, whenever I say <em>"please sona mat, baat karni hai"</em> because I want to hear your voice... despite knowing this, you still don't listen and always fall straight asleep! 😂💕
                  </p>
                </div>
              </div>

              <div className="px-6 py-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex-shrink-0">
                <span className="font-mono text-3xl font-extrabold text-amber-300">
                  {chatStats.funStat.value}
                </span>
                <span className="block text-[11px] uppercase tracking-wider text-amber-200/80 mt-0.5">
                  Sleep Score
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
