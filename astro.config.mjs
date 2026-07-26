// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Inline the (small) CSS into the HTML head — removes the render-blocking
  // stylesheet request and speeds up first paint / LCP.
  build: {
    inlineStylesheets: 'always',
  },
  // Self-hosted, optimized fonts (no render-blocking request to Google).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Anton',
      cssVariable: '--font-anton',
      weights: [400],
    },
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: [400, 500, 600, 700, 800],
    },
    {
      provider: fontProviders.google(),
      name: 'Archivo Narrow',
      cssVariable: '--font-archivo-narrow',
      weights: [500, 600, 700],
    },
    {
      provider: fontProviders.google(),
      name: 'Caveat',
      cssVariable: '--font-caveat',
      weights: [700],
    },
  ],
});
