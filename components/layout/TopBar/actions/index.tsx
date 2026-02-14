import type { FC } from 'react';
import { TopBarActionsDesktop } from './screens/desktop';

export const TopBarActions: FC = () => (
  <div className="hidden md:contents">
    <TopBarActionsDesktop />
  </div>
);
