import { THEME_SELECTOR_TRIGGER_CLASSNAME } from './constants';

export function getCurrentlyVisibleThemeSelectorTriggerElement(): HTMLElement | null {
  const elements = document.getElementsByClassName(THEME_SELECTOR_TRIGGER_CLASSNAME);
  return (Array.from(elements).find((element) => element.checkVisibility()) as HTMLElement) || null;
}
