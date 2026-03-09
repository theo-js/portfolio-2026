export const SessionStorageKey = {
  LastVisitedProjectSlug: 'last-visited-project-slug',
} as const;

export type SessionStorageKey = (typeof SessionStorageKey)[keyof typeof SessionStorageKey];
