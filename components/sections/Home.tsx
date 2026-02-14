import { ViewportSection } from '@/components/ui/layout/ViewportSection';
import { cn } from '@/lib/utils';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FC } from 'react';
import { Button } from '../ui/button';
import { BaseSection } from './BaseSection';
import { SectionId } from './SectionId.enum';

export const HomeSection: FC = async () => {
  const t = await getTranslations('sections.home');
  const socialLinks: { label: string; href: string; icon: React.ElementType }[] = [
    { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL ?? '', icon: Github },
    { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL ?? '', icon: Linkedin },
  ];

  return (
    <BaseSection id={SectionId.Home} className="py-24">
      {/* Background grid pattern */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-[size:50px_50px]',
          'bg-[linear-gradient(rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)]',
          'dark:bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)]',
          'mask-gradient-fade-around',
        )}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Text Content */}
        <div>
          <div className="border-primary/30 mb-4 inline-block rounded-full border bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 backdrop-blur-sm dark:from-cyan-500/20 dark:to-purple-500/20">
            <span className="text-primary dark:text-primary text-sm tracking-wider">
              {t('location')}
            </span>
          </div>

          <h2 className="mb-6 text-5xl leading-tight text-gray-900 md:text-7xl dark:text-white">
            <span className="block">{t('title1')}</span>
            <span className="from-primary via-secondary to-tertiary mb-6 block bg-gradient-to-r bg-clip-text text-transparent">
              {t('title2')}
            </span>

            <span className="mb-8 block text-3xl text-gray-700 md:text-4xl dark:text-white/80">
              {t('subtitle')}
            </span>
          </h2>

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-white/60">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
              <span className="relative z-10 flex items-center gap-2">
                {t('cta1')}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
            </a>

            <a
              href="https://github.com/theo-js"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-300 bg-white/5 px-8 py-4 text-gray-900 backdrop-blur-sm transition-all hover:bg-white/10 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              {t('cta2')}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
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
          </div>
        </div>

        {/* Image with Glassmorphism */}
        <div className="relative">
          {/* Glowing orbs */}
          <div className="animate-float bg-primary/30 dark:bg-primary/30 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
          <div
            className="animate-float bg-secondary/30 dark:bg-secondary/30 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"
            style={{ animationDuration: '2s' }}
          />

          {/* Image container with glassmorphism */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/60 p-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
            <div className="bg-background relative aspect-square overflow-hidden rounded-2xl">
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

              {/* Neon border effect */}
              <div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                // animate={{
                //   borderColor: [
                //     'rgba(34, 211, 238, 0.5)',
                //     'rgba(168, 85, 247, 0.5)',
                //     'rgba(236, 72, 153, 0.5)',
                //     'rgba(34, 211, 238, 0.5)',
                //   ],
                // }}
              />
            </div>
          </div>

          {/* Floating elements */}
          <div className="animate-float border-primary/50 absolute top-10 -right-6 rounded-lg border bg-white/40 px-4 py-2 backdrop-blur-md dark:bg-black/40">
            <span className="text-primary text-sm">{t('badge1')}</span>
          </div>

          <div
            className="animate-float border-secondary/50 absolute bottom-10 -left-6 rounded-lg border bg-white/40 px-4 py-2 backdrop-blur-md dark:bg-black/40"
            style={{ animationDuration: '2s' }}
          >
            <span className="text-secondary text-sm">{t('badge2')}</span>
          </div>
        </div>
      </div>
    </BaseSection>
  );
};
