import { projectTags } from './ProjectTag/constants';
import { type Project } from './types';

export const projects: Project[] = [
  {
    slug: 'document-generator',
    titleTKey: 'slugs.document-generator.title',
    descriptionTKey: 'slugs.document-generator.description',
    imageUrl: '/images/projects/document-generator/poster.webp',
    tags: [projectTags.Next13, projectTags.TanstackQuery, projectTags.LayoutEngine],
    color: 'from-green-500 to-emerald-500',
  },
  {
    slug: 'b2b-saas-platform',
    titleTKey: 'slugs.b2b-saas-platform.title',
    descriptionTKey: 'slugs.b2b-saas-platform.description',
    imageUrl: '/images/projects/b2b-saas-platform/cover.webp',
    backgroundImageUrl: {
      mobile: '/images/projects/b2b-saas-platform/background-mobile.webp',
      desktop: '/images/projects/b2b-saas-platform/background-desktop.webp',
    },
    tags: [
      projectTags.Next13,
      projectTags.Turborepo,
      projectTags.TanstackQuery,
      projectTags.ChakraUI,
    ],
    color: 'from-tertiary to-rose-500',
  },
  {
    slug: 'order-and-schedule-services',
    titleTKey: 'slugs.order-and-schedule-services.title',
    descriptionTKey: 'slugs.order-and-schedule-services.description',
    imageUrl: '/images/projects/order-and-schedule-services/poster.webp',
    tags: [
      projectTags.LegacyCode,
      projectTags.Angular,
      projectTags.RxJs,
      projectTags.UX,
      projectTags.CoreWebVitals,
    ],
    color: 'from-primary to-secondary-500',
  },
  {
    slug: 'react-gsap-reveal',
    titleTKey: 'slugs.react-gsap-reveal.title',
    descriptionTKey: 'slugs.react-gsap-reveal.description',
    imageUrl: '/images/projects/react-gsap-reveal/poster.webp',
    tags: [projectTags.OpenSource, projectTags.Animation, projectTags.Next16, projectTags.GSAP],
    color: 'from-cyan-500 to-teal-500',
    github: 'https://github.com/theo-js/-theo-js-react-gsap-reveal',
    website: 'https://theo-js.github.io/-theo-js-react-gsap-reveal',
  },
  {
    slug: 'portfolio',
    titleTKey: 'slugs.portfolio.title',
    descriptionTKey: 'slugs.portfolio.description',
    imageUrl: '/images/projects/portfolio/poster.webp',
    backgroundImageUrl: {
      mobile: '/images/projects/portfolio/background-mobile.webp',
      desktop: '/images/projects/portfolio/background-desktop.webp',
    },
    tags: [
      projectTags.React19,
      projectTags.Next16,
      projectTags.Tailwind,
      projectTags.Typescript,
      projectTags.DesignSystem,
      projectTags.Experimental,
    ],
    color: 'from-primary to-tertiary',
    github: 'https://github.com/theo-js/portfolio-2026',
  },
];
