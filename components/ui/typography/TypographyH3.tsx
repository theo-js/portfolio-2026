import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyH3: FC<PropsWithChildren<HTMLProps<HTMLHeadingElement>>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn(
        'text-secondary glass:text-white -mb-3 scroll-m-20 text-2xl font-semibold tracking-tight [&:not(:first-child)]:mt-12',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
