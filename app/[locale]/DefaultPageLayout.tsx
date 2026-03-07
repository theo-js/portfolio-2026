import { PageFooter } from '@/components/layout/Footer';
import { PageBackground } from '@/components/layout/PageBackground';
import { TopBar } from '@/components/layout/TopBar';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import type { FC, PropsWithChildren } from 'react';

export const DefaultPageLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative">
    <PageBackground className="z-0" />
    <ScrollIndicator />

    <div className="relative z-1 flex min-h-screen flex-col">
      <TopBar />

      <article className="grow-1">{children}</article>

      <PageFooter />
    </div>
  </div>
);
