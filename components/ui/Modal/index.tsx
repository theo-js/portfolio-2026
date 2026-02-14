import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useKeyPressEvent } from 'react-use';
import { useIsHydrated } from 'radix-ui/internal';
import styles from './index.module.scss';

export type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  overlayClassName?: string;
  contentClassName?: string;
};

export const ModalOverlay: FC<PropsWithChildren<ModalOverlayProps>> = ({
  isOpen,
  onClose,
  overlayClassName,
  contentClassName,
  children,
}) => {
  const isHydrated = useIsHydrated();
  const [visible, setVisible] = useState(isOpen);

  // Close on Escape key
  useKeyPressEvent('Escape', () => isOpen && onClose());

  // Prevent background scroll
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Handle mounting/unmounting with animation
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    requestAnimationFrame(() => {
      if (isOpen)
        setVisible(true); // mount immediately
      else {
        // animate out before unmount
        timeout = setTimeout(() => setVisible(false), 1000);
      }
    });
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isHydrated || !visible) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-40 flex items-center justify-center',
        'bg-background/50 backdrop-blur-xl',
        'transition-opacity duration-300 ease-in-out',
        isOpen ? styles.modalOverlayEnter : styles.modalOverlayExit,
        overlayClassName,
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'transition-transform duration-300 ease-in-out',
          isOpen ? styles.modalContentEnter : styles.modalContentExit,
          contentClassName,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
