import { ArrowDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FC } from 'react';
import { Reveal } from '@/components/effects/reveal';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { AnimatedSubtitle } from './AnimatedSubtitle';
import { socialLinks } from './constants';
import { DeformableGrid } from './DeformableGrid';

export const HomeSection: FC = async () => {
  const t = await getTranslations('sections.home');

  return (
    <BaseSection id={SectionId.Home} noHeading>
      <DeformableGrid />

      <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
        {/* Text Content */}
        <Reveal
          animation="slideLeft"
          options={{ delay: 0.2 }}
          className="z-1"
          childProps={{ style: { display: 'block' } }}
        >
          <div className="border-primary/30 dark:from-primary/15 dark:to-secondary/20 glass:bg-white/10 glass:border-white/40 mb-4 inline-block rounded-full border px-4 py-2 text-center backdrop-blur-sm dark:bg-gradient-to-r">
            <span className="text-primary dark:text-primary glass:text-white text-sm tracking-wider">
              {t('location')}
            </span>
          </div>

          <h2 className="mb-6 text-5xl leading-tight text-gray-900 md:text-7xl md:tracking-tight dark:text-white">
            <span className="glass:text-white -ml-[0.08em] block">{t('title1')}</span>
            <span className="from-primary via-secondary to-tertiary use-bg-as-text-color glass:bg-none glass:bg-white mt-[-0.5rem] mb-6 -ml-[0.08em] block overflow-visible bg-gradient-to-r leading-normal whitespace-nowrap md:mt-[-1.25rem]">
              {t('title2')}
            </span>

            <AnimatedSubtitle />
          </h2>

          <p
            className="glass:text-white/80 mb-8 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-white/80"
            dangerouslySetInnerHTML={{ __html: t('description') }}
          />

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-wrap gap-4">
            <Button asChild variant="secondary" rounded size="2xl" className="group">
              <a href="#projects">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" /> */}
                <span className="relative z-10 flex items-center gap-2">
                  {t('cta1')}
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </span>
              </a>
            </Button>

            <Button asChild variant="outline" size="2xl" rounded>
              <a href={`#${SectionId.Contact}`}>{t('cta2')}</a>
            </Button>
          </div>

          {/* Social Links */}
          <Reveal
            animation="slideRight"
            options={{ delay: 0.7 }}
            as="ul"
            childAs="li"
            className="flex! gap-4"
          >
            {socialLinks.map(({ label, shouldTranslateLabel, icon: Icon, ...anchorProps }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    key={label}
                    asChild
                    className="text-foreground/80 hover:text-primary hover:border-primary! rounded-full"
                    variant="outline"
                    size="icon-xl"
                    color="primary"
                  >
                    <a
                      {...anchorProps}
                      aria-label={shouldTranslateLabel ? t(`socialLinks.${label}`) : label}
                    >
                      <Icon className="h-5! w-5!" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {shouldTranslateLabel ? t(`socialLinks.${label}`) : label}
                </TooltipContent>
              </Tooltip>
            ))}
          </Reveal>
        </Reveal>

        {/* Image with Glassmorphism */}
        <Reveal animation="slideRight">
          <div className="relative">
            {/* Glowing orbs */}
            <div className="light:glass:bg-white light:glass:rounded-3xl animate-float bg-primary/30 dark:bg-primary/30 absolute top-20 -right-10 h-40 w-40 rounded-full opacity-10 md:-top-10 dark:opacity-100 dark:blur-3xl" />
            <div
              className="light:glass:bg-white light:glass:rounded-3xl animate-float bg-secondary/30 dark:bg-secondary/30 absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-10 dark:opacity-100 dark:blur-3xl"
              style={{ animationDuration: '2s' }}
            />

            {/* Image container with glassmorphism */}
            <div className="glass:bg-white/40 glass:dark:bg-white/20 glass:border-white/30 glass:dark:border-white/10 relative overflow-hidden rounded-3xl border border-gray-200 bg-white/60 p-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
              <div className="bg-background glass:bg-transparent relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/home/profile-theo-bayenet.webp"
                  alt="Portfolio Profile Theo Bayenet"
                  className="mask-gradient-fade-bottom-quarter light:mask-none h-full w-full object-contain object-top grayscale transition-transform hover:scale-105"
                  width={400}
                  height={400}
                  loading="eager"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating elements */}
            <div className="animate-float border-primary/50 glass:bg-black/30 light:bg-white/80! glass:dark:brightness-150 glass:dark:bg-black/45 absolute top-40 -right-3 rounded-lg border px-4 py-2 backdrop-blur-md md:top-10 md:-right-6 dark:bg-black/40 dark:brightness-125">
              <span className="text-primary text-sm">{t('badge1')}</span>
            </div>

            <div
              className="animate-float border-secondary/50 glass:bg-black/30 light:bg-white/80! glass:dark:brightness-175 glass:dark:bg-black/50 absolute bottom-10 -left-3 rounded-lg border px-4 py-2 backdrop-blur-md md:-left-6 dark:bg-black/40 dark:brightness-150"
              style={{ animationDuration: '2s' }}
            >
              <span className="text-secondary text-sm">{t('badge2')}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </BaseSection>
  );
};
