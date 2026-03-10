'use client';

import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button-variants';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ShineBorder } from '@/components/ui/shine-border';
import { Switch } from '@/components/ui/switch';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

export interface PricingPlan {
  id?: string;
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href?: string;
  isPopular: boolean;
  isCurrentPlan?: boolean;
  onSelect?: () => void;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = 'Simple, Transparent Pricing',
  description = `Choose the plan that works for you
All plans include access to our platform, lead generation tools, and dedicated support.`,
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isAnnual = !isMonthly;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const switchRef = useRef<HTMLButtonElement>(null);
  const selectedPlan = plans.find((plan) => plan.isCurrentPlan);
  const selectedPlanId = selectedPlan ? selectedPlan.id ?? selectedPlan.name : null;

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);

    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ['#7626c6', '#9b5de5', '#c69cf6', '#ede0ff'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      });
    }
  };

  return (
    <div className="py-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
        <p className="text-gray-600 text-base whitespace-pre-line max-w-3xl mx-auto">{description}</p>
      </div>

      <div className="mb-10 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#7626c6]/15 bg-[#f7f1ff] px-4 py-3 shadow-sm">
          <span className={cn('text-sm font-semibold transition-colors duration-200', isMonthly ? 'text-gray-900' : 'text-gray-500')}>
            Monthly
          </span>
          <Label className="relative inline-flex items-center cursor-pointer">
            <Switch
              ref={switchRef}
              checked={isAnnual}
              onCheckedChange={handleToggle}
              className="relative"
              aria-label="Toggle annual billing"
            />
          </Label>
          <span className={cn('text-sm font-semibold transition-colors duration-200', isAnnual ? 'text-[#7626c6]' : 'text-gray-500')}>
            Annual billing{' '}
            <span className={cn('transition-colors duration-200', isAnnual ? 'text-[#7626c6]' : 'text-[#7626c6]/80')}>(Save 20%)</span>
          </span>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan, index) => {
          const planId = plan.id ?? plan.name;
          const isSelected = selectedPlanId === planId;
          const cardMotion = isDesktop
            ? {
                y: plan.isPopular ? -18 : 0,
                opacity: 1,
                x: index === 2 ? -18 : index === 0 ? 18 : 0,
                scale: index === 0 || index === 2 ? 0.97 : 1,
              }
            : { opacity: 1, y: 0 };

          return (
            <ShineBorder
              key={planId}
              active={isSelected}
              className="h-full"
              colors={['#7c3aed', '#ec4899', '#14b8a6']}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={cardMotion}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 24,
                  delay: 0.15,
                  opacity: { duration: 0.35 },
                }}
                className={cn(
                  'relative flex h-full flex-col rounded-3xl border bg-white/95 p-6 text-left shadow-sm',
                  isSelected ? 'border-[#7626c6] shadow-[0_24px_60px_rgba(118,38,198,0.16)]' : 'border-gray-200',
                  !plan.isPopular && 'mt-4'
                )}
              >
                {plan.isPopular ? (
                  <div className="absolute right-0 top-0 flex items-center rounded-bl-2xl rounded-tr-3xl bg-[#7626c6] px-3 py-1 text-white">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-semibold">Popular</span>
                  </div>
                ) : null}

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{plan.name}</p>
                    {plan.isCurrentPlan ? (
                      <span className="rounded-full bg-[#7626c6]/10 px-2.5 py-1 text-xs font-semibold text-[#7626c6]">
                        Current Plan
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-end justify-start gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      <NumberFlow
                        value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                        format={{
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: 'ease-out',
                        }}
                        willChange
                      />
                    </span>
                    <span className="pb-1 text-sm font-semibold tracking-wide text-gray-500">/ {plan.period}</span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">{isMonthly ? 'billed monthly' : 'billed annually'}</p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[#7626c6]" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <hr className="my-5 border-gray-200" />

                  {plan.href && !plan.onSelect ? (
                    <a
                      href={plan.href}
                      className={cn(
                        buttonVariants({ variant: isSelected ? 'default' : 'outline' }),
                        'w-full justify-center text-base font-semibold'
                      )}
                    >
                      {plan.isCurrentPlan ? 'Current Plan' : plan.buttonText}
                    </a>
                  ) : (
                    <Button
                      type="button"
                      variant={isSelected ? 'default' : 'outline'}
                      className="w-full justify-center text-base font-semibold"
                      onClick={plan.onSelect}
                      disabled={plan.isCurrentPlan}
                    >
                      {plan.isCurrentPlan ? 'Current Plan' : plan.buttonText}
                    </Button>
                  )}

                  <p className="mt-5 text-xs leading-5 text-gray-500">{plan.description}</p>
                </div>
              </motion.div>
            </ShineBorder>
          );
        })}
      </div>
    </div>
  );
}
