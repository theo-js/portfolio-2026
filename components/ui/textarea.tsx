import * as React from 'react';

import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  const { pending } = useFormStatus();
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'focus:border-primary! focus:ring-primary/20! aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full resize-none rounded-xl border border-gray-300 bg-white/10 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all outline-none focus:ring-2 focus:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder-white/40',
        className,
      )}
      disabled={pending}
      {...props}
    />
  );
}

export { Textarea };
