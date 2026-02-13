import type { FC } from 'react';
import { BaseSection } from './BaseSection';
import { SectionId } from './SectionId.enum';

export const AboutSection: FC = () => {
  return <BaseSection id={SectionId.About}>About</BaseSection>;
};
