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
  ruby: { titleTKey: 'options.ruby.title' },
  eclipse: { titleTKey: 'options.eclipse.title' },
  emerald: { titleTKey: 'options.emerald.title' },
  sunset: { titleTKey: 'options.sunset.title' },
  oceanic: { titleTKey: 'options.oceanic.title' },
  forest: { titleTKey: 'options.forest.title' },
  copper: { titleTKey: 'options.copper.title' },
};
