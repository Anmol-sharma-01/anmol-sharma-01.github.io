'use client';

// Adapted from Motion Primitives border-trail (MIT). See LICENSES.
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useReducedEffects } from '@/components/motion-preferences';

export function BorderTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedEffects();
  return (
    <div ref={ref} className="border-trail" aria-hidden="true">
      <motion.div
        className="border-trail-light"
        style={{ offsetPath: 'rect(0 auto auto 0 round 20px)' }}
        animate={{ offsetDistance: !reduce && inView ? ['0%', '100%'] : '0%' }}
        transition={
          !reduce && inView
            ? { duration: 7, repeat: Infinity, ease: 'linear' }
            : { duration: 0 }
        }
      />
    </div>
  );
}
