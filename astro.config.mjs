// @ts-check
import { defineConfig } from 'astro/config';
import rehypeRaw from 'rehype-raw';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [react()],

  markdown: {
    rehypePlugins: [rehypeRaw],
  },

  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://eriktory.com',
  base: '/',
});
