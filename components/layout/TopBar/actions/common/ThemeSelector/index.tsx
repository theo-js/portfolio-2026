'use client';

import { useTranslations } from 'next-intl';
import { XIcon } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRef, type FC, type PropsWithChildren } from 'react';
import { LightmodeFieldset } from './fieldsets/LightMode';
import { GlassmorphismFieldset } from './fieldsets/Glassmorphism';
import { ColorThemeFieldset } from './fieldsets/ColorTheme';

interface ThemeSelectorProps {
  align: Parameters<typeof PopoverContent>[0]['align'];
}

export const ThemeSelectorMenu: FC<PropsWithChildren<ThemeSelectorProps>> = ({
  align,
  children,
}) => {
  const t = useTranslations('topbar.theme-selector.menu');
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverTriggerRef}>
        {children}
      </PopoverTrigger>

      <PopoverContent
        align={align}
        sideOffset={8}
        className="glass:bg-white/20 glass:backdrop-blur-3xl w-md max-w-screen pb-4 shadow-xl md:w-xl"
      >
        <PopoverHeader>
          <PopoverTitle className="flex items-start justify-between gap-4">
            <span>{t('title')}</span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => popoverTriggerRef.current?.click()}
            >
              <XIcon />
            </Button>
          </PopoverTitle>

          <PopoverDescription className="mt-[-2px]">{t('description')}</PopoverDescription>
        </PopoverHeader>

        <Accordion type="single" className="max-h-[400px] overflow-y-auto p-4 pb-0">
          <FieldGroup>
            <LightmodeFieldset />
            <GlassmorphismFieldset />
            <ColorThemeFieldset />
          </FieldGroup>
        </Accordion>
      </PopoverContent>
    </Popover>
  );
};
