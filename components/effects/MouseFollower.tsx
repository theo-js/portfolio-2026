'use client';

import {
  useEffect,
  useRef,
  type FC,
  type HTMLAttributes,
  type PointerEvent,
  type PropsWithChildren,
} from 'react';
import { cn } from '@/lib/utils';
import { InView } from '@theo-js/react-gsap-reveal';

const DEFAULT_SIZE = 50;

interface MouseFollowerProps {
  disabled?: boolean;
  disabledOnMobile?: boolean;
  /** Size of the follower element in pixels */
  size?: number;
  className?: string;
  followerContainerProps?: HTMLAttributes<HTMLDivElement>;
  followerProps?: HTMLAttributes<HTMLDivElement>;
}

export const MouseFollower: FC<PropsWithChildren<MouseFollowerProps>> = ({
  className,
  disabled,
  disabledOnMobile = true,
  followerContainerProps,
  followerProps,
  size = DEFAULT_SIZE,
  children,
}) => {
  const followerContainerRef = useRef<HTMLDivElement>(null);
  const followerElementRef = useRef<HTMLDivElement>(null);

  const handlePointerMove: EventListener = (e) => {
    const pointerEvent = e as unknown as PointerEvent;
    requestAnimationFrame(() => {
      if (!followerContainerRef.current || !followerElementRef.current) return;

      const rect = followerContainerRef.current.getBoundingClientRect();
      const x = pointerEvent.clientX - rect.left;
      const y = pointerEvent.clientY - rect.top;
      followerElementRef.current?.style.setProperty('opacity', '1');
      followerElementRef.current?.style.setProperty('--x', `${x - size / 2}px`);
      followerElementRef.current?.style.setProperty('--y', `${y - size / 2}px`);
    });
  };

  function attachListeners(): void {
    if (disabled) return;
    if (disabledOnMobile && matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('pointermove', handlePointerMove);
  }

  function detachListeners(): void {
    window.removeEventListener('pointermove', handlePointerMove);
    followerElementRef.current?.style.setProperty('opacity', '0');
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      detachListeners();
    };
  }, []);

  return (
    <InView
      repeat
      onEnter={attachListeners}
      onLeave={detachListeners}
      className={cn('relative', className)}
    >
      {/* Follower container */}
      <div
        {...followerContainerProps}
        ref={followerContainerRef}
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]',
          followerContainerProps?.className,
        )}
      >
        {/* Follower element */}
        <div
          {...followerProps}
          className={cn(
            'absolute top-0 left-0 rounded-full bg-white opacity-0 transition-opacity duration-300',
            followerProps?.className,
          )}
          style={{
            ...followerProps?.style,
            height: `${size}px`,
            width: `${size}px`,
            transform: `translate(var(--x, 0), var(--y, 0))`,
          }}
          ref={followerElementRef}
        />
      </div>

      <div className="grid h-full">{children}</div>
    </InView>
  );
};
