import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DATA from '../data.js';

export default function MusicPlayer() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs = DATA.songs;
  const currentSong = songs[activeTrack];

  const handleTrackClick = (index) => {
    if (activeTrack === index && isPlaying) {
      setIsPlaying(false);
    } else {
      setActiveTrack(index);
      setIsPlaying(true);
    }
  };

  return (
    <section className="section-dark py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-2 sm:mb-3"
          >
            <span className="pill-badge pill-badge-dark text-xs">
              <span>🎵</span> SIDE A • {songs.length} TRACKS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-1.5 sm:mb-3"
          >
            {DATA.playlistTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-hand text-lg sm:text-xl text-warm-200"
          >
            {DATA.playlistSubtitle} — Plays right here in your browser
          </motion.p>
        </div>

        {/* Player Layout: Turntable / Vinyl Left + Tracklist Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Vinyl Disc Showcase (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative group cursor-pointer"
              title="Click to play / pause"
            >
              {/* Spinning Vinyl Record */}
              <div
                className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full relative shadow-2xl flex items-center justify-center border-4 border-stone-800 transition-transform ${
                  isPlaying ? 'animate-vinyl-spin' : 'hover:scale-105'
                }`}
                style={{
                  background:
                    'radial-gradient(circle, #2a2a2a 0%, #151515 40%, #0d0d0d 60%, #1a1a1a 80%, #000 100%)',
                  boxShadow:
                    '0 0 0 6px rgba(255,255,255,0.03), 0 0 0 14px rgba(255,255,255,0.02), 0 20px 40px rgba(0,0,0,0.8)',
                }}
              >
                {/* Vinyl Grooves concentric rings */}
                <div className="absolute inset-3 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-7 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-11 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-15 rounded-full border border-white/5 pointer-events-none" />

                {/* Center Album Art Label */}
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-amber-300/70 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden shadow-inner"
                  style={{ backgroundColor: currentSong.color || '#E11D48' }}
                >
                  <span className="text-white text-[11px] sm:text-xs font-bold leading-tight truncate max-w-[70px] sm:max-w-[80px]">
                    {currentSong.title}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-white/80 truncate max-w-[70px] sm:max-w-[80px]">
                    {currentSong.artist}
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full bg-stone-900 border border-stone-600 mt-1" />
                </div>
              </div>

              {/* Tonearm visual indicator */}
              <div
                className={`absolute -top-3 right-4 w-14 sm:w-16 h-24 sm:h-28 pointer-events-none transition-transform duration-500 origin-top-right ${
                  isPlaying ? 'rotate-12' : '-rotate-6'
                }`}
              >
                <div className="w-1.5 h-20 sm:h-24 bg-stone-300 rounded mx-auto shadow-md" />
                <div className="w-3 h-5 bg-amber-400 rounded-sm -mt-1 mx-auto" />
              </div>

              {/* Center Play/Pause Overlay indicator when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center text-xl shadow-lg pl-1">
                    ▶
                  </span>
                </div>
              )}
            </div>

            {/* Currently Playing Status & Equalizer */}
            <div className="mt-4 sm:mt-6 text-center">
              <div className="flex items-center justify-center gap-1.5 h-5 mb-1.5">
                {[0.4, 0.8, 0.6, 1.0, 0.5, 0.9, 0.3].map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${
                      isPlaying ? 'animate-equalizer' : 'h-1'
                    }`}
                    style={{
                      animationDelay: `${idx * 0.15}s`,
                      height: isPlaying ? undefined : '4px',
                    }}
                  />
                ))}
              </div>
              <p className="font-display text-base sm:text-lg text-white font-semibold">
                {currentSong.title}
              </p>
              <p className="text-xs sm:text-sm text-warm-300/80">{currentSong.artist}</p>
            </div>

            {/* In-Browser Native Audio/Video Player */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-[280px] sm:max-w-xs mt-3 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-black"
                >
                  <iframe
                    key={`${currentSong.youtubeId}-${currentSong.startTime || 0}`}
                    width="100%"
                    height="140"
                    src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&enablejsapi=1${
                      currentSong.startTime ? `&start=${currentSong.startTime}` : ''
                    }`}
                    title={currentSong.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  />
                  <div className="px-3 py-1.5 bg-stone-900 flex items-center justify-between text-[11px] text-warm-200">
                    <span>Playing in browser 🎵</span>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-rose-400 hover:text-rose-300 font-bold"
                    >
                      Close ✕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tracklist List (7 cols) */}
          <div className="md:col-span-7 space-y-2.5 sm:space-y-3">
            {songs.map((song, index) => {
              const isSelected = activeTrack === index;
              const isThisPlaying = isSelected && isPlaying;

              return (
                <div
                  key={index}
                  onClick={() => handleTrackClick(index)}
                  className={`cursor-pointer p-3 sm:p-4 rounded-2xl transition-all duration-300 border ${
                    isSelected
                      ? 'glass-card border-amber-400/70 bg-white/10 shadow-lg ring-1 ring-amber-400/30'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs sm:text-sm font-bold text-amber-400/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-display text-sm sm:text-lg font-bold text-white truncate">
                          {song.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-warm-300/80 font-medium truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    {/* In-Browser Direct Play Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrackClick(index);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow transition-all flex-shrink-0 ${
                        isThisPlaying
                          ? 'bg-amber-400 text-stone-950 shadow-amber-400/30 animate-pulse'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                      }`}
                    >
                      <span>{isThisPlaying ? '⏸' : '▶'}</span>
                      <span>{isThisPlaying ? 'Playing' : 'Play Here'}</span>
                    </button>
                  </div>

                  {/* Personal Memory / Note */}
                  <p className="font-hand text-sm sm:text-base text-warm-200 mt-2 pl-6 sm:pl-7 border-l-2 border-amber-400/40">
                    "{song.reason}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
