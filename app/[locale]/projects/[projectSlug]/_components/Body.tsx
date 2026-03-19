import type { FC, PropsWithChildren } from 'react';

export const PROJECT_DETAILS_BODY_ID_ATTRIBUTE = 'project-details-body' as const;

export const ProjectDetailsBody: FC<PropsWithChildren> = (props) => (
  <main {...props} id={PROJECT_DETAILS_BODY_ID_ATTRIBUTE} />
);
