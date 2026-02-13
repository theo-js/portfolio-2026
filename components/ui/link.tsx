import { cva, type VariantProps } from 'class-variance-authority';
import { Link as NextIntlLink } from '@/lib/next-intl';

import { cn } from '@/lib/utils';

const linkVariants = cva('cursor-pointer text-foreground/80 hover:text-foreground font-medium', {
  variants: {
    variant: {
      sm: 'text-sm',
      default: 'text-base',
    },
    size: {},
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
});

function Link({
  variant,
  size,
  className,
  ...props
}: Parameters<typeof NextIntlLink>[0] & VariantProps<typeof linkVariants>) {
  return (
    <NextIntlLink
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(linkVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Link, linkVariants };
