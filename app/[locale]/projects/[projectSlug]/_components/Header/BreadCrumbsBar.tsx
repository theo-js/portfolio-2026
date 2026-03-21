'use client';

import { SectionId } from '@/components/section/SectionId.enum';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MaxContentWidth } from '@/components/ui/layout/MaxContentWidth';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { FC } from 'react';

interface BreadCrumbsBarProps {
  projectTitleTKey: string;
}

export const BreadCrumbsBar: FC<BreadCrumbsBarProps> = ({ projectTitleTKey }) => {
  const t = useTranslations();
  const { isWindowScrolled } = useIsWindowScrolled();

  return (
    <>
      <div className={cn(isWindowScrolled ? 'h-[36px]' : 'contents')} />

      <Breadcrumb
        className={cn(
          'right-0 left-0 z-1 mt-0 mb-4 w-full',
          isWindowScrolled &&
            cn(
              'border-foreground/10 border-b',
              'glass:bg-white/20 fixed top-[97px] -mt-8 bg-white/20 px-6 py-3',
              'backdrop-blur-3xl duration-0 md:duration-200 dark:bg-black/20',
            ),
        )}
      >
        <MaxContentWidth className="px-0">
          <BreadcrumbList options={{ duration: 2 }}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/#${SectionId.Projects}`}>{t('sections.projects.tag')}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem className="text-primary glass:text-white">
              {t(`sections.projects.${projectTitleTKey}`)}
            </BreadcrumbItem>
          </BreadcrumbList>
        </MaxContentWidth>
      </Breadcrumb>
    </>
  );
};
