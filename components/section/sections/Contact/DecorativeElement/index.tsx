'use client';

import { FC, useRef } from 'react';
import { AnimatedGlow } from '../AnimatedGlow';
import { ANIMATED_GLOW_DURATION } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const DecorativeElement: FC = () => {
  const motionBgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power3.inOut', yoyo: true, duration: 20 },
      });

      tl.to(motionBgRef.current, { scale: 1.2, rotate: 90 }).to(motionBgRef.current, {
        scale: 1,
        rotate: 0,
      });
    },
    { scope: motionBgRef },
  );

  return (
    <div className="from-primary/60 to-secondary/60 dark:from-primary/20 dark:to-secondary/20 relative min-h-48 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br grayscale-40 backdrop-blur-xl dark:border-white/10 dark:grayscale-0">
      <AnimatedGlow duration={ANIMATED_GLOW_DURATION} ease="power3.in" />

      <div
        ref={motionBgRef}
        className="from-primary/70 to-secondary/70 dark:from-primary/30 dark:to-secondary/30 absolute inset-0 bg-gradient-to-br"
        // animate={{
        //     scale: [1, 1.2, 1],
        //     rotate: [0, 90, 0],
        //   }}
        // transition={{ duration: 20, repeat: Infinity }}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="p-6 text-center text-lg text-white">
          Disponible pour de nouvelles opportunités de collaboration. N'hésitez pas à me contacter
          pour discuter de projets passionnants ou de collaborations potentielles. Je suis toujours
          ouvert à de nouvelles idées et à des partenariats créatifs.
        </p>

        {/* <p className="px-6 text-center text-lg text-gray-900 dark:text-white">
                  {t('available')}{' '}
                  <span className="text-cyan-400 dark:text-cyan-400">{t('freelance')}</span>{' '}
                  {t('and')}{' '}
                  <span className="text-purple-400 dark:text-purple-400">
                    {t('collaborations')}
                  </span>
                </p> */}
      </div>
    </div>
  );
};
