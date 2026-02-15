'use client';

import type { FC, PropsWithChildren } from 'react';
import { InView } from '../InView';
import { type AnimationName, animations } from './animations';

type RevealProps = {
  animation?: AnimationName;
  once?: boolean;
  options?: GSAPTweenVars;
};

export const Reveal: FC<PropsWithChildren<RevealProps>> = ({
  children,
  animation: animationName = 'fadeUp',
  once = true,
}) => {
  const animation = animations[animationName];
  return (
    <InView
      once={once}
      style={animation.fromStyles}
      onLeave={(element) => animation.onLeave?.(element)}
      onEnter={(element) => animation.onEnter(element)}
    >
      {children}
    </InView>
  );
};
