import type { PropsWithChildren } from 'react';
import { SectionId } from '@/components/section/SectionId.enum';
import { LongPostLayout } from '@/components/layout/LongPostLayout';

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <LongPostLayout id={SectionId.Projects} className="max-w-full! items-start">
      {children}
    </LongPostLayout>
  );
}
