import type { FC } from 'react';
import { BaseSection } from '../components/BaseSection';
import { SectionId } from '../SectionId.enum';

export const SkillsSection: FC = () => {
  return <BaseSection id={SectionId.Skills}>Skills</BaseSection>;
};
