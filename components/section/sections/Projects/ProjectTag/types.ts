export const ProjectTagId = {
  Next16: 'Next16',
  React19: 'React19',
  Tailwind: 'Tailwind',
  Animation: 'Animation',
  OpenSource: 'OpenSource',
  GSAP: 'GSAP',
  Typescript: 'Typescript',
} as const;
export type ProjectTagId = keyof typeof ProjectTagId;

export type ProjectTag = {
  id: ProjectTagId;
  titleTKey: string;
  descriptionTKey?: string;
};
