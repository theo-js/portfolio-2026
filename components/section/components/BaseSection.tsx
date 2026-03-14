import { Reveal } from '@/components/ui/reveal';
import { getTranslations } from 'next-intl/server';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { SectionId } from '../SectionId.enum';
import { ViewportSection, type ViewportSectionProps } from '@/components/ui/layout/ViewportSection';
import { SectionTag } from './SectionTag';
import { SectionTitle } from './SectionTitle';

interface BaseSectionProps extends Omit<ViewportSectionProps, 'id'> {
  id: `${SectionId}`;
  noHeading?: boolean;
  questionMark?: ReactNode;
  headingProps?: ComponentProps<typeof Reveal>;
}

export const BaseSection: React.FC<BaseSectionProps> = async ({
  id,
  children,
  className,
  noHeading,
  questionMark,
  headingProps,
  ...props
}) => {
  const t = await getTranslations();
  return (
    <ViewportSection id={id} {...props} className={cn('py-24', className)}>
      {!noHeading && (
        <>
          <Reveal {...headingProps}>
            <SectionTag>{t(`sections.${id}.tag`)}</SectionTag>
            <SectionTitle {...{ questionMark }}>{t(`sections.${id}.title`)}</SectionTitle>
          </Reveal>
        </>
      )}

      {children}
    </ViewportSection>
  );
};
