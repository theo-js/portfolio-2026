import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsHydrated } from 'radix-ui/internal';
import { ThemeSelectorMenu } from '../../../common/ThemeSelector';
import type { FC } from 'react';
import { THEME_TRANSITION_ORIGIN_ELEMENT_CLASSNAME } from '@/core/theming/ThemeTransition/constants';

export const ThemeSelectorMenuTriggerMobile: FC = () => {
  const { resolvedTheme } = useTheme();
  const isHydrated = useIsHydrated();

  if (!isHydrated) return <Skeleton className="h-8 w-8 rounded-full" />;

  return (
    <ThemeSelectorMenu align="start">
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn('rounded-full', THEME_TRANSITION_ORIGIN_ELEMENT_CLASSNAME)}
        aria-label="Theme selector menu"
      >
        {resolvedTheme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
      </Button>
    </ThemeSelectorMenu>
  );
};
