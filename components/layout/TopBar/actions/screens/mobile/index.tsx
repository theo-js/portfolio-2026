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
import { Reveal } from '@/components/ui/motion/Reveal';

export const TopBarActionsMobile: FC = () => {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const { currentSection } = useGetCurrentSection({
    sectionIds: sections.map((section) => section.id),
    linksContainerRef,
    /*
    This is needed to account for the fact that the links are wrapped in a Reveal component
    which adds an extra element around them,
    so we need to get the offset from the parent element of the link
    */
    getLinkElementOffset: (e) => ({
      offsetLeft: e.parentElement?.offsetLeft ?? 0,
      offsetTop: e.parentElement?.offsetTop ?? 0,
    }),
  });

  return (
    <>
      <Reveal animation="scaleIn" className="relative flex! flex-row-reverse items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </Button>

        <ColorModeToggleMobile />

        <LanguageSelector align="start" />
      </Reveal>

      <ModalOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        overlayClassName="top-16 md:hidden"
        contentClassName="h-full w-full flex items-center justify-center"
      >
        <div ref={linksContainerRef} className="relative">
          <Reveal
            as="ul"
            childAs="li"
            childProps={(index) => ({
              style: {
                position:
                  // We need to set the position of CurrentSectionIndicator's container to absolute to avoid layout errors
                  index === 0 ? ('absolute' as React.CSSProperties['position']) : 'static',
              },
            })}
            animation="scaleIn"
            className="flex! flex-col items-center gap-4"
          >
            <CurrentSectionIndicator activeLink={currentSection?.linkElement} isMobile />

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
          </Reveal>
        </div>
      </ModalOverlay>
    </>
  );
};
