import { motion } from 'framer-motion';
import DATA from '../data.js';

// ── Closing Note — dark final section with scroll-triggered entrance ──

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut', delay },
});

function ClosingNote() {
  return (
    <section
      className="relative py-14 sm:py-24 md:py-32 overflow-hidden px-4"
      /* Background flows from active theme */
    >
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-5 sm:gap-8">

        {/* ── section heading ──────────────────────────────── */}
        <motion.h2
          {...inView(0)}
          className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #D4A574, #FBBF24, #D4A574)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 6s ease-in-out infinite',
          }}
        >
          Until Forever &amp; Beyond
        </motion.h2>

        {/* ── heart divider ───────────────────────────────── */}
        <motion.div
          {...inView(0.15)}
          className="flex items-center gap-3 w-full max-w-xs"
        >
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="text-love-400 text-lg">❤</span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
        </motion.div>

        {/* ── closing note body ────────────────────────────── */}
        <motion.p
          {...inView(0.3)}
          className="font-hand text-xl md:text-2xl leading-relaxed text-stone-800 dark:text-[#FFF3E8]"
        >
          {DATA.closingNote}
        </motion.p>

        {/* ── sign-off ────────────────────────────────────── */}
        <motion.p
          {...inView(0.45)}
          className="italic text-amber-800 dark:text-gold-500 text-base md:text-lg"
        >
          {DATA.signOff}
        </motion.p>

        {/* ── signature with floating hearts ──────────────── */}
        <motion.div {...inView(0.6)} className="relative inline-block">
          {/* tiny floating hearts */}
          {['❤', '♥', '❤'].map((h, i) => (
            <span
              key={i}
              className="absolute text-love-400/40 text-sm pointer-events-none select-none"
              style={{
                top: `${-8 + i * 14}px`,
                left: i === 1 ? '-24px' : 'auto',
                right: i !== 1 ? `${-18 - i * 6}px` : 'auto',
                animation: `floatSlow ${7 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            >
              {h}
            </span>
          ))}

          <span
            className="font-display text-3xl md:text-4xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #E11D48, #FB7185, #FDA4AF, #E11D48)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 6s ease-in-out infinite',
            }}
          >
            {DATA.signName}
          </span>
        </motion.div>

        {/* ── footer credit ───────────────────────────────── */}
        <motion.p
          {...inView(0.75)}
          className="mt-8 text-xs tracking-widest text-stone-600 dark:text-gold-500/40"
        >
          Made with <span className="text-love-400">♥</span> by Mudassir
        </motion.p>
      </div>
    </section>
  );
}

export default ClosingNote;
