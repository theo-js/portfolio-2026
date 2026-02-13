import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyUl: FC<PropsWithChildren<HTMLProps<HTMLUListElement>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  );
};
