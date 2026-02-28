import { useTranslations } from 'next-intl';
import { PaletteIcon } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState, type FC } from 'react';
import { useCustomVariantsContext } from '@/core/theming/CustomVariants/CustomVariantsContextProvider';
import type { ColorTheme } from '@/core/theming/ThemeProvider';
import { ThemeSvg } from '../theme-svg/default';
import { Button } from '@/components/ui/button';

const colorThemesDictionary: Record<ColorTheme, { titleTKey: string }> = {
  plasma: { titleTKey: 'options.plasma.title' },
  cyberpunk: {
    titleTKey: 'options.cyberpunk.title',
  },
  copper: { titleTKey: 'options.copper.title' },
  emerald: { titleTKey: 'options.emerald.title' },
};

export const ColorThemeFieldset: FC = () => {
  const t = useTranslations('topbar.theme-selector.menu.fieldsets.color-theme');
  const { colorTheme, setColorTheme } = useCustomVariantsContext();
  const { colorThemes, appendNextColorThemes, canAppendMoreColorThemes } = useDisplayThemes();

  return (
    <AccordionItem value="color-theme">
      <FieldSet className="[&>*:first-child]:bg-background glass:[&>*:first-child]:bg-transparent gap-0 [&>*:first-child]:sticky [&>*:first-child]:top-[-17px] [&>*:first-child]:z-1">
        <AccordionTrigger className="p-0">
          <FieldLegend variant="label" className="flex items-center gap-2">
            <PaletteIcon />
            <span>{t('title')}</span>
          </FieldLegend>
        </AccordionTrigger>

        <AccordionContent className="flex flex-col items-end gap-4">
          <RadioGroup
            value={colorTheme}
            onValueChange={(value) => setColorTheme(value as ColorTheme)}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            {colorThemes.map((colorTheme) => {
              const optionIdAttribute = `color-theme-option-${colorTheme.id}`;

              return (
                <FieldLabel key={optionIdAttribute} htmlFor={optionIdAttribute}>
                  <Field>
                    <FieldContent>
                      <div className="rounded border object-contain">
                        <ThemeSvg className="my-[-1px]" overrideColorTheme={colorTheme.id} />
                      </div>

                      <FieldTitle className="flex w-full justify-between">
                        <span>{t(colorTheme.titleTKey)}</span>
                        <RadioGroupItem id={optionIdAttribute} value={colorTheme.id} />
                      </FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>

          {canAppendMoreColorThemes && (
            <Button variant="ghost" onClick={appendNextColorThemes}>
              {t('show-more')}
            </Button>
          )}
        </AccordionContent>
      </FieldSet>
    </AccordionItem>
  );
};

const THEMES_PAGE_SIZE = 3;
const allColorThemes = Object.keys(colorThemesDictionary).map((key) => ({
  id: key as ColorTheme,
  ...colorThemesDictionary[key as ColorTheme],
}));

function useDisplayThemes() {
  const [numberOfThemesToShow, setNumberOfThemesToShow] = useState(THEMES_PAGE_SIZE);
  const themesToShow = allColorThemes.slice(0, numberOfThemesToShow);

  return {
    colorThemes: themesToShow,
    appendNextColorThemes: () =>
      setNumberOfThemesToShow((prevState) => prevState + THEMES_PAGE_SIZE),
    canAppendMoreColorThemes: themesToShow.length < allColorThemes.length,
  };
}
