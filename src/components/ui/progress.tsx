import * as React from 'react';

import { cn } from '@/lib/utils';

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-gray-200', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-[#7626c6] transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  ),
);
Progress.displayName = 'Progress';

export { Progress };
