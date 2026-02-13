'use client';

import { useSyncExternalStore } from 'react';

type ScrollCoordinates = { x: number; y: number };

let windowScrollCoordinates: ScrollCoordinates = { x: 0, y: 0 };
const SERVER_FALLBACK_SCROLL: ScrollCoordinates = { x: 0, y: 0 };

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function onScroll() {
  windowScrollCoordinates = { x: window.scrollX, y: window.scrollY };
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (listeners.size === 1) {
    window.addEventListener('scroll', onScroll);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', onScroll);
    }
  };
};

/**
 * Get the current scroll position.
 * It ensures that only one scroll event listener is added to the window,
 * and all components using this hook will be updated when the scroll position changes.
 */
export function useWindowScroll() {
  return {
    windowScroll: useSyncExternalStore(
      subscribe,
      () => windowScrollCoordinates,
      () => SERVER_FALLBACK_SCROLL,
    ),
  };
}
