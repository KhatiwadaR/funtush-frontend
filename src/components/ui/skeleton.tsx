import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('animate-pulse rounded-md bg-muted bg-gray-200 dark:bg-gray-800', className)
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';