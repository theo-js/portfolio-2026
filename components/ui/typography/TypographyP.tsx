import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyP: FC<PropsWithChildren<HTMLProps<HTMLParagraphElement>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props}>
      {children}
    </p>
  );
};
