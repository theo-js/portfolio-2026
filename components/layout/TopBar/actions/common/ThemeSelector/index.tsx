'use client';

import { useTranslations } from 'next-intl';
import { FieldGroup } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { FC, PropsWithChildren } from 'react';
import { LightmodeFieldset } from './fieldsets/LightMode';
// import { GlassmorphismFieldset } from './fieldsets/Glassmorphism';
import { ColorThemeFieldset } from './fieldsets/ColorTheme';

interface ThemeSelectorProps {
  align: Parameters<typeof PopoverContent>[0]['align'];
}

export const ThemeSelectorMenu: FC<PropsWithChildren<ThemeSelectorProps>> = ({
  align,
  children,
}) => {
  const t = useTranslations('topbar.theme-selector.menu');

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent align={align} sideOffset={8} className="w-md max-w-screen md:w-xl">
        <PopoverHeader>
          <PopoverTitle>{t('title')}</PopoverTitle>
          <PopoverDescription>{t('description')}</PopoverDescription>
        </PopoverHeader>

        <FieldGroup className="max-h-[400px] overflow-y-auto p-4">
          <LightmodeFieldset />
          {/* <GlassmorphismFieldset /> */}
          <ColorThemeFieldset />
        </FieldGroup>
      </PopoverContent>
    </Popover>
  );
};
