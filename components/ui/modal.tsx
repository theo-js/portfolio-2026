'use client';

import { cn } from '@/lib/utils';
import { useIsHydrated } from 'radix-ui/internal';
import { useEffect, type FC } from 'react';
import { createPortal } from 'react-dom';
import { useKeyPressEvent } from 'react-use';

export type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({
  isOpen,
  onClose,
  contentClassName,
  overlayClassName,
  children,
}) => {
  const isHydrated = useIsHydrated();

  useKeyPressEvent('Escape', () => isOpen && onClose());

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isHydrated || !isOpen) return null;
  return createPortal(
    <>
      {/* Global overlay */}
      <div
        className={cn(
          'bg-background/50 fixed inset-0 z-40 flex items-center justify-center backdrop-blur-xl',
          overlayClassName,
        )}
        onClick={onClose}
      >
        {/* Modal content */}
        <div onClick={(e) => e.stopPropagation()} className={contentClassName}>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};
