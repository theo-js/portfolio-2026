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
        'use-bg-as-text-color from-secondary to-tertiary glass:from-white glass:to-white w-fit scroll-m-20 bg-gradient-to-r text-2xl font-extrabold tracking-tight text-balance md:text-3xl',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
