/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import Vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    exclude: [
      "node_modules",
      "dist",
      "coverage",
      "vue-vuetify/*.*",
      "vue-vuetify/coverage/**",
      "vue-vuetify/src/**",
    ],
    coverage: {
      all: true,
      include: [
        "src/*/**/*.{js,ts,vue}",
      ],
      exclude: [
        "node_modules",
        "dist",
        "coverage",
        "src/**/*.d.ts",
        "src/**/index.ts",
        "src/tests/**",
        "src/types/**",
        "src/stores/index.ts",
        "src/plugins/index.ts",
        "src/plugins/vuetify.ts",
      ],
    },
  },
  plugins: [
    Vue(),
  ],
})
