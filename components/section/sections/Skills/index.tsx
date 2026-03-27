import type { FC } from 'react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/effects/reveal';
import { skillCategories, jsStyles } from './constants';
import { SkillsList } from './SkillsList';

export const SkillsSection: FC = async () => {
  const t = await getTranslations('sections.skills');

  return (
    <BaseSection id={SectionId.Skills}>
      {/* Skills Grid */}
      <Reveal
        as="ul"
        className="grid! gap-8 md:grid-cols-2 lg:grid-cols-3"
        style={jsStyles.cardsListGridStyles}
        childAs="li"
        childProps={{ style: jsStyles.cardSubgridStyles }}
      >
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.titleTKey}
            className="relative h-100"
            style={jsStyles.cardSubgridStyles}
          >
            {/* Category Card */}
            <div
              style={jsStyles.cardSubgridStyles}
              className="group glass:bg-white/20 glass:border-white/40 glass:light:backdrop-blur-4xl relative grid h-100 grid-rows-subgrid gap-6 overflow-hidden rounded-2xl border border-gray-300 bg-white/60 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              {/* Glow effect */}
              <div className="from-primary/5 to-secondary/5 dark:from-primary/5 dark:to-secondary/5 pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Category Title */}
              <h3 className="glass:text-white relative mb-2 text-2xl text-gray-900 dark:text-white">
                {t(category.titleTKey)}
              </h3>

              {/* Skills List */}
              <SkillsList skills={category.skills} categoryIndex={categoryIndex} />

              {/* Corner accent */}
              <div className="from-primary/20 dark:from-primary/20 glass:from-white/20 absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br to-transparent dark:to-transparent" />
            </div>
          </div>
        ))}
      </Reveal>

      {/* Additional Info */}
      <Reveal options={{ delay: 0.3 }} className="mx-auto mt-16 w-fit text-center">
        <div className="glass:bg-white/20 glass:light:backdrop-blur-4xl glass:border-white/40 inline-block rounded-2xl border border-gray-300 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <p className="glass:text-white max-w-xl leading-relaxed text-gray-800 dark:text-white/80">
            {t.rich('additional-info', {
              primary: (chunks) => (
                <span className="text-primary glass:dark:brightness-150 glass:light:text-white">
                  {chunks}
                </span>
              ),
              secondary: (chunks) => (
                <span className="text-secondary glass:dark:brightness-150 glass:light:text-white">
                  {chunks}
                </span>
              ),
            })}
          </p>
        </div>
      </Reveal>
    </BaseSection>
  );
};
