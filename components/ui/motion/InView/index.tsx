'use client';

import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { register, unregister } from './observer';

type InViewProps = {
  onEnter: (el: HTMLElement) => void;
  onLeave?: (el: HTMLElement) => void;
  once?: boolean;
  style?: CSSProperties;
};

export const InView: FC<PropsWithChildren<InViewProps>> = ({
  children,
  onEnter,
  onLeave,
  once = true,
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    register(element, {
      once,
      callbacks: {
        onEnter: () => onEnter(element),
        onLeave: onLeave ? () => onLeave(element) : undefined,
      },
    });

    return () => unregister(element);
  }, [once, onEnter, onLeave]);

  return <div {...{ ref, style }}>{children}</div>;
};
