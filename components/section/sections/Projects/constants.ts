import { projectTags } from './ProjectTag/constants';
import { type Project } from './types';

export const projects: Project[] = [
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
    slug: 'b2b-saas-platform',
    titleTKey: 'slugs.b2b-saas-platform.title',
    descriptionTKey: 'slugs.b2b-saas-platform.description',
    imageUrl: '/images/projects/b2b-saas-platform/cover.webp',
    backgroundImage: {
      mobile: {
        url: '/images/projects/b2b-saas-platform/background-mobile.webp',
        width: 628,
        height: 466,
      },
      desktop: {
        url: '/images/projects/b2b-saas-platform/background-desktop.webp',
        width: 1182,
        height: 528,
      },
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
    slug: 'portfolio',
    titleTKey: 'slugs.portfolio.title',
    descriptionTKey: 'slugs.portfolio.description',
    imageUrl: '/images/projects/portfolio/poster.webp',
    tags: [projectTags.React19, projectTags.Next16, projectTags.Tailwind, projectTags.Typescript],
    color: 'from-primary to-tertiary',
    github: 'https://github.com/theo-js/portfolio-2026',
  },
];
