import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'e-commerce-website',
    titleTKey: 'cards.1.title',
    descriptionTKey: 'cards.1.description',
    imageUrl:
      'https://images.unsplash.com/photo-1642054220431-649c53b0d3de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9kZXJufGVufDF8fHx8MTc3MDc1MTMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'TypeScript', 'Stripe', 'Tailwind'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'fitness-mobile-app',
    titleTKey: 'cards.2.title',
    descriptionTKey: 'cards.2.description',
    imageUrl:
      'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBkZXNpZ258ZW58MXx8fHwxNzcwODMyODcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Next.js', 'Recharts', 'PostgreSQL', 'TailwindCSS'],
    color: 'from-primary to-tertiary',
  },
  {
    slug: 'mobile-app-design',
    titleTKey: 'cards.3.title',
    descriptionTKey: 'cards.3.description',
    imageUrl:
      'https://images.unsplash.com/photo-1760597371674-c5a412f2ae01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzA4MzY0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Figma', 'UI/UX', 'Prototyping', 'Design System'],
    color: 'from-tertiary to-rose-500',
  },
  {
    slug: 'react-gsap-reveal',
    titleTKey: 'cards.4.title',
    descriptionTKey: 'cards.4.description',
    imageUrl: '/images/projects/react-gsap-reveal/poster.webp',
    tags: ['React', 'Next', 'GSAP', 'Animation'],
    color: 'from-cyan-500 to-teal-500',
    github: 'https://github.com/theo-js/-theo-js-react-gsap-reveal',
  },
];
