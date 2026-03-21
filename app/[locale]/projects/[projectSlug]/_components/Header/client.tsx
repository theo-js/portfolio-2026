'use client';

import { SessionStorageKey } from '@/core/ids/sessionStorage';
import { useEffect, type FC } from 'react';

interface MarkAsVisitedProps {
  projectSlug: string;
}

export const MarkAsVisited: FC<MarkAsVisitedProps> = ({ projectSlug }) => {
  useEffect(() => {
    sessionStorage.setItem(SessionStorageKey.LastVisitedProjectSlug, projectSlug);
  }, [projectSlug]);
  return null;
};
