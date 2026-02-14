import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import { SectionId } from '../../SectionId.enum';

export const socialLinks: { label: string; href: string; icon: React.ElementType }[] = [
  { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL ?? '', icon: GithubIcon },
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL ?? '',
    icon: LinkedinIcon,
  },
  { label: 'Contact', href: `#${SectionId.Contact}`, icon: MailIcon },
];
