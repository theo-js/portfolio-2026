'use client';

import { type FC, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { useGetCurrentSection } from '../../common/use-get-current-section';
import { CurrentSectionIndicator } from '../../common/CurrentSectionIndicator';
import { LanguageSelector } from '../../common/LanguageSelector';
import { ColorModeToggleMobile } from './ColorModeToggle';
import { sections } from '../../common/constants';
import { ModalOverlay } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon } from 'lucide-react';

export const TopBarActionsMobile: FC = () => {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const { currentSection } = useGetCurrentSection({
    sectionIds: sections.map((section) => section.id),
    linksContainerRef,
  });

  return (
    <>
      <div className="relative flex items-center gap-1">
        <LanguageSelector align="start" />

        <ColorModeToggleMobile />

        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>

      <ModalOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        overlayClassName="top-16 md:hidden"
        contentClassName="h-full w-full flex items-center justify-center"
      >
        <div ref={linksContainerRef} className="relative flex flex-col items-center gap-4">
          {sections.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'py-2 text-3xl',
                currentSection?.id === item.id &&
                  'from-primary via-secondary to-tertiary use-bg-as-text-color bg-gradient-to-r text-transparent!',
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              {t(item.tKey)}
            </Link>
          ))}

          <CurrentSectionIndicator activeLink={currentSection?.linkElement} isMobile />
        </div>
      </ModalOverlay>
    </>
  );
};
