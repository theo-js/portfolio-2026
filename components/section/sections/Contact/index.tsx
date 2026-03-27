import type { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/effects/reveal';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { ContactForm } from './Form';
import { DecorativeElement } from './DecorativeElement';
import { FloatingGlassElements } from './FloatingGlassElements';
import { AnimatedGlow } from './AnimatedGlow';
import {
  ANIMATED_GLOW_DURATION,
  ANIMATED_GLOW_REPEAT_DELAY,
  contactInfo,
  socialLinks,
} from './constants';

export const ContactSection: FC = async () => {
  const t = await getTranslations('sections.contact');

  return (
    <BaseSection id={SectionId.Contact} className="flex items-center">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact Info */}
        <Reveal animation="slideLeft" options={{ delay: 0.2 }} className="space-y-8">
          {/* Info Cards */}
          {contactInfo.map((info) => (
            <div
              key={info.labelTKey}
              className="group glass:bg-white/20 glass:light:backdrop-blur-4xl glass:border-white/40 relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <AnimatedGlow duration={ANIMATED_GLOW_DURATION} ease="power3.in" />

              <div className="relative z-10 flex items-start gap-4">
                <div className={`rounded-xl bg-gradient-to-br p-3 ${info.color}`}>
                  <info.icon className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="glass:text-white/80 mb-1 text-sm text-gray-600 dark:text-white/60">
                    {t(info.labelTKey)}
                  </h3>

                  {info.href ? (
                    <a
                      href={info.href}
                      className="glass:text-white hover:text-primary! text-lg text-gray-900 transition-colors dark:text-white"
                    >
                      {info.shouldTranslateValue ? t(info.value) : info.value}
                    </a>
                  ) : (
                    <p className="glass:text-white glass:text-white text-lg text-gray-900 dark:text-white">
                      {info.shouldTranslateValue ? t(info.value) : info.value}
                    </p>
                  )}
                </div>
              </div>

              {/* Glow effect */}
              <div
                className={`absolute -right-10 -bottom-10 h-32 w-32 bg-gradient-to-br ${info.color} rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
              />
            </div>
          ))}

          {/* Social Links */}
          <div className="glass:bg-white/20 glass:light:backdrop-blur-4xl glass:border-white/40 relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <AnimatedGlow duration={ANIMATED_GLOW_DURATION} ease="power3.in" />

            <h3 className="glass:text-white mb-4 text-gray-900 dark:text-white">
              {t('follow-me')}
            </h3>

            <Reveal animation="slideRight" options={{ delay: 0.7 }} className="flex! gap-4">
              {socialLinks.map(({ label, shouldTranslateLabel, icon: Icon, ...anchorProps }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Button asChild variant="outline" rounded size="icon-xl">
                      <a
                        {...anchorProps}
                        aria-label={shouldTranslateLabel ? t(`socialLinks.${label}`) : label}
                      >
                        <Icon className="size-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>
                    {shouldTranslateLabel ? t(`socialLinks.${label}`) : label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </Reveal>
          </div>

          {/* Decorative Element */}
          <DecorativeElement />
        </Reveal>

        {/* Contact Form */}
        <Reveal animation="slideRight">
          <div className="relative">
            <ContactForm
              revealInnerElementsDelay={0.5}
              animatedGlowDelay={ANIMATED_GLOW_DURATION - ANIMATED_GLOW_REPEAT_DELAY / 2}
            />

            <FloatingGlassElements />
          </div>
        </Reveal>
      </div>
    </BaseSection>
  );
};
