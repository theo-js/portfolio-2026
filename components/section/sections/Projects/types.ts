import type { ProjectTag } from './ProjectTag/types';

type ProjectBackgroundImageProperties = {
  url: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  titleTKey: string;
  descriptionTKey: string;
  imageUrl: string;
  backgroundImage?: {
    mobile: ProjectBackgroundImageProperties;
    desktop: ProjectBackgroundImageProperties;
  };
  tags: ProjectTag[];
  color: string;
  github?: string;
  website?: string;
};
