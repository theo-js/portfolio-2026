import type { PropsWithChildren } from 'react';
import { LongPostLayout } from '@/components/layout/LongPostLayout';

export default function ProjectLayout({ children }: PropsWithChildren) {
  return <LongPostLayout>{children}</LongPostLayout>;
}
