import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyLegend: FC<PropsWithChildren<HTMLProps<HTMLLegendElement>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <legend className={cn('mt-3 leading-7 italic opacity-80', className)} {...props}>
      {children}
    </legend>
  );
};
