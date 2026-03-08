import type { NextConfig } from 'next';
import createMDXPlugin from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDXPlugin({});

const withNextIntl = createNextIntlPlugin('./core/i18n/request.ts');
export default withMDX(withNextIntl(nextConfig));
