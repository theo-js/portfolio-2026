import { projectTags } from './ProjectTag/constants';
import { type Project } from './types';

export const projects: Project[] = [
  {
    slug: 'analytics-dashboard',
    titleTKey: 'slugs.analytics-dashboard.title',
    descriptionTKey: 'slugs.analytics-dashboard.description',
    imageUrl:
      'https://images.unsplash.com/photo-1760597371674-c5a412f2ae01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzA4MzY0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: [],
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
    tags: [projectTags.React19, projectTags.Next16, projectTags.Tailwind, projectTags.Typescript],
    color: 'from-primary to-tertiary',
    github: 'https://github.com/theo-js/portfolio-2026',
  },
];
