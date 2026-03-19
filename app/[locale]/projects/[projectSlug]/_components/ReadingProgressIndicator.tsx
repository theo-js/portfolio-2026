'use client';

import { useRef, type FC } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

interface ReadingProgressIndicatorProps {
  /**
   * We use an id instead of a ref because that would require
   * making the whole article a client component
   */
  articleContentId: string;
}

export const ReadingProgressIndicator: FC<ReadingProgressIndicatorProps> = ({
  articleContentId,
}) => {
  const progressIndicatorRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const progressIndicatorElement = progressIndicatorRef.current;
    const articleContentElement = document.getElementById(articleContentId);
    if (!articleContentElement || !progressIndicatorElement) return;

    const updateProgress = () => {
      const { scrollTop, clientHeight } = document.documentElement;
      const articleRect = articleContentElement.getBoundingClientRect();
      const articleTop = articleRect.top + scrollTop;
      const articleBottom = articleTop + articleRect.height;
      const progress = Math.min(
        Math.max((scrollTop + clientHeight - articleTop) / (articleBottom - articleTop), 0),
        1,
      );

      progressIndicatorElement.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
    };

    progressIndicatorElement.style.opacity = '1';
    updateProgress();

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [articleContentId]);

  return (
    <div
      ref={progressIndicatorRef}
      className="from-primary via-secondary to-tertiary glass:light:bg-none glass:light:bg-white sticky top-[65px] z-99 h-0.25 w-full bg-gradient-to-r opacity-0 transition-opacity duration-300"
    />
  );
};
