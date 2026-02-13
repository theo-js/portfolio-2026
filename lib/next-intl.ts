import { routing } from '@/core/i18n/routing';
import { createNavigation } from 'next-intl/navigation';
import Link from 'next/link';
export { Link }; // TODO: I18n link does not work so far

export const { /* Link */ permanentRedirect, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
