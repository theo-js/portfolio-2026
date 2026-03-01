import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';
import styles from './button.module.scss';

const disableButtonWithBgClass =
  'glass:bg-none glass:bg-white/20 glass:backdrop-blur-sm glass:hover:bg-transparent glass:before:bg-transparent glass:before:rounded-[inherit] glass:before:transform-none! glass:after:content[""] glass:after:absolute glass:after:inset-[-1rem] glass:after:w-[calc(50%+1rem)] glass:after:bg-white/1 glass:after:skew-x-[-45deg] glass:after:duration-300 glass:hover:after:w-0 glass:after:backdrop-blur-sm glass:hover:bg-white/20 glass:hover:backdrop-filter-none glass:[&:hover+.glass-bg]:translate-y-0 glass:[&:hover+.glass-bg]:h-full glass:[&:hover+.glass-bg]:min-w-full glass:[&:hover+.glass-bg]:blur-sm glass:[&:hover+.glass-bg]:contrast-150 glass:[&:active+.glass-bg]:opacity-50 glass:[&:active+.glass-bg]:brightness-85 glass:[&:active+.glass-bg]:transition-none';

const buttonVariants = cva(
  cn(
    "overflow-hidden relative cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-102 active:scale-98 active:duration-75",
    styles.buttonWithBackground,
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-gradient-to-r from-primary-cta to-secondary-cta text-primary-foreground hover:bg-primary/90 before:bg-black/20 active:before:bg-black/30',
          disableButtonWithBgClass,
          'glass:after:from-primary-cta glass:after:to-secondary-cta',
        ),
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 before:bg-black/20',
        outline:
          'border bg-background shadow-xs before:bg-accent active:before:bg-black/10 hover:text-accent-foreground dark:bg-white/5 dark:border-input dark:before:bg-input/20 dark:active:before:bg-input/40 glass:bg-white/20 glass:border-white/40 glass:text-white glass:before:bg-white/20 glass:active:before:bg-white/30',
        secondary: cn(
          'bg-gradient-to-r from-secondary-cta to-tertiary-cta text-secondary-foreground hover:bg-secondary/80 before:bg-black/20 active:before:bg-black/30',
          disableButtonWithBgClass,
          'glass:after:from-secondary-cta glass:after:to-tertiary-cta',
        ),
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

const glassBgVariant = cva(
  'glass-bg hidden bg-gradient-to-r absolute h-[50%] min-w-0 aspect-2/1 inset-0 translate-y-[-33.3%] rounded-full mx-auto z-[-1] duration-300',
  {
    variants: {
      variant: {
        default: 'glass:block! from-primary-cta to-secondary-cta',
        destructive: '',
        secondary: 'glass:block! from-secondary-cta to-tertiary-cta',
        outline: '',
        ghost: '',
        link: '',
      },
    },
    defaultVariants: {
      variant: 'default',
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
    <span className="relative grid">
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }), {
          'rounded-full': rounded,
        })}
        {...props}
      />

      <span className={glassBgVariant({ variant })} />
    </span>
  );
}

export { Button, buttonVariants };
