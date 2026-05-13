import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    host: "127.0.0.1",
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.ts?(x)"],
    setupFiles: ["./scripts/vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
