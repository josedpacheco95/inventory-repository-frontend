import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { NodePackageImporter } from "sass-embedded"; // or "sass"

import Components from "unplugin-vue-components/vite";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
});
