import { BreadCrumbsBar } from './BreadCrumbsBar';
import type { FC } from 'react';

export const PostDetailsHeader: FC = async () => (
  <header className="x relative overflow-hidden px-6 pt-24 pb-4">
    <BreadCrumbsBar />
  </header>
);
