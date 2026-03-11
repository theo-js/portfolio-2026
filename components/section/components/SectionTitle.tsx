import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { ReactNode } from 'react';

interface SectionTitleProps {
  questionMark?: ReactNode;
}

export const SectionTitle: React.FC<React.PropsWithChildren<SectionTitleProps>> = ({
  questionMark,
  children,
}) => (
  <h2 className="from-primary via-secondary to-tertiary glass:text-white relative mx-auto mb-12 w-fit bg-gradient-to-r bg-clip-text py-4 text-center text-5xl text-transparent md:text-6xl md:tracking-tight">
    {children}
    {questionMark && (
      <div className="absolute -right-10 bottom-[.66em]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-primary hidden rounded-full text-3xl font-bold md:flex"
            >
              ?
            </Button>
          </TooltipTrigger>

          <TooltipContent className="hidden max-w-75 md:block">{questionMark}</TooltipContent>
        </Tooltip>
      </div>
    )}
  </h2>
);
