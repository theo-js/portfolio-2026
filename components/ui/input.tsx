import * as React from 'react';

import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const { pending } = useFormStatus();
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground focus:border-primary! focus:ring-primary/20! w-full rounded-xl border border-gray-300 bg-white/10 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:ring-2 focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder-white/40',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      disabled={pending}
      {...props}
    />
  );
}

export { Input };
