'use client';

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { MaxContentWidth } from '../../ui/layout/MaxContentWidth';
import { useTranslations } from 'next-intl';
import styles from './index.module.scss';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';
import { Reveal } from '@/components/ui/reveal';
import { TopBarActions } from './actions';

export const TopBar: FC = () => {
  const t = useTranslations();
  const { isWindowScrolled } = useIsWindowScrolled();

  return (
    <nav
      className={cn(
        'text-foreground fixed top-0 z-50 w-full border-b border-transparent bg-transparent px-6 duration-300',
        isWindowScrolled &&
          cn(styles.navbarScrolledAnimation, 'bg-white/20 backdrop-blur-xl dark:bg-black/20'),
      )}
    >
      <MaxContentWidth className="flex h-16 max-w-7xl items-center justify-between">
        <Reveal animation="fadeIn" options={{ duration: 5 }}>
          <h1 className="from-primary via-secondary to-tertiary use-bg-as-text-color text-small block bg-gradient-to-r font-bold md:text-lg lg:text-xl">
            <span>{t('topbar.title.1')}</span>
            <span className="inline md:hidden lg:inline">{t('topbar.title.2')}</span>
          </h1>
        </Reveal>

        <TopBarActions />
      </MaxContentWidth>
    </nav>
  );
};
