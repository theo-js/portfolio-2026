import { type CSSProperties, type FC, useEffect, useState } from 'react';
import type { UseGetCurrentSectionReturnValue } from '../../use-get-current-section';

const INDICATOR_THICKNESS = 2;
const INDICATOR_OFFSET_BLOCK = 4;
const DEFAULT_POSITION_STYLES: CSSProperties = {
  width: 0,
  height: 0,
  transition: 'none',
};

interface CurrentSectionIndicatorProps {
  activeLink: UseGetCurrentSectionReturnValue['linkElement'] | undefined;
  isVertical: boolean;
}

export const CurrentSectionIndicator: FC<CurrentSectionIndicatorProps> = ({
  activeLink,
  isVertical,
}) => {
  const [positionStyles, setPositionStyles] = useState<CSSProperties>(DEFAULT_POSITION_STYLES);

  useEffect(() => {
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
          top: `${offsetTop + clientHeight + INDICATOR_OFFSET_BLOCK}px`,
          left: `${offsetLeft}px`,
        };

    setPositionStyles(nextPositionStyles);
  }, [activeLink, isVertical]);

  return (
    <div
      style={positionStyles}
      className="from-primary to-secondary absolute hidden rounded bg-gradient-to-r transition-all duration-300 md:block"
    />
  );
};
