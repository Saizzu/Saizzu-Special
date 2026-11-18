import React, { useState, useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import HeroSection from './components/HeroSection';
import ScratchCard from './components/ScratchCard';
import LoveEnvelope from './components/LoveEnvelope';
import OpenWhenCapsules from './components/OpenWhenCapsules';
import RelationshipTimer from './components/RelationshipTimer';
import ChatStats from './components/ChatStats';
import MemoryTrivia from './components/MemoryTrivia';
import FlowerBurst from './components/FlowerBurst';
import ReasonsList from './components/ReasonsList';
import SpinWheel from './components/SpinWheel';
import WishOrderBox from './components/WishOrderBox';
import CompatibilityMeter from './components/CompatibilityMeter';
import MusicPlayer from './components/MusicPlayer';
import PhotoCarousel from './components/PhotoCarousel';
import MoonPhase from './components/MoonPhase';
import TimeCapsule from './components/TimeCapsule';
import ClosingNote from './components/ClosingNote';
import PasswordGate from './components/PasswordGate';
import DATA from './data';

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem('saizzu_auth_unlocked') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('saizzu_dark_mode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('saizzu_dark_mode', String(next));
      return next;
    });
  };

  const handleLock = () => {
    localStorage.removeItem('saizzu_auth_unlocked');
    setUnlocked(false);
  };

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div
      className={`relative min-h-screen selection:bg-rose-500 selection:text-white overflow-x-hidden w-full transition-colors duration-700 ease-in-out ${
        darkMode
          ? 'dark bg-gradient-to-b from-[#060918] via-[#0c1433] to-[#111936] text-rose-100'
          : 'bg-[#FFF0F3] text-stone-900'
      }`}
    >
      {/* Ambient background particles & starry midnight effects */}
      <BackgroundEffects darkMode={darkMode} />

      {/* Floating Header Pill */}
      <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] w-auto">
        <div className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-stone-950/80 backdrop-blur-md border border-rose-400/30 shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-warm-100 whitespace-nowrap">
          <span className="text-rose-400">♥</span>
          <span className="font-display font-medium">
            For {DATA.partnerName} ({DATA.nicknames[0]})
          </span>
          <span className="text-rose-400/50">•</span>
          <span className="font-hand text-amber-300 text-sm">
            From {DATA.gifterName}
          </span>
          <span className="text-rose-400/30">|</span>

          {/* Starry Midnight Theme Toggle (☀️ / 🌙) */}
          <button
            type="button"
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Pastel Rose Mode' : 'Switch to Starry Midnight Mode'}
            className="text-xs hover:scale-110 active:scale-95 transition-transform px-1 py-0.5 rounded text-amber-300"
            aria-label="Toggle theme"
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
          </button>

          {/* Lock Page Button */}
          <button
            type="button"
            onClick={handleLock}
            title="Lock Page"
            className="text-[11px] text-warm-300/60 hover:text-rose-400 transition-colors flex items-center gap-1"
            aria-label="Lock page"
          >
            <span>🔒</span>
          </button>
        </div>
      </header>

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Interactive Scratch to Reveal Memory */}
      <ScratchCard />

      {/* 3. Interactive Wax-Sealed Love Envelope & Urdu Letter */}
      <LoveEnvelope />

      {/* 4. "Open When..." Mood Capsules (Directly after LoveEnvelope) */}
      <OpenWhenCapsules />

      {/* 5. Live Relationship Timer */}
      <RelationshipTimer />

      {/* 6. Our Story in Numbers (Spotify Wrapped Chat Stats) */}
      <ChatStats />

      {/* 7. Memory & Relationship Trivia (Directly after ChatStats) */}
      <MemoryTrivia />

      {/* 8. Spontaneous Flowers / Love Burst Button */}
      <FlowerBurst />

      {/* 9. Reasons I Love You */}
      <ReasonsList />

      {/* 10. Spin the Wheel (Gift & Date Roulette) */}
      <SpinWheel />

      {/* 11. Wish Order Menu (Directly after SpinWheel) */}
      <WishOrderBox />

      {/* 12. Love Compatibility Meter */}
      <CompatibilityMeter />

      {/* 13. Our Soundtrack (Retro Vinyl Music Player) */}
      <MusicPlayer />

      {/* 14. Memory Polaroid Carousel */}
      <PhotoCarousel />

      {/* 15. Celestial Moon Phase */}
      <MoonPhase />

      {/* 16. Our Secret Time Capsule (Directly after MoonPhase, before ClosingNote) */}
      <TimeCapsule />

      {/* 17. Closing Note & Signature */}
      <ClosingNote />
    </div>
  );
}
