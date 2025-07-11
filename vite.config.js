import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ChillMoon/', // Replace with your repository name for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
});