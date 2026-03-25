'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { MaxContentWidth } from '@/components/ui/layout/MaxContentWidth';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

export const BreadCrumbsBar: FC = () => {
  const { isWindowScrolled } = useIsWindowScrolled();
  const t = useTranslations();

  return (
    <>
      <div className={cn(isWindowScrolled ? 'h-[48px]' : 'contents')} />

      <Breadcrumb
        className={cn(
          'right-0 left-0 z-1 mt-0 mb-4 w-full',
          isWindowScrolled &&
            cn(
              'border-foreground/10 border-b',
              'glass:bg-white/20 fixed top-[96px] -mt-8 bg-white/20 px-6 py-3',
              'backdrop-blur-3xl duration-0 md:duration-200 dark:bg-black/20',
            ),
        )}
      >
        <MaxContentWidth className="px-0">
          <BreadcrumbList
            options={{ duration: 2 }}
            className={cn('md:transition-all md:duration-200')}
          >
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Button
                  variant="link"
                  size="sm"
                  className={cn('text-primary glass:text-white', isWindowScrolled && 'text-[16px]')}
                  onClick={() => history.back()}
                >
                  <ArrowLeftIcon />
                  {t('common.back')}
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </MaxContentWidth>
      </Breadcrumb>
    </>
  );
};
