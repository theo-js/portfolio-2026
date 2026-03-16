import { SectionId } from '@/components/section/SectionId.enum';
import type { PropsWithChildren } from 'react';

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <main id={SectionId.Projects} className="max-w-full! items-start">
      {children}
    </main>
  );
}
