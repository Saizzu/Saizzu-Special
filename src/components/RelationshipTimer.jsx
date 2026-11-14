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

  const [milestoneStatus, setMilestoneStatus] = useState({
    daysLeft: 0,
    isTodayOrPast: false,
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

      // Milestone calculation
      if (DATA.milestoneDate) {
        const milestone = new Date(DATA.milestoneDate);
        const milestoneDiff = milestone.getTime() - now.getTime();
        const daysLeft = Math.ceil(milestoneDiff / (1000 * 60 * 60 * 24));
        setMilestoneStatus({
          daysLeft: Math.max(0, daysLeft),
          isTodayOrPast: daysLeft <= 0,
        });
      }
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
    <section className="section-light py-24 px-4 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-3"
        >
          <span className="pill-badge pill-badge-rose">
            <span>⏳</span> Since November 26, 2023
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-love-900 mb-3"
        >
          {DATA.timerTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-hand text-xl sm:text-2xl text-warm-700 mb-12 max-w-xl mx-auto"
        >
          {DATA.timerSubtitle}
        </motion.p>

        {/* Ticking Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index, duration: 0.4 }}
              className="glass-card-light p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Subtle top color bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />
              
              <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-rose tracking-tight">
                {unit.value}
              </span>
              <span className="font-display text-xs sm:text-sm uppercase tracking-wider text-warm-700/80 mt-2 font-medium">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Milestone Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-100/90 via-pink-50 to-rose-100/90 border border-rose-300/80 shadow-md text-sm font-medium text-rose-950">
            <span className="text-rose-500 text-base">💖</span>
            <span>
              <strong>{timeTogether.totalDays.toLocaleString()}</strong> days of loving you
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/80 shadow-sm text-sm font-medium text-amber-900">
            <span className="text-amber-500 text-base">✨</span>
            <span>
              {milestoneStatus.isTodayOrPast
                ? "Today is our special day, Insha'Allah! 🎉"
                : `${milestoneStatus.daysLeft} days to our milestone, Insha'Allah 💫`}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
