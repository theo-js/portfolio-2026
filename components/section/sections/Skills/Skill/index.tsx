import type { FC } from 'react';
import { ProgressBar } from './Progress';
import { getTranslations } from 'next-intl/server';
import { Percentage } from './Percentage';

interface SkillProps {
  nameTKey: string;
  color: string;
  level: number;
  progressDelay: number;
  shimmerDelay: number;
}
export const Skill: FC<SkillProps> = async ({
  nameTKey,
  color,
  level,
  progressDelay,
  shimmerDelay,
}) => {
  const t = await getTranslations('sections.skills');
  return (
    <div>
      {/* Skill Name */}
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-gray-800 dark:text-white/80">{t(nameTKey)}</span>
        <Percentage level={level} delay={progressDelay} />
      </div>

      <ProgressBar
        bgColorClassName={color}
        level={level}
        progressDelay={progressDelay}
        shimmerDelay={shimmerDelay}
      />
    </div>
  );
};
