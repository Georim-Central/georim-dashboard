import { cn } from '@/lib/utils';
import { TestimonialCard, TestimonialAuthor } from '@/components/ui/testimonial-card';

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const repeatedTestimonials = Array.from({ length: 4 }, (_, setIndex) =>
    testimonials.map((testimonial, index) => ({
      ...testimonial,
      id: `${setIndex}-${index}`,
    }))
  ).flat();

  return (
    <section className={cn('help-testimonials-section', className)}>
      <div className="help-testimonials-section__inner">
        <div className="help-testimonials-section__header">
          <h2 className="help-testimonials-section__title">{title}</h2>
          <p className="help-testimonials-section__description">{description}</p>
        </div>

        <div className="help-testimonials-marquee">
          <div className="help-testimonials-marquee__track">
            {repeatedTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
          <div className="help-testimonials-marquee__fade help-testimonials-marquee__fade--left" />
          <div className="help-testimonials-marquee__fade help-testimonials-marquee__fade--right" />
        </div>
      </div>
    </section>
  );
}
