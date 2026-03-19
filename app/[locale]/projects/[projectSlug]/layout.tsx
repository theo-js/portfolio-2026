import type { PropsWithChildren } from 'react';
import { SectionId } from '@/components/section/SectionId.enum';

import { ReadingProgressIndicator } from './_components/ReadingProgressIndicator';
import { ScrollToTopButton } from './_components/ScrollToTopButton';
import { PROJECT_DETAILS_BODY_ID_ATTRIBUTE } from './_components/Body';

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ReadingProgressIndicator articleContentId={PROJECT_DETAILS_BODY_ID_ATTRIBUTE} />

      <div id={SectionId.Projects} className="max-w-full! items-start">
        {children}
      </div>

      <ScrollToTopButton />
    </>
  );
}
