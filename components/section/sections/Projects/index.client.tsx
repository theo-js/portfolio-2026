'use client';

import { useIsomorphicLayoutEffect } from 'react-use';
import { CarouselItem } from '@/components/ui/carousel';
import { useState, type FC } from 'react';
import { cn } from '@/lib/utils';
import { SessionStorageKey } from '@/core/ids/sessionStorage';
import { ProjectCard } from './ProjectCard';
import { projects } from './constants';

export const CarouselItems: FC = () => {
  const [sortedProjects, setSortedProjects] = useState(projects);

  useIsomorphicLayoutEffect(() => {
    /*
      If user has visited a project details page,
      set that project as the middle one to improve the experience
    */
    const lastVisitedProjectSlug = sessionStorage.getItem(SessionStorageKey.LastVisitedProjectSlug);
    if (!lastVisitedProjectSlug) return;

    const lastVisitedProjectIndex = projects.findIndex(
      (project) => project.slug === lastVisitedProjectSlug,
    );
    if (lastVisitedProjectIndex === -1) return;

    const isLessThanXl = window.innerWidth < 1280;
    const offset = isLessThanXl
      ? lastVisitedProjectIndex
      : lastVisitedProjectIndex === 0
        ? projects.length - 1
        : lastVisitedProjectIndex - 1;

    const reordered = [...projects.slice(offset), ...projects.slice(0, offset)];
    setSortedProjects(reordered);
  }, []);

  return (
    <>
      {sortedProjects.map((project, index) => (
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
    </>
  );
};
