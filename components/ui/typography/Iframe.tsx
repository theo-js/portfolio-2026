import { cn } from '@/lib/utils';
import type { FC, HTMLProps } from 'react';

export const Iframe: FC<HTMLProps<HTMLIFrameElement>> = (props) => (
  <iframe
    {...props}
    className={cn(
      'glass:border-white/20 rounded-lg border border-gray-300 dark:border-white/20',
      props.className,
    )}
  />
);
