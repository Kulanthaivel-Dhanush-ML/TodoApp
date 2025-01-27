import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Set the test environment to jsdom (default is node)
    globals: true, // If you want to use global test functions like `describe` and `it`
    setupFiles: "./src/setupTests.ts", // Add a setup file for global test setup
  },
});
