import { useTranslations } from 'next-intl';
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { FC } from 'react';
import { useCustomVariantsContext } from '@/core/theming/CustomVariants/CustomVariantsContextProvider';
import type { ColorTheme } from '@/core/theming/ThemeProvider';
import { ThemeSvg } from '../theme-svg/default';

const colorThemesDictionary: Record<ColorTheme, { titleTKey: string }> = {
  plasma: { titleTKey: 'options.plasma.title' },
  cyberpunk: {
    titleTKey: 'options.cyberpunk.title',
  },
  copper: { titleTKey: 'options.copper.title' },
  emerald: { titleTKey: 'options.emerald.title' },
};
const colorThemes = Object.keys(colorThemesDictionary).map((key) => ({
  id: key as ColorTheme,
  ...colorThemesDictionary[key as ColorTheme],
}));

export const ColorThemeFieldset: FC = () => {
  const t = useTranslations('topbar.theme-selector.menu.fieldsets.color-theme');
  const { colorTheme, setColorTheme } = useCustomVariantsContext();

  return (
    <FieldSet className="gap-0" animation="fadeIn" repeat>
      <FieldLegend variant="label">{t('title')}</FieldLegend>
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
    </FieldSet>
  );
};
