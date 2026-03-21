'use client';

import { cn } from '@/lib/utils';
import { useSectionObserver } from 'react-use-section-observer';

interface ScrollspyMenuProps {
  links: {
    id: string;
    label: string;
  }[];
  className?: string;
}

export const ScrollspyMenu = ({ links, className }: ScrollspyMenuProps) => {
  useSectionObserver({
    ids: links.map((link) => link.id),
    activeClassName: 'text-primary! glass:text-white!',
  });
  return (
    <nav className={cn('shrink-0', className)}>
      <ul className="sticky top-33 flex flex-col gap-6">
        {links.map((link) => (
          <li key={link.id} className="leading-snug">
            <a
              href={`#${link.id}`}
              className="text-foreground/80 hover:text-foreground focus-visible:text-foreground font-semibold"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
