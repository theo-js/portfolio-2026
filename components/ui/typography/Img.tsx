import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import type { FC } from 'react';

export const Img: FC<ImageProps> = (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text -- The alt text is passed via props, we just want to add some styling to the image
  <Image
    {...props}
    className={cn(
      'glass:border-white/20 rounded-lg border border-gray-300 dark:border-white/20',
      props.className,
    )}
  />
);
