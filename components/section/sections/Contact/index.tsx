import type { FC, FormEvent } from 'react';
import { getTranslations } from 'next-intl/server';
import { SendIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
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
          {contactInfo.map((info, index) => (
            <div
              key={info.labelTKey}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <AnimatedGlow duration={ANIMATED_GLOW_DURATION} ease="power3.in" />

              <div className="relative z-10 flex items-start gap-4">
                <div className={`rounded-xl bg-gradient-to-br p-3 ${info.color}`}>
                  <info.icon className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="mb-1 text-sm text-gray-600 dark:text-white/60">
                    {t(info.labelTKey)}
                  </h3>

                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-lg text-gray-900 transition-colors hover:text-cyan-400 dark:text-white dark:hover:text-cyan-400"
                    >
                      {info.shouldTranslateValue ? t(info.value) : info.value}
                    </a>
                  ) : (
                    <p className="text-lg text-gray-900 dark:text-white">
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
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <AnimatedGlow duration={ANIMATED_GLOW_DURATION} ease="power3.in" />

            <h3 className="mb-4 text-gray-900 dark:text-white">{t('follow-me')}</h3>

            <Reveal animation="slideRight" options={{ delay: 0.7 }} className="flex! gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white/10 text-gray-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70 ${social.color} hover:border-primary! hover:text-primary! transition-all`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
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
