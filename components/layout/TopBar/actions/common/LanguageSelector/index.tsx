'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger, PopoverList } from '@/components/ui/popover';
import { Link } from '@/lib/next-intl';
import { LanguagesIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { FC } from 'react';

interface LanguageSelectorProps {
  align: Parameters<typeof PopoverContent>[0]['align'];
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ align }) => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <LanguagesIcon />
          <span className="text-xs">{t(`languages.${locale}.short`)}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align={align} sideOffset={8} className="w-fit">
        <PopoverList
          items={process.env.NEXT_PUBLIC_SUPPORTED_LOCALES?.split(',') || []}
          getItemProps={(item) => ({ key: item, isSelected: item === locale })}
          renderItem={(locale) => (
            <Link href={`/${locale}`} className="text-sm">
              {t(`languages.${locale}.short`)}
              &nbsp;&nbsp;
              {t(`languages.${locale}.long`)}
            </Link>
          )}
        />
      </PopoverContent>
    </Popover>
  );
};
