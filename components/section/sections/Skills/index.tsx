import type { FC } from 'react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/reveal';
import { Skill } from './Skill';
import { skillCategories, jsStyles } from './constants';

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
              className="group glass:bg-white/20 glass:border-white/40 relative grid h-100 grid-rows-subgrid gap-6 overflow-hidden rounded-2xl border border-gray-300 bg-white/60 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              {/* Glow effect */}
              <div className="from-primary/5 to-secondary/5 dark:from-primary/5 dark:to-secondary/5 pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Category Title */}
              <h3 className="glass:text-white relative mb-2 text-2xl text-gray-900 dark:text-white">
                {t(category.titleTKey)}
              </h3>

              {/* Skills List */}
              <Reveal
                as="ul"
                style={jsStyles.cardSubgridStyles}
                className="grid!"
                childAs="li"
                animation="fadeIn"
                options={{ delay: 0.2 + categoryIndex * 0.2, stagger: 0.1 }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <Skill
                    key={skill.nameTKey}
                    {...skill}
                    progressDelay={0.8 + categoryIndex * 0.2 + skillIndex * 0.1}
                    shimmerDelay={1.2 + categoryIndex * 0.4 + skillIndex * 0.1}
                  />
                ))}
              </Reveal>

              {/* Corner accent */}
              <div className="from-primary/20 dark:from-primary/20 absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br to-transparent dark:to-transparent" />
            </div>
          </div>
        ))}
      </Reveal>

      {/* Additional Info */}
      <Reveal options={{ delay: 0.3 }} className="mx-auto mt-16 w-fit text-center">
        <div className="glass:bg-white/20 glass:border-white/40 inline-block rounded-2xl border border-gray-300 bg-white/20 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <p className="glass:text-white max-w-2xl leading-relaxed text-gray-800 dark:text-white/80">
            <span className="text-primary">Toujours en apprentissage</span> et passionné par les
            nouvelles technologies. Je reste à jour avec les dernières tendances du développement
            web et du design UX/UI.
          </p>
        </div>
      </Reveal>
    </BaseSection>
  );
};
