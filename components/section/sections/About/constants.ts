import { Code2Icon, PaletteIcon, TargetIcon, ZapIcon } from 'lucide-react';

export const features: {
  icon: typeof Code2Icon;
  titleTkey: string;
  descriptionTKey: string;
  color: string;
}[] = [
  {
    icon: Code2Icon,
    titleTkey: 'features.development.title',
    descriptionTKey: 'features.development.description',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: PaletteIcon,
    titleTkey: 'features.design.title',
    descriptionTKey: 'features.design.description',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: ZapIcon,
    titleTkey: 'features.performance.title',
    descriptionTKey: 'features.performance.description',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: TargetIcon,
    titleTkey: 'features.precision.title',
    descriptionTKey: 'features.precision.description',
    color: 'from-green-400 to-emerald-500',
  },
];
