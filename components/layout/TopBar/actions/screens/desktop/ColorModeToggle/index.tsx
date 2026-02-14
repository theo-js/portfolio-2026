import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsHydrated } from 'radix-ui/internal';
import type { FC } from 'react';

export const ColorModeToggleDesktop: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  if (!isHydrated) return <Skeleton className="h-4 w-12" />;

  return (
    <Switch
      isToggle
      size="lg"
      checked={resolvedTheme === 'light'}
      onCheckedChange={(checked) => setTheme(checked ? 'light' : 'dark')}
      thumbIcon={resolvedTheme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    />
  );
};
