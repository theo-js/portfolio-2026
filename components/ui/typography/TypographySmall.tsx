import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographySmall: FC<PropsWithChildren<HTMLProps<HTMLElement>>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <small className={cn('text-sm leading-none font-medium', className)} {...props}>
      {children}
    </small>
  );
};
