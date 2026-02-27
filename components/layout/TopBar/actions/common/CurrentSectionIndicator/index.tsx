import { type CSSProperties, type FC, useEffect, useState } from 'react';
import type { UseGetCurrentSectionReturnValue } from '../use-get-current-section';
import { cn } from '@/lib/utils';

const INDICATOR_THICKNESS = 2;
const INDICATOR_OFFSET_BLOCK = 4;
const DEFAULT_POSITION_STYLES: CSSProperties = {
  width: 0,
  height: 0,
  transition: 'none',
};

interface CurrentSectionIndicatorProps {
  activeLink: UseGetCurrentSectionReturnValue['linkElement'] | undefined;
  isVertical?: boolean;
  isMobile: boolean;
}

export const CurrentSectionIndicator: FC<CurrentSectionIndicatorProps> = ({
  activeLink,
  isVertical,
  isMobile,
}) => {
  const [positionStyles, setPositionStyles] = useState<CSSProperties>(DEFAULT_POSITION_STYLES);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!activeLink) return setPositionStyles(DEFAULT_POSITION_STYLES);

      const { offsetLeft, offsetTop, clientWidth, clientHeight } = activeLink;
      const nextPositionStyles: CSSProperties = isVertical
        ? {
            width: `${INDICATOR_THICKNESS}px`,
            height: `${clientHeight}px`,
            top: `${offsetTop}px`,
            left: `${offsetLeft - INDICATOR_OFFSET_BLOCK}px`,
          }
        : {
            width: `${clientWidth}px`,
            height: `${INDICATOR_THICKNESS}px`,
            // TODO: find a better way to position the indicator
            top: isMobile ? `${offsetTop + clientHeight + INDICATOR_OFFSET_BLOCK}px` : '16px',
            left: isMobile ? `-${clientWidth / 2}px` : `${offsetLeft}px`,
          };

      setPositionStyles(nextPositionStyles);
    });
  }, [activeLink, isVertical, isMobile]);

  return (
    <div
      style={positionStyles}
      className={cn(
        'from-primary to-secondary absolute rounded bg-gradient-to-r transition-all duration-300',
        isMobile ? 'block md:hidden' : 'glass:from-white glass:to-white hidden md:block',
      )}
    />
  );
};
