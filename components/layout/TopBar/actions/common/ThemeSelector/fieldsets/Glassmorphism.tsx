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
import { ThemeSvg } from '../theme-svg/default';
import { useCustomVariantsContext } from '@/core/theming/CustomVariants/CustomVariantsContextProvider';

export const GlassmorphismFieldset: FC = () => {
  const t = useTranslations('topbar.theme-selector.menu.fieldsets.glassmorphism');
  const { isGlassmorphismEnabled, setIsGlassmorphismEnabled } = useCustomVariantsContext();

  return (
    <FieldSet className="gap-0" animation="fadeIn" repeat>
      <FieldLegend variant="label">{t('title')}</FieldLegend>

      <RadioGroup
        value={`${isGlassmorphismEnabled}`}
        onValueChange={(value) => setIsGlassmorphismEnabled(value === 'true')}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {[true, false].map((shouldEnableGlassMorphism) => {
          const optionIdAttribute = `glassmorphism-option-${shouldEnableGlassMorphism}`;

          return (
            <FieldLabel key={optionIdAttribute} htmlFor={optionIdAttribute}>
              <Field>
                <FieldContent>
                  <div className="rounded border object-contain">
                    <ThemeSvg className="my-[-1px]" />
                  </div>

                  <FieldTitle className="flex w-full justify-between">
                    <span>
                      {shouldEnableGlassMorphism
                        ? t('options.enabled.title')
                        : t('options.disabled.title')}
                    </span>
                    <RadioGroupItem
                      id={optionIdAttribute}
                      value={shouldEnableGlassMorphism.toString()}
                    />
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
