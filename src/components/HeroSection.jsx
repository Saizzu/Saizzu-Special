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
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #110A18 0%, #1A0F24 100%)' }}
    >
      {/* ── animated gradient mesh bg ─────────────────────── */}
      <div
        className="absolute inset-0 opacity-30 animate-gradient-shift"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, #4A1942 0%, transparent 60%),' +
            'radial-gradient(ellipse at 80% 30%, #6B1D3A 0%, transparent 55%),' +
            'radial-gradient(ellipse at 50% 80%, #2D1B3D 0%, transparent 60%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* ── content ───────────────────────────────────────── */}
      <div className="relative z-10 px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">

        {/* pill badge */}
        <motion.span
          {...fadeUp(0)}
          className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase
                     border border-love-500/30 text-love-300 bg-love-500/10 backdrop-blur-sm"
        >
          made with love ♥
        </motion.span>

        {/* partner name — massive */}
        <motion.h1
          {...fadeUp(0.3)}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none animate-float-slow break-words max-w-full px-2"
          style={{
            background: 'linear-gradient(135deg, #E11D48, #FB7185, #FDA4AF, #E11D48)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'floatSlow 8s ease-in-out infinite, gradientShift 6s ease-in-out infinite',
          }}
        >
          {DATA.heroName || DATA.partnerName}
        </motion.h1>

        {/* headline */}
        <motion.h2
          {...fadeUp(0.6)}
          className="font-display text-2xl md:text-3xl text-gold-500"
        >
          {DATA.heroHeadline}
        </motion.h2>

        {/* subtext */}
        <motion.p
          {...fadeUp(0.9)}
          className="font-hand text-lg md:text-xl leading-relaxed max-w-xl"
          style={{ color: '#FFF3E8' }}
        >
          {DATA.heroSubtext}
        </motion.p>
      </div>

      {/* ── scroll indicator ──────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-gold-500/60 text-xs tracking-widest uppercase">Scroll</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gold-500/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}

export default HeroSection;
