import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? 'a' : 'div';

  return (
    <Card
      {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
      className={cn('help-testimonial-card', className)}
    >
      <div className="help-testimonial-card__author">
        <Avatar className="help-testimonial-card__avatar">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="help-testimonial-card__identity">
          <h3 className="help-testimonial-card__name">{author.name}</h3>
          <p className="help-testimonial-card__handle">{author.handle}</p>
        </div>
      </div>
      <p className="help-testimonial-card__text">{text}</p>
    </Card>
  );
}
