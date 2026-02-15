'use client';

import * as React from 'react';
import { InView } from '../InView';
import { animations } from './animations';
import type { RevealProps } from './types';

export const Reveal = <C extends React.ElementType>({
  children,
  animation: animationName = 'fadeUp',
  repeat,
  options,
  as,
  childAs,
  ...rest
}: RevealProps<C>) => {
  const animation = animations[animationName];

  // If animateChildren is true, we need to set the initial styles on each child element
  const wrappedChildren = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        const ChildComponent = childAs || 'span';
        return (
          <ChildComponent style={{ display: 'block', ...animation.fromStyles }}>
            {child}
          </ChildComponent>
        );
      }),
    [children, animation.fromStyles, childAs],
  );

  return (
    <InView
      as={as || 'span'}
      repeat={repeat}
      targetChildren
      onEnter={(elements) => animation.onEnter({ elements, options })}
      onLeave={(elements) => animation.onLeave?.({ elements })}
      {...rest}
    >
      {wrappedChildren}
    </InView>
  );
};
