import type { FC } from 'react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { getTranslations } from 'next-intl/server';
import { SectionTag } from '../../components/SectionTag';
import { SectionTitle } from '../../components/SectionTitle';
import { features } from './constants';
import { Reveal } from '@theo-js/react-gsap-reveal';

export const AboutSection: FC = async () => {
  const t = await getTranslations();

  return (
    <BaseSection id={SectionId.About}>
      {/* Section Heading */}
      <Reveal>
        <SectionTag>{t('sections.about.tag')}</SectionTag>
        <SectionTitle>{t('sections.about.title')}</SectionTitle>
      </Reveal>

      {/* Main Content */}
      <div className="mb-16 grid gap-12 md:grid-cols-2">
        {/* Text Content */}
        <Reveal animation="slideLeft" className="space-y-6">
          <div className="relative rounded-2xl border border-gray-200 bg-white p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            {/* Neon glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 blur-xl dark:from-cyan-500/10 dark:to-purple-500/10" />

            <div className="relative z-10">
              <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-white/80">
                {t('sections.about.text1')}{' '}
                <span className="text-cyan-400 dark:text-cyan-400">
                  {t('sections.about.text1b')}
                </span>{' '}
                {t('sections.about.and')}{' '}
                <span className="text-purple-400 dark:text-purple-400">
                  {t('sections.about.text1c')}
                </span>{' '}
                {t('sections.about.text1d')}
              </p>
              <p className="mb-4 leading-relaxed text-gray-600 dark:text-white/60">
                {t('sections.about.text2')}
              </p>
              <p className="leading-relaxed text-gray-600 dark:text-white/60">
                {t('sections.about.text3')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <Reveal animation="fadeUp" options={{ delay: 0.2 }} className="grid! grid-cols-3 gap-4">
            {[
              { label: t('sections.about.stats.projects'), value: '50+' },
              { label: t('sections.about.stats.clients'), value: '25+' },
              {
                label: t('sections.about.stats.experience'),
                value: `5 ${t('sections.about.stats.years')}`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-4 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-1 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-3xl text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60">{stat.label}</div>
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
