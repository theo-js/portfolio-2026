import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsHydrated } from 'radix-ui/internal';
import type { FC } from 'react';

export const ColorModeToggleMobile: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  if (!isHydrated) return <Skeleton className="h-8 w-8 rounded-full" />;

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="rounded-full"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      {resolvedTheme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
};
