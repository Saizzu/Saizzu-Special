import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DATA from '../data.js';

export default function MusicPlayer() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs = DATA.songs;
  const currentSong = songs[activeTrack];

  return (
    <section className="section-dark py-24 px-4 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-3"
          >
            <span className="pill-badge pill-badge-dark">
              <span>🎵</span> SIDE A • 4 TRACKS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-3"
          >
            {DATA.playlistTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-hand text-xl text-warm-200"
          >
            {DATA.playlistSubtitle}
          </motion.p>
        </div>

        {/* Player Layout: Turntable / Vinyl Left + Tracklist Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Vinyl Disc Showcase (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Spinning Vinyl Record */}
              <div
                className={`w-60 h-60 sm:w-72 sm:h-72 rounded-full relative shadow-2xl flex items-center justify-center border-4 border-stone-800 ${
                  isPlaying ? 'animate-vinyl-spin' : ''
                }`}
                style={{
                  background:
                    'radial-gradient(circle, #2a2a2a 0%, #151515 40%, #0d0d0d 60%, #1a1a1a 80%, #000 100%)',
                  boxShadow:
                    '0 0 0 6px rgba(255,255,255,0.03), 0 0 0 14px rgba(255,255,255,0.02), 0 20px 40px rgba(0,0,0,0.8)',
                }}
              >
                {/* Vinyl Grooves concentric rings */}
                <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />

                {/* Center Album Art Label */}
                <div
                  className="w-24 h-24 rounded-full border-2 border-amber-300/60 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden"
                  style={{ backgroundColor: currentSong.color || '#E11D48' }}
                >
                  <span className="text-white text-xs font-bold leading-tight truncate max-w-[80px]">
                    {currentSong.title}
                  </span>
                  <span className="text-[9px] text-white/80 truncate max-w-[80px]">
                    {currentSong.artist}
                  </span>
                  <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-600 mt-1" />
                </div>
              </div>

              {/* Tonearm visual indicator */}
              <div
                className={`absolute -top-3 right-4 w-16 h-28 pointer-events-none transition-transform duration-500 origin-top-right ${
                  isPlaying ? 'rotate-12' : '-rotate-6'
                }`}
              >
                <div className="w-1.5 h-24 bg-stone-300 rounded mx-auto shadow-md" />
                <div className="w-3 h-5 bg-amber-400 rounded-sm -mt-1 mx-auto" />
              </div>
            </div>

            {/* Currently Playing Status */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-1.5 h-6 mb-2">
                {[0.4, 0.8, 0.6, 1.0, 0.5, 0.9, 0.3].map((height, idx) => (
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
              <p className="font-display text-lg text-white font-semibold">
                {currentSong.title}
              </p>
              <p className="text-sm text-warm-300/80">{currentSong.artist}</p>
            </div>
          </div>

          {/* Tracklist List (7 cols) */}
          <div className="md:col-span-7 space-y-3">
            {songs.map((song, index) => {
              const isSelected = activeTrack === index;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveTrack(index);
                    setIsPlaying(true);
                  }}
                  className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 border ${
                    isSelected
                      ? 'glass-card border-amber-400/60 bg-white/10 shadow-lg'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-amber-400/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-display text-base sm:text-lg font-bold text-white">
                          {song.title}
                        </h4>
                        <p className="text-xs text-warm-300/80 font-medium">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    {/* YouTube Listen Link */}
                    <a
                      href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-medium flex items-center gap-1.5 shadow transition-colors flex-shrink-0"
                    >
                      <span>▶</span>
                      <span>Listen</span>
                    </a>
                  </div>

                  {/* Personal Memory / Note */}
                  <p className="font-hand text-base text-warm-200 mt-2 pl-7 border-l border-amber-400/30">
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
