import type { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { ContactForm } from './Form';
import { DecorativeElement } from './DecorativeElement';
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
              className="group glass:bg-white/20 glass:border-white/40 relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
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
          <div className="glass:bg-white/20 glass:border-white/40 relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <AnimatedGlow duration={ANIMATED_GLOW_DURATION} ease="power3.in" />

            <h3 className="glass:text-white mb-4 text-gray-900 dark:text-white">
              {t('follow-me')}
            </h3>

            <Reveal animation="slideRight" options={{ delay: 0.7 }} className="flex! gap-4">
              {socialLinks.map((social) => (
                <Button key={social.label} asChild variant="outline" rounded size="icon-xl">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    // className={`border border-gray-300 bg-white/10 text-gray-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70 ${social.color} hover:border-primary! hover:text-primary! transition-all`}
                  >
                    <social.icon className="size-5" />
                  </a>
                </Button>
              ))}
            </Reveal>
          </div>

          {/* Decorative Element */}
          <DecorativeElement />
        </Reveal>

        {/* Contact Form */}
        <Reveal animation="slideRight">
          <ContactForm
            revealInnerElementsDelay={0.5}
            animatedGlowDelay={ANIMATED_GLOW_DURATION - ANIMATED_GLOW_REPEAT_DELAY / 2}
          />
        </Reveal>
      </div>
    </BaseSection>
  );
};
