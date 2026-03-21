'use client';

import { Button } from '@/components/ui/button';
import { useIsWindowScrolled } from '@/core/runtime/scroll/useIsWindowScrolled';
import { ArrowUpIcon } from 'lucide-react';
import type { FC } from 'react';

export const ScrollToTopButton: FC = () => {
  const { isWindowScrolled } = useIsWindowScrolled();
  if (!isWindowScrolled) return null;

  return (
    <Button
      onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
      className="group fixed right-6 bottom-5 size-16 rounded-full opacity-100 backdrop-blur-xl transition-discrete duration-300 starting:opacity-0"
      variant="outline"
    >
      <ArrowUpIcon className="size-6 group-hover:animate-bounce group-focus:animate-bounce" />
    </Button>
  );
};
