'use client';

import { useLayoutEffect, useSyncExternalStore } from 'react';

let hasReachedBottomOfThePage = false;
const SERVER_FALLBACK_HAS_REACHED_BOTTOM = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function onHasReachedBottomChange() {
  hasReachedBottomOfThePage =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (listeners.size === 1) {
    window.addEventListener('scroll', onHasReachedBottomChange);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', onHasReachedBottomChange);
    }
  };
};

/**
 * Get whether the window has reached the bottom.
 * It ensures that only one scroll event listener is added to the window
 */
export function useHasReachedBottomOfWindow() {
  useLayoutEffect(() => {
    hasReachedBottomOfThePage =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
    emit(); // Emit an initial update to ensure that all subscribers have the correct scroll position on mount
  }, []);

  return {
    hasReachedBottomOfWindow: useSyncExternalStore(
      subscribe,
      () => hasReachedBottomOfThePage,
      () => SERVER_FALLBACK_HAS_REACHED_BOTTOM,
    ),
  };
}
