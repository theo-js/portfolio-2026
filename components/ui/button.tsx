import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';
import styles from './button.module.scss';

const buttonVariants = cva(
  cn(
    "overflow-hidden relative cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-102 active:scale-98 active:duration-75",
    styles.buttonWithBackground,
  ),
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-primary-cta to-secondary-cta text-primary-foreground hover:bg-primary/90 before:bg-black/20 active:before:bg-black/30',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 before:bg-black/20',
        outline:
          'border bg-background shadow-xs before:bg-accent active:before:bg-black/10 hover:text-accent-foreground dark:bg-white/5 dark:border-input dark:before:bg-input/20 dark:active:before:bg-input/40 glass:bg-white/20 glass:border-white/40 glass:text-white glass:before:bg-white/20 glass:active:before:bg-white/30',
        secondary:
          'bg-gradient-to-r from-secondary-cta to-tertiary-cta text-secondary-foreground hover:bg-secondary/80 before:bg-black/20 active:before:bg-black/30',
        ghost:
          'glass:text-white glass:hover:bg-accent/20 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        xl: 'h-12 text-md rounded-md px-8 has-[>svg]:px-6',
        '2xl': 'h-14 text-md rounded-md px-8 has-[>svg]:px-6',
        icon: 'size-9 hover:scale-110',
        'icon-xs': "size-6 hover:scale-110 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8 hover:scale-110',
        'icon-lg': 'size-10 hover:scale-110',
        'icon-xl': 'size-12 hover:scale-110',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  rounded = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    rounded?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }), {
        'rounded-full': rounded,
      })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
