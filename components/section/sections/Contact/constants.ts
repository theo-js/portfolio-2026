import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from 'lucide-react';

export const contactInfo: {
  icon: typeof MailIcon;
  labelTKey: string;
  value: string;
  shouldTranslateValue?: boolean;
  href?: string;
  color: string;
}[] = [
  {
    icon: MailIcon,
    labelTKey: 'email.label',
    value: process.env.NEXT_PUBLIC_AUTHOR_EMAIL ?? '',
    href: `mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL ?? ''}`,
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: MapPinIcon,
    labelTKey: 'location.label',
    value: 'location.value',
    shouldTranslateValue: true,
    color: 'from-purple-400 to-pink-500',
  },
];

export const socialLinks: {
  icon: typeof GithubIcon;
  label: string;
  href: string;
  color: string;
}[] = [
  {
    icon: GithubIcon,
    label: 'Github',
    href: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL ?? '',
    color: 'hover:text-gray-700 dark:hover:text-gray-400',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL ?? '',
    color: 'hover:text-blue-500',
  },
];

export const ANIMATED_GLOW_DURATION = 6;
export const ANIMATED_GLOW_REPEAT_DELAY = 1;
