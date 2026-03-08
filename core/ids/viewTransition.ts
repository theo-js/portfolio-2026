export const ViewTransitionName = {
  ProjectTitle: (params: { slug: string }) => `project-${params.slug}-title`,
  ProjectImage: (params: { slug: string }) => `project-${params.slug}-image`,
  ProjectTag: (params: { slug: string; tag: string }) => `project-${params.slug}-tag-${params.tag}`,
} as const;
export type ViewTransitionName = (typeof ViewTransitionName)[keyof typeof ViewTransitionName];
