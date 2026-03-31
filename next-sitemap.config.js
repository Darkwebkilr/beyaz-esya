/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://manisabeyazesyaservisi.com',
  generateRobotsTxt: true, // robots.txt de oluştursun
  sitemapSize: 7000,
  exclude: ['/favicon.ico'], // İstemediğimiz sayfalar
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://manisabeyazesyaservisi.com/sitemap-0.xml',
    ],
  },
}
