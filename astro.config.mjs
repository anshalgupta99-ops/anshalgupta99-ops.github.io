import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set `site` to the production URL before deploying: canonical, OG and sitemap depend on it.
// If the site lives at https://<user>.github.io/<repo>/ also set `base: '/<repo>'`.
export default defineConfig({
  site: 'https://anshal18.github.io',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
