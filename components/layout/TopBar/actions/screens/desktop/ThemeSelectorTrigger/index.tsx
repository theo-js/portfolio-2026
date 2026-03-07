'use client';

import { useEffect, useRef, useState, type FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTitle, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { LocalStorageKey } from '@/core/ids/localStorage';
import { Moon, Sun, XIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsHydrated } from 'radix-ui/internal';
import { ThemeSelectorMenu } from '../../../common/ThemeSelector';
import { useLocalStorage } from 'react-use';
import { useTranslations } from 'next-intl';

const BRING_ATTENTION_TIMER_DURATION_IN_SECONDS = 15;

export const ThemeSelectorMenuTriggerDesktop: FC = () => {
  const t = useTranslations('topbar.theme-selector.menu');
  const { resolvedTheme } = useTheme();
  const isHydrated = useIsHydrated();
  const [isUserAwareOfThemeSelector, setIsUserAwareOfThemeSelector] = useLocalStorage(
    LocalStorageKey.IsUserAwareOfThemeSelector,
    false,
  );
  const [tooltipProps, setTooltipProps] = useState({ open: false, isBringAwarenessMsg: false });
  const bringAttentionTimerRef = useRef<number>(null);

  useEffect(() => {
    const isMobileDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isUserAwareOfThemeSelector || isMobileDevice) return;

    // Start a timer to bring attention to the theme selector after a certain duration
    bringAttentionTimerRef.current = window.setTimeout(() => {
      setTooltipProps({ open: true, isBringAwarenessMsg: true });
      setIsUserAwareOfThemeSelector(true); // Mark that the user has been made aware of the theme selector
    }, BRING_ATTENTION_TIMER_DURATION_IN_SECONDS * 1000);

    return () => {
      if (bringAttentionTimerRef.current) clearTimeout(bringAttentionTimerRef.current);
    };
  }, []);

  /* Open normal tooltip, override bring awareness message if necessary */
  function openNormalTooltip() {
    setTooltipProps({ open: true, isBringAwarenessMsg: false });

    // Clear the timer if the user interacts with the switch before the timer ends
    if (bringAttentionTimerRef.current) {
      clearTimeout(bringAttentionTimerRef.current);
      bringAttentionTimerRef.current = null;
    }
  }

  function closeTooltip() {
    setTooltipProps({ open: false, isBringAwarenessMsg: false });
  }

  if (!isHydrated) return <Skeleton className="h-4 w-12" />;

  return (
    <Tooltip open={tooltipProps.open}>
      <TooltipTrigger tabIndex={-1} asChild>
        <div>
          <ThemeSelectorMenu
            align="end"
            onOpenChange={() => {
              closeTooltip();
              setIsUserAwareOfThemeSelector(true);
            }}
          >
            <Switch
              isToggle
              size="lg"
              checked={resolvedTheme === 'light'}
              thumbIcon={resolvedTheme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
              onMouseEnter={openNormalTooltip}
              onMouseLeave={closeTooltip}
              aria-label="Theme selector menu"
            />
          </ThemeSelectorMenu>
        </div>
      </TooltipTrigger>

      <TooltipContent className="max-w-67">
        {tooltipProps.isBringAwarenessMsg ? (
          <div className="flex flex-col gap-2">
            <TooltipTitle className="flex justify-between gap-2">
              <span>{t('bring-awareness-message.title')}</span>
              <Button
                onClick={closeTooltip}
                size="icon-xs"
                variant="ghost"
                className="text-foreground!"
              >
                <XIcon />
              </Button>
            </TooltipTitle>
            <p>{t('bring-awareness-message.description')}</p>
          </div>
        ) : (
          <p>{t('title')}</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
