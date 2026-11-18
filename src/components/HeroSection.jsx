import { motion } from 'framer-motion';
import DATA from '../data.js';

// ── Hero — dramatic dark opening section ──────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-start sm:justify-center text-center overflow-hidden pt-20 sm:pt-28 pb-12 sm:pb-16 px-4"
      /* Background flows from active theme */
    >
      {/* ── animated gradient mesh bg ─────────────────────── */}
      <div
        className="absolute inset-0 opacity-40 animate-gradient-shift pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 40%, #5C1D48 0%, transparent 60%),' +
            'radial-gradient(ellipse at 70% 30%, #7E1D3E 0%, transparent 55%),' +
            'radial-gradient(ellipse at 50% 75%, #381B46 0%, transparent 60%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* ── content ───────────────────────────────────────── */}
      <div className="relative z-10 px-2 sm:px-6 max-w-2xl mx-auto flex flex-col items-center gap-3.5 sm:gap-6 mt-4 sm:mt-0">

        {/* pill badge */}
        <motion.span
          {...fadeUp(0)}
          className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase
                     border border-white/30 text-white dark:text-rose-300 bg-white/20 dark:bg-love-500/10 backdrop-blur-sm"
        >
          made with love ♥
        </motion.span>

        {/* partner name — massive */}
        <motion.h1
          {...fadeUp(0.3)}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-tight sm:leading-none animate-float-slow break-words max-w-full px-2"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE4E6 40%, #FDE68A 70%, #FFFFFF 100%)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'floatSlow 8s ease-in-out infinite, gradientShift 6s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.25))',
          }}
        >
          {DATA.heroName || DATA.partnerName}
        </motion.h1>

        {/* headline */}
        <motion.h2
          {...fadeUp(0.6)}
          className="font-display text-xl sm:text-2xl md:text-3xl text-amber-200 dark:text-amber-300 font-medium drop-shadow"
        >
          {DATA.heroHeadline}
        </motion.h2>

        {/* subtext */}
        <motion.p
          {...fadeUp(0.9)}
          className="font-hand text-base sm:text-xl leading-relaxed max-w-lg sm:max-w-xl text-white/95 dark:text-warm-100/90"
        >
          {DATA.heroSubtext}
        </motion.p>
      </div>

      {/* ── scroll indicator ──────────────────────────────── */}
      <motion.div
        className="mt-8 sm:mt-12 flex flex-col items-center gap-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-white/80 dark:text-gold-500/60 text-[10px] sm:text-xs tracking-widest uppercase">Scroll to explore</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 dark:text-gold-500/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}

export default HeroSection;
