'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CinematicTextProps {
  text: string;
  className?: string;
}

export default function CinematicText({ text, className = '' }: CinematicTextProps) {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 85%', 'end 50%']
  });

  const words = text.split(' ');

  return (
    <p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} />
        );
      })}
    </p>
  );
}

function Word({ word, progress, start, end }: { word: string, progress: MotionValue<number>, start: number, end: number }) {
  const opacity = useTransform(progress, [start, end], [0.35, 1]);
  return (
    <span className="relative mr-2 mt-2">
      <span className="absolute opacity-35">{word}</span>
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}
