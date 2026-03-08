'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger, PopoverList } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, usePathname } from '@/lib/next-intl';
import { LanguagesIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { FC } from 'react';

interface LanguageSelectorProps {
  align: Parameters<typeof PopoverContent>[0]['align'];
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ align }) => {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              aria-label={t('topbar.language-selector.label')}
            >
              <LanguagesIcon />
              <span className="text-xs">{t(`languages.${currentLocale}.short`)}</span>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent className="hidden md:block">
          {t('topbar.language-selector.label')}
        </TooltipContent>
      </Tooltip>

      <PopoverContent align={align} sideOffset={8} className="w-fit">
        <PopoverList
          items={process.env.NEXT_PUBLIC_SUPPORTED_LOCALES?.split(',') || []}
          getItemProps={(locale) => ({ key: locale, isSelected: locale === currentLocale })}
          renderItem={(locale) =>
            locale === currentLocale ? (
              <span className="cursor-default text-sm">
                {t(`languages.${locale}.short`)}
                &nbsp;&nbsp;
                {t(`languages.${locale}.long`)}
              </span>
            ) : (
              <Link href={`/${locale}${pathname}`} className="text-sm">
                {t(`languages.${locale}.short`)}
                &nbsp;&nbsp;
                {t(`languages.${locale}.long`)}
              </Link>
            )
          }
        />
      </PopoverContent>
    </Popover>
  );
};
