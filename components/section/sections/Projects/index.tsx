import type { FC } from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { Reveal } from '@/components/ui/reveal';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { projects } from './constants';
import { CarouselItems } from './index.client';

export const ProjectsSection: FC = async () => {
  const t = await getTranslations('sections.projects');

  return (
    <BaseSection
      id={SectionId.Projects}
      questionMark={t('case-studies-disclaimer')}
      className="px-0 xl:px-6"
      headingProps={{
        className: 'px-6 xl:px-0',
      }}
    >
      {/* Projects carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          skipSnaps: true,
        }}
        className="pl-6 xl:pl-0"
      >
        <div className="contents gap-2 md:flex">
          <CarouselPrevious className="glass:backdrop-blur-xl relative left-[min(20vw,_275px)] z-1 -ml-20 hidden xl:grid xl:size-20 xl:shadow-2xl dark:backdrop-blur-lg xl:[&_svg]:size-8!" />

          <CarouselContent className="-mt-8 py-8">
            <CarouselItems />
          </CarouselContent>

          <CarouselNext className="glass:backdrop-blur-xl relative right-[min(20vw,_275px)] z-1 -mr-20 hidden xl:grid xl:size-20 xl:shadow-2xl dark:backdrop-blur-lg xl:[&_svg]:size-8!" />
        </div>

        <CarouselIndicator slidesLength={projects.length} className="xl:justify-center" />
      </Carousel>

      {/* CTA */}
      <Reveal animation="scaleIn" className="mx-auto mt-16 w-fit px-6 text-center xl:px-0">
        <Button
          asChild
          variant="outline"
          rounded
          size="2xl"
          className="inline-flex items-center gap-3"
        >
          <a
            href={`${process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
            <span>{t('cta')}</span>
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </Button>
      </Reveal>
    </BaseSection>
  );
};
