import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DATA from '../data';

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const lastPointRef = useRef(null);

  const { photo, caption, prompt } = DATA.scratchCard;

  // Initialize canvas with golden gradient
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Golden metallic gradient fill
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#D4A574');
    grad.addColorStop(0.5, '#C49562');
    grad.addColorStop(1, '#E8C9A0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle noise-like texture dots for metallic feel
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // "scratch me ✨" text in center
    ctx.save();
    ctx.font = `28px Caveat, cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 4;
    ctx.fillText('scratch me ✨', rect.width / 2, rect.height / 2);
    ctx.restore();
  }, []);

  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      if (!revealed) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, revealed]);

  // Calculate scratch percentage
  const calcScratchPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    return (transparent / total) * 100;
  }, []);

  // Get position relative to canvas
  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  // Scratch (erase) at position
  const scratch = useCallback(
    (pos) => {
      const canvas = canvasRef.current;
      if (!canvas || revealed) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'destination-out';

      // Draw line from last point for smooth scratching
      if (lastPointRef.current) {
        ctx.beginPath();
        ctx.lineWidth = 50;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }

      // Also draw circle at current position
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      lastPointRef.current = pos;
    },
    [revealed]
  );

  // Check scratch percentage periodically during scratching
  const checkReveal = useCallback(() => {
    const pct = calcScratchPercent();
    setScratchPercent(pct);
    if (pct > 50) {
      setRevealed(true);
    }
  }, [calcScratchPercent]);

  // Mouse handlers
  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsScratching(true);
      const pos = getPos(e);
      if (pos) {
        lastPointRef.current = pos;
        scratch(pos);
      }
    },
    [getPos, scratch]
  );

  const handlePointerMove = useCallback(
    (e) => {
      e.preventDefault();
      if (!isScratching) return;
      const pos = getPos(e);
      if (pos) scratch(pos);
    },
    [isScratching, getPos, scratch]
  );

  const handlePointerUp = useCallback(() => {
    if (isScratching) {
      setIsScratching(false);
      lastPointRef.current = null;
      checkReveal();
    }
  }, [isScratching, checkReveal]);

  return (
    <section className="section-light py-12 sm:py-20 px-3 sm:px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Pill badge */}
        <span className="pill-badge pill-badge-gold mb-3 sm:mb-5 inline-block text-xs">
          ✨ hidden memory
        </span>

        {/* Title */}
        <h2
          className="font-display text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 text-white dark:text-rose-100 drop-shadow-sm"
        >
          Scratch to uncover something special
        </h2>

        {/* Subtitle */}
        <p
          className="font-hand text-lg sm:text-2xl mb-6 sm:mb-10 text-white/90 dark:text-rose-200/90"
        >
          {prompt}
        </p>

        {/* Scratch card container */}
        <div className="border-2 border-dashed border-white/40 dark:border-indigo-400/40 glass-card dark:bg-slate-900/80 shadow-2xl max-w-md mx-auto rounded-3xl p-2">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-2xl h-[420px] sm:h-[500px]"
          >
            {/* Behind layer — reveal photo */}
            {photo ? (
              <img
                src={photo}
                alt="Hidden memory"
                className="absolute inset-0 w-full h-full object-cover object-[center_25%] rounded-2xl"
                draggable={false}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling &&
                    (e.target.nextElementSibling.style.display = 'flex');
                }}
              />
            ) : null}

            {/* Placeholder fallback */}
            <div
              className={`absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center ${photo ? 'hidden' : ''}`}
              style={{
                background:
                  'linear-gradient(135deg, #FFE4E6 0%, #FECDA6 50%, #FFF0F0 100%)',
              }}
            >
              <span className="font-hand text-2xl text-warm-700">
                Your photo here 📷
              </span>
            </div>

            {/* Caption overlay on photo */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 rounded-b-2xl transition-opacity duration-700 ${
                revealed ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background:
                  'linear-gradient(transparent, rgba(0,0,0,0.6))',
              }}
            >
              <p className="font-hand text-lg text-white drop-shadow-md">
                {caption}
              </p>
            </div>

            {/* Front layer — scratch canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full scratch-canvas no-select rounded-2xl transition-opacity duration-700 ${
                revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              onTouchCancel={handlePointerUp}
            />
          </div>
        </div>

        {/* Scratch progress hint */}
        <motion.p
          className="font-hand text-base mt-4 text-white/90 dark:text-rose-200/90"
          animate={{ opacity: revealed ? 0 : 1 }}
        >
          {scratchPercent > 10 && !revealed
            ? `Almost there... keep scratching! 💛`
            : !revealed
              ? 'Use your finger or mouse to scratch ☝️'
              : ''}
        </motion.p>

        {/* Revealed caption below card */}
        <motion.p
          className="font-hand text-lg mt-4 text-white dark:text-rose-100"
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {revealed && caption}
        </motion.p>
      </motion.div>
    </section>
  );
}
