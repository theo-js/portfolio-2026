'use client';

import { getCurrentlyVisibleThemeSelectorTriggerElement } from '@/components/layout/TopBar/actions/common/ThemeSelector/helpers';
import { Button } from '@/components/ui/button';
import type { FC, PropsWithChildren } from 'react';

export const OpenThemeSelectorButton: FC<PropsWithChildren> = (props) => (
  <Button
    className="mt-4 w-fit"
    variant="outline"
    onClick={() => getCurrentlyVisibleThemeSelectorTriggerElement()?.click()}
  >
    {props.children}
  </Button>
);
