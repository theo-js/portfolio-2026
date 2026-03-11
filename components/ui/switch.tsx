'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Switch({
  className,
  size = 'default',
  thumbIcon,
  isToggle,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default' | 'lg';
  thumbIcon?: React.ReactNode;
  isToggle?: boolean;
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'group peer focus-visible:border-ring focus-visible:ring-ring/50 group/switch inline-flex shrink-0 cursor-pointer items-center rounded-full shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=lg]:h-6 data-[size=lg]:w-12 data-[size=sm]:h-3.5 data-[size=sm]:w-6',
        'dark:border-input border',
        'data-[state=unchecked]:bg dark:data-[state=unchecked]:bg-input/30 dark:data-[state=unchecked]:border-input dark:hover:data-[state=unchecked]:bg-input/50',
        isToggle ? 'hover:data-[state=checked]:bg-accent!' : 'data-[state=checked]:bg-primary',
        isToggle && 'hover:bg-foreground/3 focus:bg-foreground/3',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background pointer-events-none block flex items-center justify-center rounded-full ring-0 transition-all duration-200 group-hover:scale-[1.1] group-focus:scale-[1.1] group-data-[size=default]/switch:size-4 group-data-[size=lg]/switch:size-6 group-data-[size=sm]/switch:size-3',
          'dark:data-[state=unchecked]:bg-foreground data-[state=unchecked]:translate-x-0',
          'dark:data-[state=checked]:bg-primary-foreground data-[state=checked]:translate-x-[calc(100%-2px)]',
          isToggle &&
            'from-primary-cta to-secondary-cta glass:bg-none glass:bg-white/40! glass:text-primary glass:dark:text-white glass:group-hover:bg-white/50! glass:group-focus:bg-white/50! glass:group-active:bg-white/60! glass:group-active:duration-0 bg-gradient-to-r text-white group-active:scale-[0.9]',
        )}
      >
        {thumbIcon}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
