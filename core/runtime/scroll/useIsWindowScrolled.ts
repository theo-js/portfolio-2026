'use client';

import { useLayoutEffect, useSyncExternalStore } from 'react';

let isScrolled = false;
const SERVER_FALLBACK_IS_SCROLLED = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function onIsScrolledChange() {
  isScrolled = window.scrollY > 0;
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (listeners.size === 1) {
    window.addEventListener('scroll', onIsScrolledChange);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', onIsScrolledChange);
    }
  };
};

/**
 * Get whether the window is scrolled.
 * It ensures that only one scroll event listener is added to the window
 */
export function useIsWindowScrolled() {
  useLayoutEffect(() => {
    isScrolled = window.scrollY > 0;
    emit(); // Emit an initial update to ensure that all subscribers have the correct scroll position on mount
  }, []);

  return {
    isWindowScrolled: useSyncExternalStore(
      subscribe,
      () => isScrolled,
      () => SERVER_FALLBACK_IS_SCROLLED,
    ),
  };
}
