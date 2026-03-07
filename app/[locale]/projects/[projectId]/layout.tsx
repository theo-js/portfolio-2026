import { BaseSection } from '@/components/section/components/BaseSection';
import type { PropsWithChildren } from 'react';

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <BaseSection id="projects" noHeading>
      {children}
    </BaseSection>
  );
}
