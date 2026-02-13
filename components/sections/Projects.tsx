import type { FC } from 'react';
import { BaseSection } from './BaseSection';
import { SectionId } from './SectionId.enum';

export const ProjectsSection: FC = () => {
  return <BaseSection id={SectionId.Projects}>Projects</BaseSection>;
};
