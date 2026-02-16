'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const Counter = ({ value }: { value: number }) => {
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.div 
      className="flex items-center justify-center font-bold text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-800 dark:from-white dark:via-zinc-200 dark:to-zinc-600 drop-shadow-2xl font-mono tracking-tighter"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <motion.span>{display}</motion.span>
    </motion.div>
  );
};

export default Counter;
