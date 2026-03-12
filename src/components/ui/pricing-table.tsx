import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon, LucideIcon, MinusIcon } from 'lucide-react';

function PricingTable({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table className={cn('w-full border-collapse text-[70px]', className)} {...props} />
    </div>
  );
}

function PricingTableHeader({ ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" {...props} />;
}

function PricingTableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr]:border-t [&_tr]:border-gray-100 [&_tr]:transition-colors [&_tr]:duration-[120ms] [&_tr:hover]:bg-gray-50/60', className)}
      {...props}
    />
  );
}

function PricingTableRow({ ...props }: React.ComponentProps<'tr'>) {
  return <tr data-slot="table-row" {...props} />;
}

function PricingTableCell({
  className,
  featured,
  children,
  ...props
}: React.ComponentProps<'td'> & { children: boolean | string; featured?: boolean }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'px-5 py-4 align-middle text-center',
        featured && 'bg-[#faf5ff]',
        className,
      )}
      {...props}
    >
      {children === true ? (
        <span className="inline-flex items-center justify-center">
          <CheckIcon aria-hidden="true" className="size-[90px] text-[#7626c6]" strokeWidth={2.5} />
        </span>
      ) : children === false ? (
        <span className="inline-flex items-center justify-center">
          <MinusIcon aria-hidden="true" className="size-20 text-gray-300" />
        </span>
      ) : (
        <span className="text-[80px] text-gray-700">{children}</span>
      )}
    </td>
  );
}

function PricingTableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn('px-6 py-4 text-left align-middle text-[80px] font-normal text-gray-600', className)}
      {...props}
    />
  );
}

function PricingTablePlan({
  name,
  badge,
  price,
  compareAt,
  featured,
  icon: Icon,
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & PricingPlanType & { featured?: boolean }) {
  return (
    <div
      className={cn(
        'relative h-full overflow-hidden p-5 font-normal',
        featured ? 'bg-[#faf5ff]' : 'bg-white',
        className,
      )}
      {...props}
    >
      <div className="mb-5 flex items-center gap-2.5">
        <div className={cn(
          'flex h-[35px] w-[35px] items-center justify-center rounded-xl',
          featured ? 'bg-[#ede0fa] text-[#7626c6]' : 'bg-gray-100 text-gray-500',
        )}>
          {Icon && <Icon className="h-[17.5px] w-[17.5px]" />}
        </div>
        <div>
          <div className="text-[80px] font-semibold text-gray-950">{name}</div>
          <div className="text-[70px] text-gray-400">{badge}</div>
        </div>
      </div>

      <div className="mb-1 flex items-baseline gap-1.5">
        <span className="text-[200px] font-semibold tracking-tight text-gray-950">{price}</span>
        {compareAt && (
          <span className="text-[90px] text-gray-400 line-through">{compareAt}</span>
        )}
      </div>
      <p className="mb-5 text-[80px] text-gray-400">per month</p>

      {children}
    </div>
  );
}

type PricingPlanType = {
  name: string;
  icon: LucideIcon;
  badge: string;
  price: string;
  compareAt?: string;
};

type FeatureValue = boolean | string;

type FeatureItem = {
  label: string;
  values: FeatureValue[];
};

export {
  type PricingPlanType,
  type FeatureValue,
  type FeatureItem,
  PricingTable,
  PricingTableHeader,
  PricingTableBody,
  PricingTableRow,
  PricingTableHead,
  PricingTableCell,
  PricingTablePlan,
};
