'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, type FC } from 'react';
import styles from './index.module.scss';
import { useTheme } from 'next-themes';
import { useCustomVariantsContext } from '@/core/theming/CustomVariants/CustomVariantsContextProvider';

interface BackgroundImageProps {
  projectBackgroundImageUrl: {
    mobile: string;
    desktop: string;
  };
}

export const ProjectBackgroundImage: FC<BackgroundImageProps> = ({ projectBackgroundImageUrl }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const { isGlassmorphismEnabled } = useCustomVariantsContext();
  const isLightNotGlass = resolvedTheme === 'light' && !isGlassmorphismEnabled;

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    // Disable parallax effect on light theme without glassmorphism, as the bg image is hidden anyways
    if (isLightNotGlass) return window.removeEventListener('scroll', handleScroll);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLightNotGlass]);

  return (
    <div className="flex h-full justify-center">
      <div
        ref={backgroundRef}
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
