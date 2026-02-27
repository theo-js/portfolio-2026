'use client';

import { type FC, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { Reveal } from '@/components/ui/reveal';
import { useGetCurrentSection } from '../../common/use-get-current-section';
import { CurrentSectionIndicator } from '../../common/CurrentSectionIndicator';
import { LanguageSelector } from '../../common/LanguageSelector';
import { ThemeSelectorMenuTriggerDesktop } from './ThemeSelectorTrigger';
import { sections } from '../../common/constants';

const reverseSections = [...sections].reverse();

export const TopBarActionsDesktop: FC = () => {
  const t = useTranslations();
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const { currentSection } = useGetCurrentSection({
    sectionIds: sections.map((section) => section.id),
    linksContainerRef,
    getLinkElementOffset: (e) => ({
      // This is necessary because the link elements are wrapped in a <li> for desktop, which affects their offset
      offsetLeft: e.parentElement?.offsetLeft ?? 0,
      offsetTop: e.parentElement?.offsetTop ?? 0,
    }),
  });

  return (
    <div ref={linksContainerRef} className="relative">
      <Reveal
        animation="scaleIn"
        options={{ stagger: 0.02 }}
        as="ul"
        childAs="li"
        className="flex! flex-row-reverse items-center gap-4 lg:gap-8"
      >
        <ThemeSelectorMenuTriggerDesktop />

        <LanguageSelector align="end" />

        {reverseSections.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'glass:text-white',
              currentSection?.id === item.id && 'text-primary! glass:text-white!',
            )}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t(item.tKey)}
          </Link>
        ))}

        <CurrentSectionIndicator activeLink={currentSection?.linkElement} isMobile={false} />
      </Reveal>
    </div>
  );
};
