import { cn } from '@/lib/utils';
import type { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';

export const TypographyOl: FC<
  PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>>
> = ({ children, className, ...props }) => {
  return (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props}>
      {children}
    </ol>
  );
};
