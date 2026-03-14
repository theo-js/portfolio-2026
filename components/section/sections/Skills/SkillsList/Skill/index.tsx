'use client';

import { forwardRef, useImperativeHandle, useRef, type ForwardRefRenderFunction } from 'react';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTitle, TooltipTrigger } from '@/components/ui/tooltip';
import type { ProgressBarHandle } from './Progress';
import { ProgressBar } from './Progress';
import { Percentage } from './Percentage';
import { CircleQuestionMarkIcon } from 'lucide-react';

export interface SkillHandle {
  animate: () => void;
}

interface SkillProps {
  nameTKey: string;
  descriptionTKey: string;
  color: string;
  level: number;
  progressDelay: number;
  shimmerDelay: number;
}

const SkillRenderFunction: ForwardRefRenderFunction<SkillHandle, SkillProps> = (
  { nameTKey, descriptionTKey, color, level, progressDelay, shimmerDelay },
  forwardedRef,
) => {
  const t = useTranslations('sections.skills');
  const percentageHandle = useRef<ProgressBarHandle>(null);
  const progressBarHandle = useRef<ProgressBarHandle>(null);

  useImperativeHandle(forwardedRef, () => ({
    animate: () => {
      percentageHandle.current?.animate();
      progressBarHandle.current?.animate();
    },
  }));

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-help">
          {/* Skill Name */}
          <div className="mb-2 flex items-end justify-between gap-4">
            <span className="glass:text-white text-gray-800 dark:text-white">
              {t(nameTKey)}
              <CircleQuestionMarkIcon className="ml-1 inline h-[.75em] w-[.75em] align-baseline opacity-75" />
            </span>

            <Percentage ref={percentageHandle} level={level} delay={progressDelay} />
          </div>

          <ProgressBar
            ref={progressBarHandle}
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

export const Skill = forwardRef(SkillRenderFunction);
