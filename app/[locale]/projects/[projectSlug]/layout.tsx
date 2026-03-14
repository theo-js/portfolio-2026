import { SectionId } from '@/components/section/SectionId.enum';
import type { PropsWithChildren } from 'react';

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <section id={SectionId.Projects} className="max-w-full! items-start">
      {children}
    </section>
  );
}
