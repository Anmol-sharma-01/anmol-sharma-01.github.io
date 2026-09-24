'use client';

// Adapted from Watermelon Platform's copy-confirm. MIT; see LICENSES.
// Adds clipboard error handling, reduced motion, and a persistent status label.
import { AnimatePresence, motion } from 'motion/react';
import { useReducedEffects } from '@/components/motion-preferences';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyConfirm({ value }: { value: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const reduce = useReducedEffects();
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }
  return (
    <div className="copy-confirm">
      <motion.button
        type="button"
        className="copy-button"
        onClick={copy}
        whileHover={reduce ? {} : { scale: 1.02 }}
        whileTap={reduce ? {} : { scale: 0.97 }}
        aria-label={
          status === 'copied'
            ? 'Email copied. Copy again'
            : 'Copy email address'
        }
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={status}
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? {} : { opacity: 0, scale: 0.4 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            {status === 'copied' ? <Check size={16} /> : <Copy size={16} />}
          </motion.span>
        </AnimatePresence>
        <span>{status === 'copied' ? 'Copied' : 'Copy email'}</span>
      </motion.button>
      <output className="copy-status">
        {status === 'copied'
          ? 'Email copied to clipboard.'
          : status === 'error'
            ? 'Select the email address to copy it manually.'
            : ''}
      </output>
    </div>
  );
}
