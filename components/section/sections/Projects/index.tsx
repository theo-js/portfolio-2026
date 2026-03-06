import type { FC } from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProjectCard } from './ProjectCard';
import { projects } from './constants';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

export const ProjectsSection: FC = async () => {
  const t = await getTranslations('sections.projects');

  return (
    <BaseSection id={SectionId.Projects}>
      {/* Projects carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          skipSnaps: true,
        }}
      >
        <div className="contents gap-2 md:flex">
          <CarouselPrevious className="glass:backdrop-blur-xl relative left-[min(20vw,_275px)] z-1 hidden xl:grid xl:size-20 xl:shadow-2xl dark:backdrop-blur-lg xl:[&_svg]:size-8!" />

          <CarouselContent className="-mt-8 py-8">
            {projects.map((project, index) => (
              <CarouselItem
                key={project.titleTKey}
                className="grid basis-[calc(100%-2rem)] md:basis-[calc(50%-2rem)] xl:basis-1/3"
                // Adjust default animations to make the carousel feel more natural
                innerSlideClassName={cn(
                  // Make the adjacent card slightly visible on mobile
                  'transform-none opacity-100',
                  // There cannot be 1 card at the center in md/lg breakpoints, so disable the animation
                  'md:opacity-100 md:transform-none lg:opacity-100 lg:transform-none',
                )}
              >
                <ProjectCard {...{ project, index }} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="glass:backdrop-blur-xl relative right-[min(20vw,_275px)] z-1 hidden xl:grid xl:size-20 xl:shadow-2xl dark:backdrop-blur-lg xl:[&_svg]:size-8!" />
        </div>

        <CarouselIndicator slidesLength={projects.length} className="xl:justify-center" />
      </Carousel>

      {/* CTA */}
      <Reveal animation="scaleIn" className="mx-auto mt-16 w-fit text-center">
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
