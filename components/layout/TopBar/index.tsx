'use client';

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { MaxContentWidth } from '../../ui/layout/MaxContentWidth';
import { Link } from '@/components/ui/link';
import { useTranslations } from 'next-intl';
import { useWindowScroll } from '@/core/runtime/useWindowScroll';
import { LanguageSelector } from './LanguageSelector';
import { ColorModeToggle } from './ColorModeToggle';
import { useGetCurrentSection } from './use-get-current-section';
import { SectionId } from '@/components/sections/SectionId.enum';
import styles from './index.module.scss';

const sectionsDictionary: Record<SectionId, { tKey: string }> = {
  [SectionId.Home]: { tKey: 'sections.home.title' },
  [SectionId.About]: { tKey: 'sections.about.title' },
  [SectionId.Skills]: { tKey: 'sections.skills.title' },
  [SectionId.Projects]: { tKey: 'sections.projects.title' },
  [SectionId.Contact]: { tKey: 'sections.contact.title' },
};
const sections = Object.keys(sectionsDictionary).map((id) => ({
  ...sectionsDictionary[id as SectionId],
  id: id as SectionId,
}));

export const TopBar: FC = () => {
  const t = useTranslations();
  const { windowScroll } = useWindowScroll();
  const isScrolled = windowScroll?.y > 0;

  const { currentSection } = useGetCurrentSection(sections.map((section) => section.id));
  return (
    <nav
      className={cn(
        'text-foreground fixed top-0 z-50 w-full border-b border-transparent bg-transparent px-6 duration-300',
        isScrolled &&
          cn(
            styles.navbarScrolledAnimation,
            'border-white bg-white/60 backdrop-blur-xl dark:bg-black/20',
          ),
      )}
    >
      <MaxContentWidth className="flex h-16 items-center justify-between">
        <h1 className="from-primary via-secondary to-tertiary block bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
          {t('topbar.title')}
        </h1>

        <div className="hidden items-center gap-8 md:flex">
          {sections.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={cn(currentSection === item.id && 'text-primary!')}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t(item.tKey)}
            </Link>
          ))}

          <LanguageSelector />
          <ColorModeToggle />
        </div>
      </MaxContentWidth>
    </nav>
  );
};
