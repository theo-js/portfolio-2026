import type { FC } from 'react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { getTranslations } from 'next-intl/server';
import { features } from './constants';
import { Reveal } from '@/components/ui/reveal';

export const AboutSection: FC = async () => {
  const t = await getTranslations('sections.about');

  return (
    <BaseSection id={SectionId.About}>
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Text Content */}
        <Reveal animation="slideLeft" className="space-y-6">
          <div className="relative rounded-2xl border border-gray-200 bg-white p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            {/* Neon glow */}
            <div className="from-primary/0 to-secondary/0 dark:from-primary/10 dark:to-secondary/10 absolute inset-0 rounded-2xl bg-gradient-to-r blur-xl" />

            <div className="relative z-10">
              <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-white/80">
                {t('text1')} <span className="text-primary">{t('text1b')}</span> {t('and')}{' '}
                <span className="text-secondary dark:brightness-150">{t('text1c')}</span>{' '}
                {t('text1d')}
              </p>
              <p className="mb-4 leading-relaxed text-gray-600 dark:text-white/60">{t('text2')}</p>
              <p className="leading-relaxed text-gray-600 dark:text-white/60">{t('text3')}</p>
            </div>
          </div>

          {/* Stats */}
          <Reveal animation="fadeUp" options={{ delay: 0.2 }} className="grid! grid-cols-3 gap-4">
            {[
              { label: t('stats.projects'), value: '50+' },
              { label: t('stats.clients'), value: '25+' },
              {
                label: t('stats.experience'),
                value: `4+${t('stats.years')}`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="grid gap-1 rounded-xl border border-gray-200 bg-white p-4 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm break-all text-gray-600 dark:text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </Reveal>
        </Reveal>

        {/* Features Grid */}
        <Reveal options={{ delay: 0.4 }} as="ul" childAs="li" className="grid! grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.titleTkey}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              {/* Animated gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              {/* Icon */}
              <div
                className={`relative mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative mb-2 text-lg text-gray-900 dark:text-white">
                {t(feature.titleTkey)}
              </h3>
              <p className="relative text-sm leading-relaxed text-gray-600 dark:text-white/60">
                {t(feature.descriptionTKey)}
              </p>

              {/* Glow effect */}
              <div
                className={`absolute -right-10 -bottom-10 h-20 w-20 bg-gradient-to-br ${feature.color} rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-50`}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </BaseSection>
  );
};
