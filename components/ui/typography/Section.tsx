import { cn } from '@/lib/utils';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const Section: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  className,
  ...rest
}) => <div className={cn('scroll-mt-20 pt-12', className)} {...rest} />;
