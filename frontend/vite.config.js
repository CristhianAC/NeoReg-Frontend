import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/photos': {
        target: 'http://localhost:8000',  // Your backend server
        changeOrigin: true,               // Ensures correct origin is sent
        secure: false,                    // Disable SSL verification (if needed)
      }
    }
  }
});
