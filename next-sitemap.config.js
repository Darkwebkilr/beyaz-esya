/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://manisamerkezservisi.com",
  generateRobotsTxt: true, // robots.txt de oluştursun
  sitemapSize: 7000,
  exclude: ["/favicon.ico"], // İstemediğimiz sayfalar
  robotsTxtOptions: {
    additionalSitemaps: ["https://manisamerkezservisi.com/sitemap-0.xml"],
  },
};
