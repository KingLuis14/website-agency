// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
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

  adapter: node({
    mode: "standalone",
  }),
});