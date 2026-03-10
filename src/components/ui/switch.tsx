'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, className, disabled, onClick, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      data-state={checked ? 'checked' : 'unchecked'}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        onCheckedChange?.(!checked);
      }}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer overflow-hidden rounded-full border border-transparent align-middle transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7626c6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 rounded-full transition-colors duration-200 ease-out',
          checked
            ? 'bg-[#7626c6] shadow-[inset_0_1px_2px_rgba(76,29,149,0.3)]'
            : 'bg-gray-300 shadow-[inset_0_1px_2px_rgba(15,23,42,0.12)]'
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute left-[2px] top-[2px] z-10 block h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(15,23,42,0.22)] transition-transform duration-200 ease-out will-change-transform'
        )}
        style={{
          transform: checked ? 'translateX(20px)' : 'translateX(0)',
        }}
      />
    </button>
  )
);

Switch.displayName = 'Switch';

export { Switch };
