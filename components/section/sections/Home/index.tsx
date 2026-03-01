import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FC } from 'react';
import { Button } from '../../../ui/button';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { socialLinks } from './constants';
import { Reveal } from '@/components/ui/reveal';

export const HomeSection: FC = async () => {
  const t = await getTranslations('sections.home');

  return (
    <BaseSection id={SectionId.Home} noHeading>
      {/* Background grid pattern */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-[size:50px_50px]',
          'bg-[linear-gradient(color-mix(in_oklab,var(--primary)_10%,transparent_90%)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--primary)_10%,transparent_90%)_1px,transparent_1px)]',
          'dark:bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)]',
          'glass:bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)]',
          'dark:glass:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]',
          'mask-gradient-fade-around',
        )}
      />

      <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
        {/* Text Content */}
        <Reveal
          animation="slideLeft"
          options={{ delay: 0.2 }}
          childProps={{ style: { display: 'block' } }}
        >
          <div className="border-primary/30 dark:from-primary/15 dark:to-secondary/20 glass:bg-white/10 glass:border-white/60 mb-4 inline-block rounded-full border px-4 py-2 backdrop-blur-sm dark:bg-gradient-to-r">
            <span className="text-primary dark:text-primary glass:text-white text-sm tracking-wider">
              {t('location')}
            </span>
          </div>

          <h2 className="mb-6 text-5xl leading-tight text-gray-900 md:text-7xl md:tracking-tight dark:text-white">
            <span className="glass:text-white -ml-[0.08em] block">{t('title1')}</span>
            <span className="from-primary via-secondary to-tertiary use-bg-as-text-color glass:text-white mt-[-0.5rem] mb-6 -ml-[0.08em] block bg-gradient-to-r leading-normal md:mt-[-1.25rem]">
              {t('title2')}
            </span>

            <span className="glass:text-white/90 mt-[-0.5rem] mb-8 -ml-[0.08em] block text-3xl text-gray-700 md:mt-[-0.25rem] md:text-4xl md:tracking-normal dark:text-white/80">
              {t('subtitle')}
            </span>
          </h2>

          <p className="glass:text-white/80 mb-8 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-white/80">
            {t('description')}
          </p>

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
              <a href="https://github.com/theo-js" target="_blank" rel="noopener noreferrer">
                {t('cta2')}
              </a>
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
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                asChild
                className="text-foreground/80 hover:text-primary hover:border-primary! rounded-full"
                variant="outline"
                size="icon-xl"
                color="primary"
              >
                <a
                  href={link.href}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <link.icon className="h-5! w-5!" />
                </a>
              </Button>
            ))}
          </Reveal>
        </Reveal>

        {/* Image with Glassmorphism */}
        <Reveal animation="slideRight">
          <div className="relative">
            {/* Glowing orbs */}
            <div className="light:glass:bg-white light:glass:rounded-3xl animate-float bg-primary/30 dark:bg-primary/30 absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-10 dark:opacity-100 dark:blur-3xl" />
            <div
              className="light:glass:bg-white light:glass:rounded-3xl animate-float bg-secondary/30 dark:bg-secondary/30 absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-10 dark:opacity-100 dark:blur-3xl"
              style={{ animationDuration: '2s' }}
            />

            {/* Image container with glassmorphism */}
            <div className="glass:bg-white/40 glass:dark:bg-white/20 glass:border-white/30 glass:dark:border-white/10 relative overflow-hidden rounded-3xl border border-gray-200 bg-white/60 p-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
              <div className="bg-background glass:bg-transparent relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/profile-theo-bayenet.webp"
                  alt="Portfolio Profile Theo Bayenet"
                  className="mask-gradient-fade-bottom-quarter h-full w-full object-contain object-top grayscale transition-transform hover:scale-105"
                  width={400}
                  height={400}
                  loading="eager"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating elements */}
            <div className="animate-float border-primary/50 absolute top-10 -right-6 rounded-lg border bg-white/40 px-4 py-2 backdrop-blur-md dark:bg-black/40">
              <span className="text-primary text-sm">{t('badge1')}</span>
            </div>

            <div
              className="animate-float border-secondary/50 absolute bottom-10 -left-6 rounded-lg border bg-white/60 px-4 py-2 backdrop-blur-md dark:bg-black/40 dark:brightness-150"
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
