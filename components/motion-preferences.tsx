'use client';

import { createContext, useContext } from 'react';
import { useReducedMotion } from 'motion/react';

export const MotionPausedContext = createContext(false);

export function useReducedEffects() {
  const paused = useContext(MotionPausedContext);
  const reduced = useReducedMotion();
  return paused || !!reduced;
}
