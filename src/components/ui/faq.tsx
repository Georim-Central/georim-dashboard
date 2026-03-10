"use client";

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FaqSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  items: {
    question: string;
    answer: string;
  }[];
  contactInfo?: {
    title: string;
    description: string;
    buttonText: string;
    onContact?: () => void;
  };
}

const FaqSection = React.forwardRef<HTMLElement, FaqSectionProps>(
  ({ className, title, description, items, contactInfo, ...props }, ref) => (
    <section ref={ref} className={cn('help-faq-section', className)} {...props}>
      <div className="help-faq-section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="help-faq-section__header"
        >
          <h2 className="help-faq-section__title">{title}</h2>
          {description && <p className="help-faq-section__description">{description}</p>}
        </motion.div>

        <div className="help-faq-section__items">
          {items.map((item, index) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} index={index} />
          ))}
        </div>

        {contactInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="help-faq-section__contact"
          >
            <div className="help-faq-section__contact-icon">
              <Mail />
            </div>
            <p className="help-faq-section__contact-title">{contactInfo.title}</p>
            <p className="help-faq-section__contact-description">{contactInfo.description}</p>
            <Button size="sm" onClick={contactInfo.onContact}>
              {contactInfo.buttonText}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
);

FaqSection.displayName = 'FaqSection';

const FaqItem = React.forwardRef<
  HTMLDivElement,
  {
    question: string;
    answer: string;
    index: number;
  }
>(({ question, answer, index }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={cn('help-faq-item', isOpen && 'help-faq-item--open')}
    >
      <Button
        variant="ghost"
        onClick={() => setIsOpen((currentState) => !currentState)}
        className="help-faq-item__trigger"
      >
        <h3 className={cn('help-faq-item__question', isOpen && 'help-faq-item__question--open')}>{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.08 : 1 }}
          transition={{ duration: 0.2 }}
          className={cn('help-faq-item__icon', isOpen && 'help-faq-item__icon--open')}
        >
          <ChevronDown />
        </motion.div>
      </Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: 'easeIn' },
            }}
          >
            <div className="help-faq-item__answer-shell">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="help-faq-item__answer"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FaqItem.displayName = 'FaqItem';

export { FaqSection };
