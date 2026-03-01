'use client';

import { Reveal } from '@/components/ui/reveal';
import type { FC, PropsWithChildren } from 'react';

/**
 * This client component is needed in order to dynamically set
 * flex-grow: 1 style to the description container,
 * since we cannot use function props in server components.
 */
export const RevealWithDescriptionGrow: FC<
  PropsWithChildren<{ delay: number; descriptionIndex: number }>
> = ({ delay, descriptionIndex, children }) => (
  <Reveal
    animation="fadeIn"
    className="flex! grow-1 flex-col p-6"
    options={{ delay }}
    childProps={(index) => (index === descriptionIndex ? { className: 'grow-1' } : {})}
  >
    {children}
  </Reveal>
);
