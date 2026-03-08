import type { ProjectTag, ProjectTagId } from './types';

export const projectTags: Record<ProjectTagId, ProjectTag> = {
  Next16: {
    id: 'Next16',
    titleTKey: 'tags.next16.title',
  },
  React19: {
    id: 'React19',
    titleTKey: 'tags.react19.title',
  },
  OpenSource: {
    id: 'OpenSource',
    titleTKey: 'tags.open-source.title',
    descriptionTKey: 'tags.open-source.description',
  },
  Tailwind: {
    id: 'Tailwind',
    titleTKey: 'tags.tailwind.title',
  },
  Animation: {
    id: 'Animation',
    titleTKey: 'tags.animation.title',
  },
  GSAP: {
    id: 'GSAP',
    titleTKey: 'tags.gsap.title',
    descriptionTKey: 'tags.gsap.description',
  },
  Typescript: {
    id: 'Typescript',
    titleTKey: 'tags.typescript.title',
    descriptionTKey: 'tags.typescript.description',
  },
};
