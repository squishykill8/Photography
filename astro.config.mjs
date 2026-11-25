// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Replace with your real address once deployed (used for social-share previews).
  site: 'https://squishykill8-photography.netlify.app',
  image: {
    // Photos are resized and converted to modern formats at build time.
    layout: 'constrained',
  },
});
