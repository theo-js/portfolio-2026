import { /*FileTextIcon, */ GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from 'lucide-react';
import type { AnchorHTMLAttributes } from 'react';

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

export const socialLinks: ({
  icon: typeof GithubIcon;
  label: string;
  shouldTranslateLabel?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>)[] = [
  {
    icon: GithubIcon,
    label: 'Github',
    href: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL ?? '',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL ?? '',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  // {
  //   label: 'CV',
  //   href: './theo-bayenet-resume.pdf',
  //   download: true,
  //   icon: FileTextIcon,
  // },
];

export const ANIMATED_GLOW_DURATION = 6;
export const ANIMATED_GLOW_REPEAT_DELAY = 1;
