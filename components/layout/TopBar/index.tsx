'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from '@/lib/next-intl';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';
import { Reveal } from '@/components/ui/reveal';
import { SectionId } from '@/components/section/SectionId.enum';
import { MaxContentWidth } from '../../ui/layout/MaxContentWidth';
import styles from './index.module.scss';
import { TopBarActions } from './actions';

export const TopBar: FC = () => {
  const t = useTranslations();
  const { isWindowScrolled } = useIsWindowScrolled();
  const pathname = usePathname();
  const isNestedRoute = pathname !== '/';

  return (
    <nav
      className={cn(
        'text-foreground fixed top-0 z-50 w-full border-b border-transparent bg-transparent px-6 duration-300',
        isWindowScrolled &&
          cn(
            styles.navbarScrolledAnimation,
            'glass:bg-white/20 bg-white/20 backdrop-blur-xl dark:bg-black/20',
          ),
      )}
    >
      <MaxContentWidth className="flex h-16 max-w-7xl items-center justify-between">
        <Reveal animation="fadeIn" options={{ duration: 5 }}>
          <Link
            href={`${isNestedRoute ? '/' : ''}#${SectionId.Home}`}
            onClick={(e) => {
              if (isNestedRoute) return;
              e.preventDefault();
              document.getElementById(SectionId.Home)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <h1 className="from-primary via-secondary to-tertiary use-bg-as-text-color text-small glass:text-white block bg-gradient-to-r font-bold md:text-lg lg:text-xl">
              <span>{t('topbar.title.1')}</span>
              <span className="inline md:hidden lg:inline">{t('topbar.title.2')}</span>
            </h1>
          </Link>
        </Reveal>

        <TopBarActions />
      </MaxContentWidth>
    </nav>
  );
};
