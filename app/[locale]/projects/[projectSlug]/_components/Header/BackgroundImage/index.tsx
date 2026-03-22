'use client';

import { cn } from '@/lib/utils';
import type { FC } from 'react';
import styles from './index.module.scss';

interface BackgroundImageProps {
  projectBackgroundImageUrl: {
    mobile: string;
    desktop: string;
  };
}

export const ProjectBackgroundImage: FC<BackgroundImageProps> = ({ projectBackgroundImageUrl }) => {
  return (
    <div className="flex h-full justify-center">
      <div
        className={cn(
          'light:hidden glass:light:block glass:light:opacity-30 glass:dark:opacity-20 absolute top-0 bottom-0 -z-1 w-full max-w-7xl mask-x-from-95% mask-x-to-100% object-cover object-bottom md:mask-x-from-90% dark:opacity-10',
          'border-primary border-b',
          styles.backgroundImage,
        )}
        style={
          {
            '--mobile-bg-url': `url(${projectBackgroundImageUrl.mobile})`,
            '--desktop-bg-url': `url(${projectBackgroundImageUrl.desktop})`,
          } as React.CSSProperties
        }
      />
    </div>
  );
};
