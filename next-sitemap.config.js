// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://deopp.dewall.xyz",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // exclude: ["/server-sitemap.xml"], // <= exclude here
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     "https://news.madaotech.top/server-sitemap.xml", // <==== Add here
  //   ],
  // },
  additionalPaths: async (config) => {
    const now = new Date().toISOString();

    const lastmod = now.replace(/T.*/, '');
    return [
      {
        loc: "https://deopp.dewall.xyz",
        changefreq: "always",
        priority: "1.0",
        lastmod
      },
      {
        loc: "https://deopp.dewall.xyz/en",
        changefreq: "always",
        priority: "0.9",
        lastmod
      },
      {
        loc: "https://deopp.dewall.xyz/zh",
        changefreq: "always",
        priority: "0.9",
        lastmod
      },
    ]
  }
};
