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
  <h2 className="from-primary via-secondary to-tertiary glass:text-white relative mb-12 bg-gradient-to-r bg-clip-text py-4 text-center text-5xl text-transparent md:text-6xl md:tracking-tight">
    {children}
    {questionMark && (
      <Tooltip>
        <TooltipTrigger className="absolute bottom-[.66em]" asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-primary rounded-full text-2xl font-bold"
          >
            ?
          </Button>
        </TooltipTrigger>

        <TooltipContent className="max-w-75">{questionMark}</TooltipContent>
      </Tooltip>
    )}
  </h2>
);
