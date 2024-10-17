// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import node from "@astrojs/node";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://agency-website-astro.netlify.app/',
  output: 'hybrid',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  },

  integrations: [icon()],
  adapter: netlify(),
});