import type { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import { Tooltip, TooltipContent, TooltipTitle, TooltipTrigger } from '@/components/ui/tooltip';
import { ProgressBar } from './Progress';
import { Percentage } from './Percentage';
import { CircleQuestionMarkIcon } from 'lucide-react';

interface SkillProps {
  nameTKey: string;
  descriptionTKey: string;
  color: string;
  level: number;
  progressDelay: number;
  shimmerDelay: number;
}
export const Skill: FC<SkillProps> = async ({
  nameTKey,
  descriptionTKey,
  color,
  level,
  progressDelay,
  shimmerDelay,
}) => {
  const t = await getTranslations('sections.skills');
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-help">
          {/* Skill Name */}
          <div className="mb-2 flex items-end justify-between gap-4">
            <span className="text-gray-800 dark:text-white/80">
              {t(nameTKey)}
              <CircleQuestionMarkIcon className="ml-1 inline h-[.75em] w-[.75em] align-baseline opacity-75" />
            </span>

            <Percentage level={level} delay={progressDelay} />
          </div>

          <ProgressBar
            bgColorClassName={color}
            level={level}
            progressDelay={progressDelay}
            shimmerDelay={shimmerDelay}
          />
        </div>
      </TooltipTrigger>

      <TooltipContent className="flex max-w-sm flex-col gap-2">
        <TooltipTitle>{t(nameTKey)}</TooltipTitle>

        <p className="text-sm">{t(descriptionTKey)}</p>
      </TooltipContent>
    </Tooltip>
  );
};
