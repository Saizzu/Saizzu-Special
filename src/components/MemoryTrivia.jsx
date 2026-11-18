import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DATA from '../data.js';

export default function MemoryTrivia() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = DATA.triviaQuestions || [];
  const currentQ = questions[currentIdx];

  const handleSelect = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#EC4899', '#FB7185'],
      });
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#E11D48', '#FB7185', '#FCD34D', '#10B981'],
      });
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  if (!questions.length) return null;

  return (
    <section className="section-light py-14 sm:py-24 px-3 sm:px-6 relative overflow-hidden text-center">
      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-rose text-xs">
            <span>🧠</span> MEMORY & LOVE TRIVIA
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white dark:text-rose-100 mb-2 sm:mb-3 drop-shadow-sm"
        >
          How Well Do You Know Us?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-xl text-white/90 dark:text-rose-200/90 mb-6 sm:mb-8 max-w-lg"
        >
          Four sweet questions from our story. Let's see how much you remember, Saizzu! 😜
        </motion.p>

        {/* Primary Quiz Card — Soft Rose-Tinted Glass */}
        <div className="w-full glass-card dark:bg-slate-900/80 backdrop-blur-md border border-white/20 dark:border-indigo-400/25 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden">
          {!isCompleted ? (
            <div>
              {/* Progress Header */}
              <div className="flex items-center justify-between text-xs font-mono text-white/80 dark:text-rose-300 mb-3">
                <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
                <span className="font-bold text-amber-300 dark:text-amber-300">SCORE: {score}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white/20 dark:bg-slate-800 overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-display text-lg sm:text-xl font-bold text-white dark:text-rose-100 mb-5">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  const hasAnswered = selectedOption !== null;

                  let style = 'bg-white/20 dark:bg-slate-800/70 border border-white/30 dark:border-indigo-400/20 hover:bg-white/30 text-white dark:text-rose-100';

                  if (hasAnswered) {
                    if (isCorrect) {
                      style = 'bg-emerald-100/90 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-400/40 shadow-sm';
                    } else if (isChosen && !isCorrect) {
                      style = 'bg-rose-100/90 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-200 font-medium ring-2 ring-rose-400/30';
                    } else {
                      style = 'bg-rose-50/40 dark:bg-slate-900/40 border-rose-100 dark:border-slate-800 text-stone-400 dark:text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      disabled={hasAnswered}
                      animate={
                        hasAnswered && isChosen && !isCorrect
                          ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                          : {}
                      }
                      transition={{ duration: 0.4 }}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-xs sm:text-sm ${style}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrect && <span>✅</span>}
                      {hasAnswered && isChosen && !isCorrect && <span>❌</span>}
                    </motion.button>
                  );
                })}
              </div>

              {/* Answer Feedback Reaction */}
              <AnimatePresence>
                {selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-4 rounded-2xl border mb-6 ${
                      selectedOption === currentQ.correctIndex
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-600/40 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50/90 dark:bg-rose-950/50 border-rose-300 dark:border-rose-600/40 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <p className="font-hand text-base sm:text-lg leading-relaxed">
                      {selectedOption === currentQ.correctIndex
                        ? currentQ.correctReply
                        : currentQ.wrongReply}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {selectedOption !== null && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>{currentIdx + 1 === questions.length ? 'View My Final Rank 🏆' : 'Next Question ➔'}</span>
                </button>
              )}
            </div>
          ) : (
            /* Final Score & Rank Card */
            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-[2px] shadow-lg mb-4 flex items-center justify-center">
                <div className="w-full h-full bg-white/30 dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl">
                  {score >= 3 ? '👑' : '🍮'}
                </div>
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 dark:text-amber-300 font-bold block mb-1">
                {score === 4 ? 'PERFECT SCORE' : 'QUIZ COMPLETED'}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white dark:text-rose-50 mb-2">
                {score} out of {questions.length} Correct!
              </h3>

              <p className="font-hand text-xl text-white/95 dark:text-rose-100 max-w-md mx-auto mb-6 leading-relaxed">
                {score === 4
                  ? "Flawless memory! Certified Queen of Mudassir's Heart! You remember every single detail. I love you endlessly! ❤️"
                  : score >= 2
                  ? "Pretty good, Saizzu! But you definitely owe me some Brown Gulab Jamun for the ones you missed! 😜"
                  : "Oh no, Babu! Looks like we need another college walk date immediately to refresh your memory! 😂💕"}
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-2xl bg-stone-900 dark:bg-slate-800 hover:bg-stone-800 dark:hover:bg-slate-700 text-white font-semibold text-sm shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>🔄</span>
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
