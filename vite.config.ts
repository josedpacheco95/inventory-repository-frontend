import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { NodePackageImporter } from "sass-embedded"; // or "sass"


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  
})
