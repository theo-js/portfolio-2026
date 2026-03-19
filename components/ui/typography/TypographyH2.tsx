import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyH2: FC<PropsWithChildren<HTMLProps<HTMLHeadingElement>>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2
      className={cn(
        'glass:light:border-white/20 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight md:text-3xl [&:not(:first-child)]:mt-12',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
