import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const ColorModeToggle: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

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
