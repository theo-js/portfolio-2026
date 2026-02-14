import { SectionId } from '@/components/section/SectionId.enum';

const sectionsDictionary: Record<SectionId, { tKey: string }> = {
  [SectionId.Home]: { tKey: 'sections.home.tag' },
  [SectionId.About]: { tKey: 'sections.about.tag' },
  [SectionId.Skills]: { tKey: 'sections.skills.tag' },
  [SectionId.Projects]: { tKey: 'sections.projects.tag' },
  [SectionId.Contact]: { tKey: 'sections.contact.tag' },
};
export const sections = Object.keys(sectionsDictionary).map((id) => ({
  ...sectionsDictionary[id as SectionId],
  id: id as SectionId,
}));
