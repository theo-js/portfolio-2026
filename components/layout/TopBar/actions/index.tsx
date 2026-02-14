import type { FC } from 'react';
import { TopBarActionsDesktop } from './screens/desktop';
import { TopBarActionsMobile } from './screens/mobile';

export const TopBarActions: FC = () => (
  <>
    <div className="contents md:hidden">
      <TopBarActionsMobile />
    </div>

    <div className="hidden md:contents">
      <TopBarActionsDesktop />
    </div>
  </>
);
