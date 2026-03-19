export type ColorTheme =
  | 'copper'
  | 'cyberpunk'
  | 'eclipse'
  | 'emerald'
  | 'forest'
  | 'oceanic'
  | 'plasma'
  | 'ruby'
  | 'sunset';

export const colorThemesDictionary: Record<ColorTheme, { titleTKey: string }> = {
  plasma: { titleTKey: 'options.plasma.title' },
  cyberpunk: {
    titleTKey: 'options.cyberpunk.title',
  },
  sunset: { titleTKey: 'options.sunset.title' },
  eclipse: { titleTKey: 'options.eclipse.title' },
  emerald: { titleTKey: 'options.emerald.title' },
  ruby: { titleTKey: 'options.ruby.title' },
  oceanic: { titleTKey: 'options.oceanic.title' },
  forest: { titleTKey: 'options.forest.title' },
  copper: { titleTKey: 'options.copper.title' },
};

export const COLOR_THEME_DEFAULT_VALUE: ColorTheme = 'plasma';
