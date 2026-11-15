import React, { useState } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import HeroSection from './components/HeroSection';
import ScratchCard from './components/ScratchCard';
import LoveEnvelope from './components/LoveEnvelope';
import RelationshipTimer from './components/RelationshipTimer';
import ChatStats from './components/ChatStats';
import FlowerBurst from './components/FlowerBurst';
import ReasonsList from './components/ReasonsList';
import SpinWheel from './components/SpinWheel';
import CompatibilityMeter from './components/CompatibilityMeter';
import MusicPlayer from './components/MusicPlayer';
import PhotoCarousel from './components/PhotoCarousel';
import MoonPhase from './components/MoonPhase';
import ClosingNote from './components/ClosingNote';
import PasswordGate from './components/PasswordGate';
import DATA from './data';

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem('saizzu_auth_unlocked') === 'true';
  });

  const handleLock = () => {
    localStorage.removeItem('saizzu_auth_unlocked');
    setUnlocked(false);
  };

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#FFF0F3] selection:bg-rose-500 selection:text-white overflow-x-hidden w-full">
      {/* Ambient background particles */}
      <BackgroundEffects />

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
          <button
            onClick={handleLock}
            title="Lock Page"
            className="text-[11px] text-warm-300/60 hover:text-rose-400 transition-colors flex items-center gap-1"
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

      {/* 4. Live Relationship Timer */}
      <RelationshipTimer />

      {/* 5. Our Story in Numbers (Spotify Wrapped Chat Stats) */}
      <ChatStats />

      {/* 6. Spontaneous Flowers / Love Burst Button */}
      <FlowerBurst />

      {/* 7. Reasons I Love You */}
      <ReasonsList />

      {/* 8. Spin the Wheel (Gift & Date Roulette) */}
      <SpinWheel />

      {/* 9. Love Compatibility Meter */}
      <CompatibilityMeter />

      {/* 10. Our Soundtrack (Retro Vinyl Music Player) */}
      <MusicPlayer />

      {/* 11. Memory Polaroid Carousel */}
      <PhotoCarousel />

      {/* 12. Celestial Moon Phase */}
      <MoonPhase />

      {/* 13. Closing Note & Signature */}
      <ClosingNote />
    </div>
  );
}
