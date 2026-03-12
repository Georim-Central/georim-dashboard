"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface Plan {
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isFeatured?: boolean;
}

interface PricingTableProps {
  plans: Plan[];
  onPlanSelect?: (plan: Plan, billingCycle: "monthly" | "yearly") => void;
}

const CONFETTI_PARTICLES = [
  { id: 1, x: -78, rotate: -18, color: "#7626c6", delay: 0 },
  { id: 2, x: -54, rotate: 8, color: "#38bdf8", delay: 0.04 },
  { id: 3, x: -28, rotate: 24, color: "#f97316", delay: 0.08 },
  { id: 4, x: 0, rotate: -10, color: "#22c55e", delay: 0.12 },
  { id: 5, x: 28, rotate: 18, color: "#facc15", delay: 0.16 },
  { id: 6, x: 54, rotate: -22, color: "#ec4899", delay: 0.2 },
  { id: 7, x: 80, rotate: 12, color: "#8b5cf6", delay: 0.24 },
];

const AnimatedDigit: React.FC<{ digit: string; index: number }> = ({ digit, index }) => {
  return (
    <div className="relative inline-block min-w-[1ch] overflow-hidden text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={digit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const ScrollingNumber: React.FC<{ value: number }> = ({ value }) => {
  const numberString = value.toString();

  return (
    <div className="flex items-center">
      {numberString.split("").map((digit, index) => (
        <AnimatedDigit key={`${value}-${index}`} digit={digit} index={index} />
      ))}
    </div>
  );
};

const PricingTable: React.FC<PricingTableProps> = ({ plans, onPlanSelect }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const getFeatureIcon = () => {
    return <Check className="size-3 text-[#7626c6]" />;
  };

  useEffect(() => {
    if (!showConfetti) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowConfetti(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [showConfetti]);

  const updateBillingCycle = (nextIsYearly: boolean) => {
    if (nextIsYearly === isYearly) {
      return;
    }

    setIsYearly(nextIsYearly);
    setShowConfetti(false);
    window.setTimeout(() => {
      setShowConfetti(true);
    }, 20);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 p-8">
      <motion.div
        className="space-y-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-3">
          <motion.h1
            className="text-[32px] font-semibold tracking-tight text-gray-950"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            className="mx-auto max-w-xl text-base text-gray-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            All plans include core features. Upgrade anytime as your events grow.
          </motion.p>
        </div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative flex flex-col items-center gap-3">
            <div className="w-full max-w-[380px] space-y-2">
              <div className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Billing cycle
              </div>
              <div
                className="relative grid grid-cols-2 rounded-2xl border border-gray-200 bg-[#f4f5f7] p-1.5"
                role="radiogroup"
                aria-label="Billing cycle"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-0.375rem)] rounded-[14px] border border-white/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]"
                  animate={{ x: isYearly ? "100%" : "0%" }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
                <button
                  type="button"
                  role="radio"
                  aria-checked={!isYearly}
                  onClick={() => updateBillingCycle(false)}
                  className={`relative z-10 flex flex-col items-center gap-1 rounded-[14px] px-4 py-3 text-center transition ${
                    isYearly ? "text-gray-500" : "text-gray-950"
                  }`}
                >
                  <span className="text-sm font-semibold">Monthly</span>
                  <span className="text-xs leading-5 text-gray-500">Pay month to month</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isYearly}
                  onClick={() => updateBillingCycle(true)}
                  className={`relative z-10 flex flex-col items-center gap-1 rounded-[14px] px-4 py-3 text-center transition ${
                    isYearly ? "text-gray-950" : "text-gray-500"
                  }`}
                >
                  <span className="text-sm font-semibold">Yearly</span>
                  <span className="text-xs leading-5 text-emerald-700">Save 20% annually</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showConfetti ? (
                <div className="pointer-events-none absolute left-1/2 top-2 h-20 w-48 -translate-x-1/2">
                  {CONFETTI_PARTICLES.map((particle) => (
                    <motion.span
                      key={`${particle.id}-${isYearly ? "yearly" : "monthly"}`}
                      initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.6 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        x: [0, particle.x],
                        y: [0, -44, 24],
                        rotate: [0, particle.rotate, particle.rotate * 2],
                        scale: [0.6, 1, 0.9],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: particle.delay,
                        ease: "easeOut",
                      }}
                      className="absolute left-1/2 top-8 h-3 w-2 rounded-full"
                      style={{ backgroundColor: particle.color }}
                    />
                  ))}
                </div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan, index) => (
          <motion.div key={plan.title} variants={cardVariants} className="relative">
            {plan.isFeatured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 transform"
              >
                <div className="flex items-center gap-1.5 rounded-full bg-[#7626c6] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md">
                  <Star className="size-3 fill-current" />
                  Most Popular
                </div>
              </motion.div>
            )}

            <div
              className={`relative flex h-full flex-col rounded-[28px] border p-7 transition-all duration-300 ${
                plan.isFeatured
                  ? "border-[#7626c6] bg-[#faf5ff] shadow-[0_0_0_4px_rgba(118,38,198,0.08)] shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="mb-7 space-y-3">
                <h3 className="text-xl font-semibold tracking-tight text-gray-950">{plan.title}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>

                <div className="pt-2">
                  <div className="flex items-end gap-1">
                    <span className="text-[40px] font-semibold leading-none tracking-tight text-gray-950">
                      $<ScrollingNumber value={isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly} />
                    </span>
                    <span className="mb-1 text-sm text-gray-400">/month</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 flex items-center gap-2"
                  >
                    <span className="text-xs text-gray-400">{isYearly ? "billed yearly" : "billed monthly"}</span>
                    {isYearly && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"
                      >
                        Save ${(plan.price.monthly * 12) - plan.price.yearly}
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              </div>

              <div className="mb-7 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f1e5fb]">
                      {getFeatureIcon()}
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Button
                  variant={plan.isFeatured ? "default" : "outline"}
                  size="lg"
                  className={`w-full ${plan.isFeatured ? "bg-[#7626c6] text-white hover:bg-[#6620ab]" : ""}`}
                  onClick={() => onPlanSelect?.(plan, isYearly ? "yearly" : "monthly")}
                >
                  {plan.ctaText}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PricingTable;
