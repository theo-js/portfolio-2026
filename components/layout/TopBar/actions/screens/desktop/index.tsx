'use client';

import { type FC, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { useGetCurrentSection } from '../../common/use-get-current-section';
import { CurrentSectionIndicator } from '../../common/CurrentSectionIndicator';
import { LanguageSelector } from '../../common/LanguageSelector';
import { ColorModeToggle } from './ColorModeToggle';
import { sections } from '../../common/constants';

export const TopBarActionsDesktop: FC = () => {
  const t = useTranslations();
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const { currentSection } = useGetCurrentSection({
    sectionIds: sections.map((section) => section.id),
    linksContainerRef,
  });

  return (
    <div ref={linksContainerRef} className="relative hidden items-center gap-4 md:flex lg:gap-8">
      {sections.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          className={cn(currentSection?.id === item.id && 'text-primary!')}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {t(item.tKey)}
        </Link>
      ))}
      <CurrentSectionIndicator activeLink={currentSection?.linkElement} isVertical={false} />

      <LanguageSelector align="end" />
      <ColorModeToggle />
    </div>
  );
};
