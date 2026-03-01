import { /*FileTextIcon, */ GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import { SectionId } from '../../SectionId.enum';
import type { AnchorHTMLAttributes } from 'react';

export const socialLinks: ({
  label: string;
  icon: React.ElementType;
} & AnchorHTMLAttributes<HTMLAnchorElement>)[] = [
  {
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL ?? '',
    icon: GithubIcon,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL ?? '',
    icon: LinkedinIcon,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { label: 'Contact', href: `#${SectionId.Contact}`, icon: MailIcon },
  // {
  //   label: 'CV',
  //   href: './theo-bayenet-resume.pdf',
  //   download: true,
  //   icon: FileTextIcon,
  // },
];
