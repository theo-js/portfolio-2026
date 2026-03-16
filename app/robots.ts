import type { MetadataRoute } from 'next';

/* eslint-disable import/no-default-export -- Required to be default export by design */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}
