'use client';

import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  const updateOffsets = () => {
    if (!rootRef.current) return;

    const rootRect = rootRef.current.getBoundingClientRect();
    const rootCenter = rootRect.left + rootRect.width / 2;
    const halfWidth = rootRect.width / 2;

    rootRef.current.querySelectorAll('[data-slot="carousel-item"]').forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;

      const offset = (slideCenter - rootCenter) / halfWidth;

      // clamp pour rester dans [-1, 1]
      const clamped = Math.max(-1, Math.min(1, offset));

      requestAnimationFrame(() =>
        (slide as HTMLDivElement).style.setProperty('--offset-center', clamped.toString()),
      );
    });
  };

  React.useEffect(() => {
    if (!api) return;

    api.on('scroll', updateOffsets);
    api.on('reInit', updateOffsets);
    api.on('select', updateOffsets);

    updateOffsets();

    return () => {
      api.off('scroll', updateOffsets);
      api.off('reInit', updateOffsets);
      api.off('select', updateOffsets);
    };
  }, [api]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={rootRef}
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn(
          'flex cursor-grab active:cursor-grabbing',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({
  className,
  children,
  innerSlideClassName,
  ...props
}: React.ComponentProps<'div'> & { innerSlideClassName?: string }) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full perspective-[1000px]',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'grid',
          'transform-[perspective(1000px)_rotateY(calc(var(--offset-center)_*_20deg))_scale(calc(1_-_abs(var(--offset-center)_*_0.333)))] opacity-[calc(1_-_pow(abs(var(--offset-center)),_2))]',
          'md:transform-[perspective(1000px)_rotateY(calc(var(--offset-center)_*_30deg))_scale(calc(1_-_abs(var(--offset-center)_*_0.333)))] md:opacity-[calc(1_-_pow(abs(var(--offset-center)),_2))]',
          'lg:transform-[perspective(1000px)_rotateY(calc(var(--offset-center)_*_30deg))_scale(calc(1_-_abs(var(--offset-center)_*_0.333)))] lg:opacity-[calc(1_-_pow(abs(var(--offset-center)),_2))]',
          'xl:transform-[perspective(1000px)_rotateY(calc(var(--offset-center)_*_30deg))_scale(calc(1_-_abs(var(--offset-center)_*_0.333)))] xl:opacity-[calc(1_-_pow(abs(var(--offset-center)),_2))]',
          innerSlideClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function CarouselIndicator({
  slidesLength,
  className,
  ...props
}: React.ComponentProps<'button'> & { slidesLength: number }) {
  const { api } = useCarousel();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = (api: CarouselApi) => {
      const selectedScrollSnap = api?.selectedScrollSnap();
      if (typeof selectedScrollSnap === 'number') setCurrentIndex(selectedScrollSnap);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <nav className={cn('flex gap-2', className)} aria-label="Carousel indicators" {...props}>
      {[...new Array(slidesLength)].map((_, i) => {
        const isActive = currentIndex === i;
        return (
          <Button
            key={i}
            type="button"
            variant="outline"
            size="icon-sm"
            data-slot="carousel-indicator"
            className={cn(
              'size-4 rounded-full',
              isActive &&
                'bg-primary-cta! glass:border-primary-cta glass:before:bg-primary! before:bg-black/20!',
              className,
            )}
            onClick={() => {
              setCurrentIndex(i);
              api?.scrollTo(i);
            }}
            {...props}
          />
        );
      })}
    </nav>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicator,
};
