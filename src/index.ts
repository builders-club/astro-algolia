// import fs from 'node:fs';
import type { AstroConfig, AstroIntegration } from 'astro';
const STATUS_CODE_PAGE_REGEXP = /\/[0-9]{3}\/?$/;

type AlgoliaIndexOptions = {
  /**
   * Additional configuration for Algolia
   */
  config: {
    algoliaApplicationId: string;
    algoliaAPIKey: string;
    algoliaIndexName: string;
  };

  /**
   * All pages are included in your Algolia index by default.
   * With this config option, you can filter included pages by URL.
   *
   * The `page` function parameter is the full URL of your rendered page, including your `site` domain.
   * Return `true` to include a page in your sitemap, and `false` to remove it.
   *
   * ```js
   * filter: (page) => page !== 'http://example.com/secret-page'
   * ```
   */
  filter?(page: string): string;
};

/**
 * Construct Algolia index given a set of URLs
 * @param pages URLs to review for indexing
 */
function generateIndex(pages: string[]) {
  
  // Filter out status code pages.
  const urls = [...pages].filter((url) => !STATUS_CODE_PAGE_REGEXP.test(url));

  return "";
}

export default function createPlugin(options: AlgoliaIndexOptions): AstroIntegration {
  let astroConfig: AstroConfig;
  const config = options.config;

  return {
    name: 'astro-algolia',
    hooks: {
      'astro:config:done': async ({ config: _config }) => {
        astroConfig = _config;
      },
      'astro:build:done': async (options) => {

        console.dir(options, {depth: null});

        const ALGOLIA_APP_ID = config.algoliaApplicationId;
        const ALGOLIA_API_KEY = config.algoliaAPIKey;
        const ALGOLIA_INDEX_NAME = config.algoliaIndexName;

        if (!ALGOLIA_APP_ID) {
          console.warn(
            'The Algolia integration requires an Algolia Application Id. Skipping.'
          );
          return;
        }
        if (!ALGOLIA_API_KEY) {
          console.warn(
            'The Algolia integration requires an Algolia API Key. Skipping.'
          );
          return;
        }
        if (!ALGOLIA_INDEX_NAME) {
          console.warn(
            'The Algolia integration requires an Algolia Index Name. Skipping.'
          );
          return;
        }


        // let pageUrls = pages.map((p) => new URL(p.pathname, finalSiteUrl).href);
        // if (filter) {
        //   pageUrls = pageUrls.filter((page: string) => filter(page));
        // }
        // const sitemapContent = generateSitemap(pageUrls);
        // fs.writeFileSync(new URL('sitemap.xml', dir), sitemapContent);
      },
    },
  };
}