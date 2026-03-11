import { Reveal } from '@/components/ui/reveal';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import type { SectionId } from '../SectionId.enum';
import { ViewportSection, type ViewportSectionProps } from '@/components/ui/layout/ViewportSection';
import { SectionTag } from './SectionTag';
import { SectionTitle } from './SectionTitle';
import type { ReactNode } from 'react';

interface BaseSectionProps extends Omit<ViewportSectionProps, 'id'> {
  id: `${SectionId}`;
  noHeading?: boolean;
  questionMark?: ReactNode;
}

export const BaseSection: React.FC<BaseSectionProps> = async ({
  id,
  children,
  className,
  noHeading,
  questionMark,
  ...props
}) => {
  const t = await getTranslations();
  return (
    <ViewportSection id={id} {...props} className={cn('py-24', className)}>
      {!noHeading && (
        <>
          <Reveal>
            <SectionTag>{t(`sections.${id}.tag`)}</SectionTag>
            <SectionTitle {...{ questionMark }}>{t(`sections.${id}.title`)}</SectionTitle>
          </Reveal>
        </>
      )}

      {children}
    </ViewportSection>
  );
};
