import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyH4: FC<PropsWithChildren<HTMLProps<HTMLHeadingElement>>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h4>
  );
};
