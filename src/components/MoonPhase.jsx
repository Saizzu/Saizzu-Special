import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MoonPhase() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  const handleMoonClick = () => {
    if (!isAudioActive) {
      setIsAudioActive(true);
      setIsPlaying(true);
    } else {
      togglePlayPause();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        '*'
      );
      setIsPlaying(false);
    } else {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      );
      setIsPlaying(true);
    }
  };

  const handleStop = (e) => {
    e.stopPropagation();
    setIsAudioActive(false);
    setIsPlaying(false);
  };

  return (
    <section className="section-dark py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
      {/* Hidden YouTube audio stream (no video visible, audio only) */}
      {isAudioActive && (
        <iframe
          ref={iframeRef}
          key="moon-audio-stream"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
          src="https://www.youtube.com/embed/CROUI2z_dVY?autoplay=1&enablejsapi=1&start=44"
          title="Moon Background Melody"
          allow="autoplay; encrypted-media"
        />
      )}

      {/* Starfield twinkling points */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-dark text-xs">
            <span>🌙</span> Celestial Witness
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-2 sm:mb-3"
        >
          The Moon That Night
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-warm-200 mb-6 sm:mb-8 max-w-lg"
        >
          November 26, 2023 — The exact sky that looked down upon our beginning
        </motion.p>

        {/* Moon Visual Container */}
        <div className="w-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onClick={handleMoonClick}
            className="relative flex items-center justify-center cursor-pointer group select-none"
            title="Click to play / pause secret melody 🎵"
          >
            {/* Soft Orbital Glow Aura */}
            <div
              className={`absolute -inset-8 sm:-inset-12 rounded-full bg-gradient-to-tr from-amber-200/25 via-rose-400/25 to-amber-100/25 blur-3xl pointer-events-none transition-all duration-700 ${
                isPlaying ? 'scale-110 opacity-100 animate-pulse' : 'scale-100 opacity-60'
              }`}
            />

            {/* Pulsing Musical Ring when playing */}
            {isPlaying && (
              <div className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-amber-300/40 animate-ping pointer-events-none" />
            )}

            {/* Glowing Circular Moon Frame */}
            <div
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full relative overflow-hidden shadow-2xl border-2 border-amber-200/50 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500"
              style={{
                boxShadow: isPlaying
                  ? '0 0 55px rgba(251, 191, 36, 0.45), 0 0 95px rgba(244, 63, 94, 0.3), inset 0 0 35px rgba(0, 0, 0, 0.7)'
                  : '0 0 40px rgba(251, 191, 36, 0.25), 0 0 75px rgba(244, 63, 94, 0.15), inset 0 0 35px rgba(0, 0, 0, 0.7)',
              }}
            >
              {/* Actual Cropped Moon Image (fits 100% edge-to-edge) */}
              <img
                src="./photos/moon.png"
                alt="Moon on November 26, 2023"
                className="w-full h-full object-cover select-none pointer-events-none"
                onError={(e) => {
                  if (!e.target.dataset.triedFallback) {
                    e.target.dataset.triedFallback = 'true';
                    e.target.src = './photos/moon.avif';
                  }
                }}
              />

              {/* Saizzu's photo layered over the moon with 30% opacity */}
              <img
                src="./photos/saizzu-moon.jpg"
                alt="Shaista (Saizzu) on the Moon"
                className="absolute inset-0 w-full h-full object-cover object-[center_32%] rounded-full select-none pointer-events-none transition-opacity duration-500"
                style={{ opacity: 0.3 }}
                onError={(e) => {
                  if (!e.target.dataset.triedAbsolute) {
                    e.target.dataset.triedAbsolute = 'true';
                    e.target.src = '/photos/saizzu-moon.jpg';
                  }
                }}
              />

              {/* Subtle inner spherical vignette & rim glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow:
                    'inset 0 0 35px rgba(18, 9, 26, 0.8), inset -12px -12px 35px rgba(0,0,0,0.6)',
                }}
              />

              {/* Center Play Icon on Hover when audio is stopped */}
              {!isAudioActive && (
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                  <span className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center text-xl shadow-lg pl-1">
                    ▶
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Prompt / Audio Controls */}
          <div className="mt-4 sm:mt-5">
            <AnimatePresence mode="wait">
              {!isAudioActive ? (
                <motion.button
                  key="prompt-btn"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  onClick={handleMoonClick}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-amber-300/20 text-xs sm:text-sm text-amber-200/90 transition-all hover:scale-105"
                >
                  <span className="animate-pulse">✨</span>
                  <span>Tap the moon to play our song</span>
                  <span>🎵</span>
                </motion.button>
              ) : (
                <motion.div
                  key="active-player"
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-stone-900/90 border border-amber-400/50 shadow-xl backdrop-blur-md"
                >
                  {/* Equalizer animation */}
                  <div className="flex items-center gap-1 h-3.5 px-1">
                    {[0.4, 0.9, 0.6, 1.0, 0.5].map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${
                          isPlaying ? 'animate-equalizer' : 'h-1'
                        }`}
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          height: isPlaying ? undefined : '3px',
                        }}
                      />
                    ))}
                  </div>

                  <span className="text-xs sm:text-sm font-display font-medium text-amber-200">
                    {isPlaying ? 'Playing Secret Moon Song' : 'Moon Song Paused'}
                  </span>

                  {/* Play / Pause Toggle Button */}
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow transition-all flex items-center gap-1"
                    title={isPlaying ? 'Pause song' : 'Resume song'}
                  >
                    <span>{isPlaying ? '⏸' : '▶'}</span>
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  {/* Close / Stop Button */}
                  <button
                    type="button"
                    onClick={handleStop}
                    className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-warm-300 hover:text-white text-xs flex items-center justify-center transition-colors"
                    title="Stop song"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Centered Moon Phase Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center w-full mt-6 sm:mt-8 mb-5 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs sm:text-sm uppercase tracking-widest font-mono font-bold shadow-lg">
              <span>🌕</span>
              <span>Waxing Gibbous • 98% Illuminated</span>
            </div>
          </motion.div>

          {/* Romantic Quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-2 max-w-md mx-auto"
          >
            <p className="font-hand text-xl sm:text-2xl text-warm-100 leading-relaxed">
              "The same moon that lights up the sky tonight is the one that watched two souls become one."
            </p>
            <p className="font-hand text-sm sm:text-base text-rose-300/80">
              Chaand mein bhi tera hi chehra nazar aata hai... ✨
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
