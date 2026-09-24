'use client';

// Character springs adapted from Watermelon reveal-copy (MIT). See LICENSES.
// Public text is always available to assistive technology; no masking or copying.
import { motion } from 'motion/react';
import { useReducedEffects } from '@/components/motion-preferences';

export function RevealText({ children }: { children: string }) {
  const reduce = useReducedEffects();
  const words = children.split(/(\s+)/);
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
  return (
    <span className="reveal-text">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const start = words.slice(0, wordIndex).join('').length;
          if (/^\s+$/.test(word)) return <span key={wordIndex}>{word}</span>;
          return (
            <span className="reveal-word" key={wordIndex}>
              {Array.from(
                segmenter.segment(word),
                ({ segment }) => segment,
              ).map((char, index) => (
                <motion.span
                  key={index}
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, y: 12, scale: 0.7, filter: 'blur(4px)' }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          type: 'spring',
                          stiffness: 200,
                          damping: 18,
                          delay: (start + index) * 0.022,
                        }
                  }
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}
