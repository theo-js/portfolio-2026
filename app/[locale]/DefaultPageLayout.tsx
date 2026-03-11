import { PageFooter } from '@/components/layout/Footer';
import { PageBackground } from '@/components/layout/PageBackground';
import { TopBar } from '@/components/layout/TopBar';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { getSSRIsGlassmorphismEnabled } from '@/core/theming/CustomVariants/glassmorphism/getSSRIsGlassmorphismEnabled';
import { getSSRLastResolvedTheme } from '@/core/theming/LightMode/ssr-last-resolved-theme/get';
import type { FC, PropsWithChildren } from 'react';

export const DefaultPageLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { ssrIsGlassmorphismEnabled } = await getSSRIsGlassmorphismEnabled();
  const { ssrResolvedTheme } = await getSSRLastResolvedTheme();
  return (
    <div className="relative">
      <PageBackground className="z-0" {...{ ssrIsGlassmorphismEnabled, ssrResolvedTheme }} />
      <ScrollIndicator />

      <div className="relative z-1 flex min-h-screen flex-col">
        <TopBar />

        <article className="grow-1">{children}</article>

        <PageFooter />
      </div>
    </div>
  );
};
