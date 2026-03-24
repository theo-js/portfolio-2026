'use client';

import { cn } from '@/lib/utils';
import { useSectionObserver } from 'react-use-section-observer';

const SCROLLSPY_MENU_CLASSNAME = 'scrollspy-menu';

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
    activeClassName: 'text-primary! glass:text-white! glass:underline',
    linkAccessors: {
      getIsLinkActive: ({ link, activeElement }) =>
        link.getAttribute('href') === `#${activeElement.id}`,
      // Add scope to the selector to ensure it only targets links within this menu
      getLinkSelector: (linkId) => `.${SCROLLSPY_MENU_CLASSNAME} a[href="#${linkId}"]`,
    },
  });
  return (
    <nav className={cn(SCROLLSPY_MENU_CLASSNAME, 'shrink-0', className)}>
      <ul className="sticky top-33 flex flex-col gap-6">
        {links.map((link) => (
          <li key={link.id} className="leading-snug">
            <a
              href={`#${link.id}`}
              className="text-foreground/60 hover:text-foreground focus-visible:text-foreground text-[16px] font-semibold"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
