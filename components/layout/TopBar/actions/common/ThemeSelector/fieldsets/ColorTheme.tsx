import { useTranslations } from 'next-intl';
import { PaletteIcon, PlusIcon } from 'lucide-react';
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
import { type FC, type RefObject, useState } from 'react';
import { useCustomVariantsContext } from '@/core/theming/CustomVariants/CustomVariantsContextProvider';
import {
  colorThemesDictionary,
  type ColorTheme,
} from '@/core/theming/CustomVariants/color-theme/themes';
import { ThemePreview } from './ThemePreview';
import { Button } from '@/components/ui/button';

interface ColorThemeFieldsetProps {
  scrollableContainerRef: RefObject<HTMLDivElement | null>;
}

export const ColorThemeFieldset: FC<ColorThemeFieldsetProps> = ({ scrollableContainerRef }) => {
  const t = useTranslations('topbar.theme-selector.menu.fieldsets.color-theme');
  const { colorTheme, setColorTheme } = useCustomVariantsContext();
  const { colorThemes, appendNextColorThemes, canAppendMoreColorThemes } = useDisplayThemes();

  function handleValueChange(value: ColorTheme): void {
    setColorTheme(value);
  }

  function handleShowMore() {
    appendNextColorThemes();
    requestAnimationFrame(() => {
      scrollableContainerRef.current?.scrollTo({
        top: scrollableContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    });
  }

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
            onValueChange={handleValueChange}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {colorThemes.map((colorTheme) => {
              const optionIdAttribute = `color-theme-option-${colorTheme.id}`;

              return (
                <FieldLabel key={optionIdAttribute} htmlFor={optionIdAttribute}>
                  <Field>
                    <FieldContent>
                      <div className="rounded border object-contain">
                        <ThemePreview className="my-[-1px]" overrideColorTheme={colorTheme.id} />
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
            <Button variant="ghost" onClick={handleShowMore}>
              <PlusIcon />
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
