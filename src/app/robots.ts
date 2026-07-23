import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Add any paths you want to disallow
    },
    sitemap: 'https://www.capacityx.co.uk/sitemap.xml',
  };
}
