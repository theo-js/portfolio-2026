'use client';

import type { FC } from 'react';
import { usePathname } from '@/lib/next-intl';
import { TopBarActionsDesktop } from './screens/desktop';
import { TopBarActionsMobile } from './screens/mobile';

export const TopBarActions: FC = () => {
  const pathname = usePathname();
  const isNestedRoute = pathname !== '/';

  return (
    <>
      <div className="contents md:hidden">
        <TopBarActionsMobile {...{ isNestedRoute }} />
      </div>

      <div className="hidden md:contents">
        <TopBarActionsDesktop {...{ isNestedRoute }} />
      </div>
    </>
  );
};
