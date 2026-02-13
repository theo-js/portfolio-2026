import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';
import { MaxContentWidth } from './MaxContentWidth';

export type ViewportSectionProps = PropsWithChildren<HTMLProps<HTMLDivElement>>;

export const ViewportSection: FC<ViewportSectionProps> = (props) => (
  <section
    {...props}
    className={cn(
      'relative flex min-h-dvh items-center justify-center overflow-hidden px-6',
      props.className,
    )}
  >
    <MaxContentWidth>{props.children}</MaxContentWidth>
  </section>
);
