import type { FC, HTMLProps } from 'react';
import type { ProjectTag } from './types';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type ProjectTagBadgeProps = HTMLProps<HTMLSpanElement> & {
  projectTag: ProjectTag;
};

export const ProjectTagBadge: FC<ProjectTagBadgeProps> = async ({
  projectTag,
  className,
  ...props
}) => {
  const t = await getTranslations('sections.projects');

  return (
    <Tooltip>
      <TooltipTrigger asChild className={cn(projectTag.descriptionTKey && 'cursor-help')}>
        <span
          className={cn(
            'glass:text-white glass:border-white/40 rounded-full border border-gray-300 bg-white/10 px-3 py-1 text-xs text-gray-700 dark:border-white/20 dark:bg-white/10 dark:text-white/70',
            className,
          )}
          {...props}
        >
          {t(projectTag.titleTKey)}
        </span>
      </TooltipTrigger>

      {projectTag.descriptionTKey && (
        <TooltipContent className="max-w-60">{t(projectTag.descriptionTKey)}</TooltipContent>
      )}
    </Tooltip>
  );
};
