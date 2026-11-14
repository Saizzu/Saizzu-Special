import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DATA from '../data.js';

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = DATA.galleryPhotos;

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const current = photos[currentIndex];

  return (
    <section className="section-light py-24 px-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-3"
        >
          <span className="pill-badge pill-badge-rose">
            <span>📷</span> Polaroid Memories
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-love-900 mb-3"
        >
          Snapshots of Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-xl text-warm-700 mb-12"
        >
          A few frozen fragments of time that I hold closest to my heart
        </motion.p>

        {/* Polaroid Card */}
        <div className="relative inline-block w-full max-w-md mx-auto">
          {/* Washi tape on top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-rose-400/50 -rotate-2 rounded-sm shadow-sm backdrop-blur-sm z-20 pointer-events-none" />

          <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF7F0] to-[#FFEBF0] p-4 sm:p-5 pb-8 rounded-2xl shadow-2xl shadow-rose-950/15 border-2 border-rose-200/80 transform rotate-1 hover:rotate-0 transition-transform duration-300 relative">
            {/* Corner heart stamps */}
            <span className="absolute top-2 left-3 text-rose-300 text-xs select-none">♥</span>
            <span className="absolute bottom-2 right-3 text-rose-300 text-xs select-none">♥</span>
            {/* Image Container with aspect ratio */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[480px] rounded-xl overflow-hidden bg-gradient-to-br from-rose-100 via-amber-50 to-rose-200 shadow-inner flex items-center justify-center">
              {/* Photo Counter Badge */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-stone-900/60 backdrop-blur-md text-white text-xs font-mono font-medium z-10 shadow">
                ♥ {currentIndex + 1} / {photos.length}
              </div>

              {/* Photo Display / Fallback */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative flex items-center justify-center"
                >
                  <img
                    src={current.src}
                    alt={current.caption}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                  {/* Stylized Romantic Fallback Card (visible when img is placeholder/missing) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100 -z-10 pointer-events-none">
                    <span className="text-5xl mb-2">📸</span>
                    <span className="font-display text-xl font-bold text-rose-950 mb-1">
                      {DATA.partnerName} & {DATA.gifterName}
                    </span>
                    <span className="font-hand text-lg text-rose-800">
                      Chapter {currentIndex + 1}
                    </span>
                    <span className="text-xs text-stone-500 mt-3 border border-stone-300 rounded-full px-3 py-1">
                      Add your photo to /public/photos/gallery/{currentIndex + 1}.jpg
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Chevrons */}
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-md transition-colors z-10 text-lg"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-md transition-colors z-10 text-lg"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>

            {/* Handwritten Caption on Chin */}
            <div className="mt-5 text-center px-4 min-h-[50px] flex items-center justify-center">
              <p className="font-hand text-2xl text-stone-800 font-semibold">
                "{current.caption}"
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-rose-600 rounded-full'
                  : 'bg-stone-300 hover:bg-rose-300'
              }`}
              aria-label={`Jump to photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
