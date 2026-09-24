'use client';

// Adapted from Motion Primitives tilt (MIT). See LICENSES.
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { ReactNode, PointerEvent } from 'react';
import { useReducedEffects } from '@/components/motion-preferences';

export function Tilt({
  children,
  className,
  rotationFactor = 5,
}: {
  children: ReactNode;
  className?: string;
  rotationFactor?: number;
}) {
  const reduce = useReducedEffects();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 22 });
  const springY = useSpring(y, { stiffness: 160, damping: 22 });
  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [rotationFactor, -rotationFactor],
  );
  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-rotationFactor, rotationFactor],
  );
  const transform = useTransform(
    () =>
      `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
  );
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(
      Math.max(
        -0.5,
        Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5),
      ),
    );
    y.set(
      Math.max(
        -0.5,
        Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5),
      ),
    );
  }
  function reset() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div
      className={className}
      style={{ transform: reduce ? 'none' : transform }}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  );
}
