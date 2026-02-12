import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';
import { MaxContentWidth } from './MaxContentWidth';

export const ViewportSection: FC<PropsWithChildren<HTMLProps<HTMLDivElement>>> = (props) => (
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
