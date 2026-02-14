'use client';

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { MaxContentWidth } from '../../ui/layout/MaxContentWidth';
import { useTranslations } from 'next-intl';
import styles from './index.module.scss';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';
import { TopBarActions } from './actions';

export const TopBar: FC = () => {
  const t = useTranslations();
  const { isWindowScrolled } = useIsWindowScrolled();

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

        <TopBarActions />
      </MaxContentWidth>
    </nav>
  );
};
