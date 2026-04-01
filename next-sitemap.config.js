/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://btqualityconstruction.com',
  generateRobotsTxt: true,
  exclude: ['/404', '/en/404', '/en/en/*', '/*/en/*'],
  alternateRefs: [
    { href: process.env.NEXT_PUBLIC_SITE_URL || 'https://btqualityconstruction.com', hreflang: 'fr' },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://btqualityconstruction.com'}/en`,
      hreflang: 'en',
    },
  ],
  transform: async (config, path) => {
    // Assign proper priorities
    let priority = 0.7
    let changefreq = 'weekly'
    if (path === '/') { priority = 1.0; changefreq = 'daily' }
    else if (path === '/en') { priority = 1.0; changefreq = 'daily' }
    else if (path.includes('/services/') && !path.includes('/en/')) { priority = 0.9; changefreq = 'weekly' }
    else if (path.includes('/en/services/')) { priority = 0.9; changefreq = 'weekly' }
    else if (path === '/contact' || path === '/en/contact') { priority = 0.8; changefreq = 'monthly' }
    else if (path.includes('/blog/')) { priority = 0.6; changefreq = 'monthly' }
    else if (path === '/about' || path === '/en/about') { priority = 0.5; changefreq = 'monthly' }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [],
  },
}
