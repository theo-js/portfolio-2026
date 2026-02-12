import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const MaxContentWidth: FC<PropsWithChildren<HTMLProps<HTMLDivElement>>> = (props) => (
  <div {...props} className={cn('mx-auto max-w-7xl', props.className)} />
);
