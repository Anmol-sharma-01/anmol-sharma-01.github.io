'use client';

// Watermelon fluid-tabs' shared-layout pill, composed inside accessible Base UI tabs.
// MIT; see LICENSES/watermelon-platform.txt.
import { motion } from 'motion/react';
import { useReducedEffects } from '@/components/motion-preferences';

export function FluidTabLabel({
  active,
  children,
  group,
}: {
  active: boolean;
  children: React.ReactNode;
  group: string;
}) {
  const reduce = useReducedEffects();
  return (
    <>
      {active && (
        <motion.span
          aria-hidden="true"
          className="fluid-pill"
          layoutId={group}
          transition={
            reduce
              ? { duration: 0 }
              : { type: 'spring', stiffness: 280, damping: 25, mass: 0.8 }
          }
        />
      )}
      <span className="fluid-label">{children}</span>
    </>
  );
}
