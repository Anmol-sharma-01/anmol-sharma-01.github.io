'use client';

// Adapted from Watermelon Platform's shimmer-button. MIT; see LICENSES.
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function ShimmerLink({
  children,
  className,
  ...props
}: ComponentProps<'a'>) {
  return (
    <a className={cn('shimmer-link button-primary', className)} {...props}>
      <span className="shimmer-content">{children}</span>
      <span aria-hidden="true" className="shimmer-sweep" />
    </a>
  );
}
