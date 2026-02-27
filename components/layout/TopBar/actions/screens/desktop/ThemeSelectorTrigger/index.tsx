import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsHydrated } from 'radix-ui/internal';
import { ThemeSelectorMenu } from '../../../common/ThemeSelector';
import type { FC } from 'react';

export const ThemeSelectorMenuTriggerDesktop: FC = () => {
  const { resolvedTheme } = useTheme();
  const isHydrated = useIsHydrated();

  if (!isHydrated) return <Skeleton className="h-4 w-12" />;

  return (
    <ThemeSelectorMenu align="end">
      <Switch
        isToggle
        size="lg"
        checked={resolvedTheme === 'light'}
        thumbIcon={resolvedTheme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
      />
    </ThemeSelectorMenu>
  );
};
