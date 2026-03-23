import { cn } from '@/lib/utils';
import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyInlineCode: FC<PropsWithChildren<HTMLProps<HTMLElement>>> = (props) => {
  return (
    <code
      {...props}
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        props.className,
      )}
    />
  );
};
