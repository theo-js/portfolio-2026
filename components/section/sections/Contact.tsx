import type { FC } from 'react';
import { BaseSection } from '../components/BaseSection';
import { SectionId } from '../SectionId.enum';

export const ContactSection: FC = () => {
  return <BaseSection id={SectionId.Contact}>Contact</BaseSection>;
};
