'use client';

// Adapted from Motion Primitives text-loop (MIT). See LICENSES.
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useReducedEffects } from '@/components/motion-preferences';

export function TextLoop({ items }: { items: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedEffects();

  useEffect(() => {
    if (reduce || !inView || items.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((value) => (value + 1) % items.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [reduce, inView, items.length]);

  return (
    <span ref={ref} className="research-loop">
      <span className="sr-only">{items.join(', ')}</span>
      <span aria-hidden="true" className="research-loop-viewport">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            initial={
              reduce ? false : { y: 16, opacity: 0, filter: 'blur(6px)' }
            }
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? {} : { y: -16, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}
          >
            {items[index % items.length]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
