'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from '@/lib/next-intl';
import { LogoWithTransparentBg } from '@/assets/svg/logo/transparent-bg';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';
import { Reveal } from '@/components/ui/reveal';
import { SectionId } from '@/components/section/SectionId.enum';
import { MaxContentWidth } from '../../ui/layout/MaxContentWidth';
import { TopBarActions } from './actions';
import styles from './index.module.scss';

export const TopBar: FC = () => {
  const t = useTranslations();
  const { isWindowScrolled } = useIsWindowScrolled();
  const pathname = usePathname();
  const isNestedRoute = pathname !== '/';
  const TitleTag = isNestedRoute ? 'span' : 'h1';

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
            <TitleTag className="from-primary via-secondary to-tertiary use-bg-as-text-color glass:text-white flex items-center bg-gradient-to-r text-xs font-bold tracking-widest">
              <LogoWithTransparentBg className="-ml-3 size-16" />
              <span className="-ml-2 flex flex-col leading-[1.125]">
                <span>{t('topbar.title.1')}</span>
                <span>{t('topbar.title.2')}</span>
              </span>
            </TitleTag>
          </Link>
        </Reveal>

        <TopBarActions />
      </MaxContentWidth>
    </nav>
  );
};
