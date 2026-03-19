import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyH1: FC<PropsWithChildren<HTMLProps<HTMLHeadingElement>>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance md:text-3xl',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
