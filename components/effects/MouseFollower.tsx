'use client';

import { cn } from '@/lib/utils';
import {
  useRef,
  type FC,
  type HTMLAttributes,
  type PointerEvent,
  type PropsWithChildren,
} from 'react';

const DEFAULT_SIZE = 50;

interface MouseFollowerProps {
  disabled?: boolean;
  /** Size of the follower element in pixels */
  size?: number;
  className?: string;
  followerProps?: HTMLAttributes<HTMLDivElement>;
}

export const MouseFollower: FC<PropsWithChildren<MouseFollowerProps>> = ({
  className,
  disabled,
  followerProps,
  size = DEFAULT_SIZE,
  children,
}) => {
  const followerElementRef = useRef<HTMLDivElement>(null);
  const activationZoneRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    requestAnimationFrame(() => {
      const rect = activationZoneRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      followerElementRef.current?.style.setProperty('--x', `${x - size}px`);
      followerElementRef.current?.style.setProperty('--y', `${y - size}px`);
    });
  }

  return (
    <>
      {/* Activation zone */}
      <div
        className={cn('group relative', className)}
        style={{
          ...followerProps?.style,
          padding: `${size / 2}px`,
          margin: `-${size / 2}px`,
        }}
        onMouseMoveCapture={handlePointerMove}
        ref={activationZoneRef}
      >
        {/* Follower container (applies clipping) */}
        <div
          className="absolute overflow-hidden"
          style={{
            borderRadius: 'inherit',
            inset: `${size / 2}px`,
          }}
        >
          {/* Follower element */}
          <div
            {...followerProps}
            className={cn(
              'pointer-events-none absolute top-0 left-0 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-50',
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

        {children}
      </div>
    </>
  );
};
