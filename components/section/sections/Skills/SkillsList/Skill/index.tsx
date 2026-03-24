'use client';

import type { ForwardRefRenderFunction, ReactNode } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { CircleQuestionMarkIcon } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTitle, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@/components/ui/link';
import { SectionId } from '@/components/section/SectionId.enum';
import { getCurrentlyVisibleThemeSelectorTriggerElement } from '@/components/layout/TopBar/actions/common/ThemeSelector/helpers';
import type { ProgressBarHandle } from './Progress';
import { ProgressBar } from './Progress';
import { Percentage } from './Percentage';

export interface SkillHandle {
  animate: () => void;
}

interface SkillProps {
  iconSvgContents?: string;
  nameTKey: string;
  descriptionTKey: string;
  color: string;
  level: number;
  progressDelay: number;
  shimmerDelay: number;
}

const SkillRenderFunction: ForwardRefRenderFunction<SkillHandle, SkillProps> = (
  { iconSvgContents, nameTKey, descriptionTKey, color, level, progressDelay, shimmerDelay },
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
            <span className="glass:text-white inline-flex items-center gap-2 text-gray-800 dark:text-white">
              {iconSvgContents && (
                <span
                  // The icon SVG is sanitized before being rendered to prevent XSS attacks, as we do not want to trust the simple-icons package blindly
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(iconSvgContents) }}
                  className="inline-block h-5 w-5 flex-shrink-0 fill-current align-baseline"
                />
              )}

              <span aria-description={t.raw(descriptionTKey)}>
                {t(nameTKey)}
                <CircleQuestionMarkIcon className="ml-1 hidden h-[.75em] w-[.75em] align-baseline opacity-75 md:inline" />
              </span>
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
        <TooltipTitle className="flex items-center gap-1">
          {iconSvgContents && (
            <span
              // The icon SVG is sanitized before being rendered to prevent XSS attacks, as we do not want to trust the simple-icons package blindly
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(iconSvgContents) }}
              className="fill-primary inline-block h-5 w-5 flex-shrink-0 align-baseline"
            />
          )}
          {t(nameTKey)}
        </TooltipTitle>

        <p className="text-sm">
          {t.rich(descriptionTKey, {
            themesMenuTrigger: ThemesMenuTrigger,
          })}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

const ThemesMenuTrigger = (chunks: ReactNode): ReactNode => {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();

    getCurrentlyVisibleThemeSelectorTriggerElement()?.click();
  }

  return (
    <Link
      href={{
        pathname: '/',
        hash: SectionId.Skills,
      }}
      onClick={handleClick}
    >
      {chunks}
    </Link>
  );
};

export const Skill = forwardRef(SkillRenderFunction);
