export const ProjectTagId = {
  Next13: 'Next13',
  Next16: 'Next16',
  React19: 'React19',
  Tailwind: 'Tailwind',
  Animation: 'Animation',
  OpenSource: 'OpenSource',
  GSAP: 'GSAP',
  Typescript: 'Typescript',
  LegacyCode: 'LegacyCode',
  Angular: 'Angular',
  RxJs: 'RxJs',
  UX: 'UX',
  CoreWebVitals: 'CoreWebVitals',
  Turborepo: 'Turborepo',
  TanstackQuery: 'TanstackQuery',
  ChakraUI: 'ChakraUI',
  Experimental: 'Experimental',
  DesignSystem: 'DesignSystem',
  LayoutEngine: 'LayoutEngine',
} as const;
export type ProjectTagId = keyof typeof ProjectTagId;

export type ProjectTag = {
  id: ProjectTagId;
  titleTKey: string;
  descriptionTKey?: string;
};
