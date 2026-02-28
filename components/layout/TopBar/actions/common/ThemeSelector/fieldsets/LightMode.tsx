import { useTranslations } from 'next-intl';
import { MoonIcon, SunIcon } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Tooltip, TooltipContent, TooltipTitle, TooltipTrigger } from '@/components/ui/tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from 'next-themes';
import { Fragment, PropsWithChildren, useState, type FC } from 'react';
import type { LightMode } from '@/core/theming/ThemeProvider';
import { ThemePreview } from './ThemePreview';

const lightModeDictionary: Record<LightMode, { titleTKey: string; descriptionTKey?: string }> = {
  light: {
    titleTKey: 'options.light.title',
  },
  dark: {
    titleTKey: 'options.dark.title',
  },
  system: {
    titleTKey: 'options.system.title',
    descriptionTKey: 'options.system.description',
  },
};
const lightModes = Object.keys(lightModeDictionary).map((key) => ({
  id: key as LightMode,
  ...lightModeDictionary[key as LightMode],
}));

export const LightmodeFieldset: FC = () => {
  const t = useTranslations('topbar.theme-selector.menu.fieldsets.light-mode');
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <AccordionItem value="light-mode">
      <FieldSet className="[&>*:first-child]:bg-background glass:[&>*:first-child]:bg-transparent gap-0 [&>*:first-child]:sticky [&>*:first-child]:top-[-17px] [&>*:first-child]:z-1">
        <AccordionTrigger className="p-0">
          <FieldLegend variant="label" className="flex items-center gap-2">
            {resolvedTheme === 'light' ? <SunIcon /> : <MoonIcon />}
            <span>{t('title')}</span>
          </FieldLegend>
        </AccordionTrigger>

        <AccordionContent>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value)}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            {lightModes.map((lightMode) => {
              const optionIdAttribute = `light-mode-option-${lightMode.id}`;

              return (
                <Fragment key={lightMode.id}>
                  <FieldLabelWithTooltip htmlFor={optionIdAttribute}>
                    <Field>
                      <FieldContent>
                        <div className="rounded border object-contain">
                          <ThemePreview overrideLightMode={lightMode.id} className="my-[-1px]" />
                        </div>

                        <FieldTitle className="flex w-full justify-between">
                          <span>{t(lightMode.titleTKey)}</span>
                          <RadioGroupItem id={optionIdAttribute} value={lightMode.id} />
                        </FieldTitle>

                        {/* Show description on mobile since there is only 1 grid column */}
                        {lightMode.descriptionTKey && (
                          <FieldDescription className="md:hidden">
                            {t(lightMode.descriptionTKey)}
                          </FieldDescription>
                        )}
                      </FieldContent>
                    </Field>

                    {/** Show tooltip on desktop */}
                    {lightMode.descriptionTKey && (
                      <TooltipContent className="hidden max-w-xs md:block">
                        <TooltipTitle className="mb-2">{t(lightMode.titleTKey)} </TooltipTitle>

                        <p>{t(lightMode.descriptionTKey)}</p>
                      </TooltipContent>
                    )}
                  </FieldLabelWithTooltip>
                </Fragment>
              );
            })}
          </RadioGroup>
        </AccordionContent>
      </FieldSet>
    </AccordionItem>
  );
};

const FieldLabelWithTooltip: FC<PropsWithChildren<{ htmlFor: string }>> = ({
  htmlFor,
  children,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  return (
    <Tooltip delayDuration={200} open={isTooltipOpen}>
      <TooltipTrigger asChild>
        <FieldLabel
          htmlFor={htmlFor}
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
        >
          {children}
        </FieldLabel>
      </TooltipTrigger>
    </Tooltip>
  );
};
