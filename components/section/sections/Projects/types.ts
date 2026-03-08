import type { ProjectTag } from './ProjectTag/types';

export type Project = {
  slug: string;
  titleTKey: string;
  descriptionTKey: string;
  imageUrl: string;
  tags: ProjectTag[];
  color: string;
  github?: string;
};
