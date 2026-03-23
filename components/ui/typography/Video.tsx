import { cn } from '@/lib/utils';
import type { FC, HTMLProps } from 'react';

export const Video: FC<HTMLProps<HTMLVideoElement>> = (props) => (
  <video
    {...props}
    className={cn(
      'glass:border-white/20 rounded-lg border border-gray-300 dark:border-white/20',
      props.className,
    )}
  />
);
