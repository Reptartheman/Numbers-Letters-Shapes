import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/index.html', // Auto-open browser on dev start
    browser: 'Brave Browser', // Use Brave as the browser (macOS app name)
  },
});
