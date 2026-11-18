import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DATA from '../data.js';

export default function RelationshipTimer() {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(DATA.relationshipStartDate);
      const now = new Date();
      const diffMs = now.getTime() - start.getTime();

      // Total days
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // Calculate calendar years, months, days
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeTogether({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Years', value: timeTogether.years },
    { label: 'Months', value: timeTogether.months },
    { label: 'Days', value: timeTogether.days },
    { label: 'Hours', value: String(timeTogether.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeTogether.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(timeTogether.seconds).padStart(2, '0') },
  ];

  return (
    <section className="section-light py-12 sm:py-20 md:py-24 px-3 sm:px-6 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-rose text-xs">
            <span>⏳</span> Since November 26, 2023
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-love-900 dark:text-rose-100 mb-1.5 sm:mb-3"
        >
          {DATA.timerTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg sm:text-2xl text-warm-700 dark:text-rose-200/90 mb-6 sm:mb-12 max-w-xl mx-auto"
        >
          {DATA.timerSubtitle}
        </motion.p>

        {/* Ticking Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * index, duration: 0.35 }}
              className="glass-card-light p-3 sm:p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Subtle top color bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />
              
              <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-extrabold text-gradient-rose tracking-tight">
                {unit.value}
              </span>
              <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-warm-700/80 dark:text-rose-200/80 mt-1 sm:mt-2 font-medium">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Milestone Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-100/90 via-pink-50 to-rose-100/90 dark:from-indigo-950/80 dark:via-slate-900/80 dark:to-indigo-950/80 border border-rose-300/80 dark:border-rose-400/30 shadow-md text-xs sm:text-sm font-medium text-rose-950 dark:text-rose-100">
            <span className="text-rose-500 text-sm sm:text-base">💖</span>
            <span>
              <strong>{timeTogether.totalDays.toLocaleString()}</strong> days of loving you
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/60 dark:to-indigo-950/60 border border-amber-200/80 dark:border-amber-400/30 shadow-sm text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200">
            <span className="text-amber-500 text-sm sm:text-base">✨</span>
            <span>
              {DATA.milestoneText || "1 year to our milestone, Insha'Allah 💫"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
