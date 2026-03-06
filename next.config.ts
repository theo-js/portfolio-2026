import type { NextConfig } from 'next';
import createMDXPlugin from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDXPlugin({});

const withNextIntl = createNextIntlPlugin('./core/i18n/request.ts');
export default withMDX(withNextIntl(nextConfig));
