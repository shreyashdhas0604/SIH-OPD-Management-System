import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for your local backend API
      '/api': {
        target: 'http://localhost:3000', // Your local backend API URL
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Adjust the path if needed
      },
      
      // Proxy for Daily.co API
      '/daily-api': {
        target: 'https://medqueu.daily.co', // Daily.co API URL
        changeOrigin: true,
        secure: true, // Daily.co uses HTTPS
        rewrite: (path) => path.replace(/^\/daily-api/, ''), // Optional: Adjust path if needed
      },
    },
  },
});
