import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: [
    "**/*.JPG", 
    "**/*.PNG"
  ],
  base: "./",
  resolve: {
    alias: {
      stream: 'stream-browserify'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});