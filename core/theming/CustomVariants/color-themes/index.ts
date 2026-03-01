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

/** Warning: There should be at least 7 color themes as the default value is based on the day of the week */
export const colorThemesDictionary: Record<ColorTheme, { titleTKey: string }> = {
  plasma: { titleTKey: 'options.plasma.title' },
  cyberpunk: {
    titleTKey: 'options.cyberpunk.title',
  },
  copper: { titleTKey: 'options.copper.title' },
  sunset: { titleTKey: 'options.sunset.title' },
  emerald: { titleTKey: 'options.emerald.title' },
  ruby: { titleTKey: 'options.ruby.title' },
  eclipse: { titleTKey: 'options.eclipse.title' },
  oceanic: { titleTKey: 'options.oceanic.title' },
  forest: { titleTKey: 'options.forest.title' },
};
