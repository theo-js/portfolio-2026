import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { MouseFollower } from '@/components/effects/MouseFollower';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { features } from './constants';
import { Reveal } from '@/components/effects/reveal';

export const AboutSection: FC = async () => {
  const t = await getTranslations('sections.about');

  return (
    <BaseSection id={SectionId.About}>
      <div className="grid gap-x-12 gap-y-6 lg:grid-cols-2">
        {/* Text Content */}
        <Reveal animation="slideLeft" className="space-y-6">
          <div className="glass:bg-white/20 glass:light:backdrop-blur-4xl glass:border-white/60 relative rounded-2xl border border-gray-200 bg-white p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            {/* Neon glow */}
            <div className="from-primary/0 to-secondary/0 dark:from-primary/10 dark:to-secondary/10 glass:hidden absolute inset-0 rounded-2xl bg-gradient-to-r blur-xl" />

            <div className="relative z-10">
              <p
                className="glass:text-white mb-4 leading-relaxed text-gray-700 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: t('text1'),
                }}
              ></p>

              <p className="glass:text-white mb-4 leading-relaxed text-gray-600 dark:text-white">
                {t.rich('text2', {
                  primary: (chunks) => (
                    <span className="text-primary glass:dark:brightness-150 glass:light:text-white">
                      {chunks}
                    </span>
                  ),
                  secondary: (chunks) => (
                    <span className="text-secondary glass:light:text-white dark:brightness-150">
                      {chunks}
                    </span>
                  ),
                  br: () => <br />,
                })}
              </p>

              <p
                className="glass:text-white leading-relaxed text-gray-600 dark:text-white/60"
                dangerouslySetInnerHTML={{
                  __html: t('text3'),
                }}
              ></p>
            </div>
          </div>

          {/* Stats */}
          <Reveal
            animation="fadeUp"
            options={{ delay: 0.2 }}
            className="grid! grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {[
              { label: t('stats.major-products'), value: '6' },
              { label: t('stats.critical-legacy'), value: '1' },
              {
                label: t('stats.experience'),
                value: `4+${t('stats.years')}`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass:bg-white/20 glass:light:backdrop-blur-4xl glass:border-white/60 grid gap-1 rounded-xl border border-gray-200 bg-white p-4 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="glass:text-white from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
                  {stat.value}
                </div>
                <div className="glass:text-white text-sm text-gray-600 dark:text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </Reveal>
        </Reveal>

        {/* Features Grid */}
        <Reveal
          options={{ delay: 0.4 }}
          as="ul"
          childAs="li"
          className="grid! gap-4 sm:grid-cols-2"
        >
          {features.map((feature) => (
            <MouseFollower
              className="grid rounded-2xl"
              size={150}
              followerContainerProps={{
                className: 'light:z-1 opacity-15 dark:opacity-30',
              }}
              followerProps={{
                className: cn(
                  'bg-gradient-to-br blur-3xl glass:light:bg-none glass:light:bg-white',
                  feature.color,
                ),
              }}
              key={feature.titleTkey}
            >
              <div className="glass:bg-white/20 glass:light:backdrop-blur-4xl glass:border-white/60 group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                {/* Animated gradient background */}
                <div
                  className={cn(
                    'glass:light:from-white/40 glass:light:to-white absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10',
                    feature.color,
                  )}
                />

                <div className="mb-2 flex items-center gap-4 sm:flex-col sm:items-start">
                  <div
                    className={cn(
                      'relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br',
                      feature.color,
                    )}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="glass:text-white relative text-lg text-gray-900 dark:text-white">
                    {t(feature.titleTkey)}
                  </h3>
                </div>

                <p className="glass:text-white relative text-sm leading-relaxed text-gray-600 dark:text-white/60">
                  {t(feature.descriptionTKey)}
                </p>

                {/* Glow effect */}
                <div
                  className={cn(
                    'glass:light:from-white/40 glass:light:to-white/40 absolute -right-10 -bottom-10 h-20 w-20 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-50',
                    feature.color,
                  )}
                />
              </div>
            </MouseFollower>
          ))}
        </Reveal>
      </div>
    </BaseSection>
  );
};
