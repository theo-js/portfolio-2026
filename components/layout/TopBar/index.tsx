'use client';

import { useRef, type FC } from 'react';
import { cn } from '@/lib/utils';
import { MaxContentWidth } from '../../ui/layout/MaxContentWidth';
import { Link } from '@/components/ui/link';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from './LanguageSelector';
import { ColorModeToggle } from './ColorModeToggle';
import { useGetCurrentSection } from './use-get-current-section';
import { CurrentSectionIndicator } from './CurrentSectionIndicator';
import { sections } from './constants';
import styles from './index.module.scss';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';

export const TopBar: FC = () => {
  const t = useTranslations();
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const { isWindowScrolled } = useIsWindowScrolled();

  const { currentSection } = useGetCurrentSection({
    sectionIds: sections.map((section) => section.id),
    linksContainerRef,
  });

  return (
    <nav
      className={cn(
        'text-foreground fixed top-0 z-50 w-full border-b border-transparent bg-transparent px-6 duration-300',
        isWindowScrolled && cn(styles.navbarScrolledAnimation, 'backdrop-blur-xl dark:bg-black/20'),
      )}
    >
      <MaxContentWidth className="flex h-16 items-center justify-between">
        <h1 className="from-primary via-secondary to-tertiary block bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent lg:text-xl">
          <span>{t('topbar.title.1')}</span>
          <span className="inline md:hidden lg:inline">{t('topbar.title.2')}</span>
        </h1>

        <div
          ref={linksContainerRef}
          className="relative hidden items-center gap-4 md:flex lg:gap-8"
        >
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

          <LanguageSelector />
          <ColorModeToggle />
        </div>
      </MaxContentWidth>
    </nav>
  );
};
