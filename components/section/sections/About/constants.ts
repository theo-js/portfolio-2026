import { Code2Icon, PaletteIcon, TargetIcon, ZapIcon } from 'lucide-react';

export const features: {
  icon: typeof Code2Icon;
  titleTkey: string;
  descriptionTKey: string;
  color: string;
}[] = [
  {
    icon: Code2Icon,
    titleTkey: 'sections.about.features.development.title',
    descriptionTKey: 'sections.about.features.development.description',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: PaletteIcon,
    titleTkey: 'sections.about.features.design.title',
    descriptionTKey: 'sections.about.features.design.description',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: ZapIcon,
    titleTkey: 'sections.about.features.performance.title',
    descriptionTKey: 'sections.about.features.performance.description',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: TargetIcon,
    titleTkey: 'sections.about.features.precision.title',
    descriptionTKey: 'sections.about.features.precision.description',
    color: 'from-green-400 to-emerald-500',
  },
];
