import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      // Connector A
      '/api': {
        target: 'https://localhost:8080',
        changeOrigin: true,
        secure: false, // if using self-signed HTTPS
      },
      // Connector B
      '/connectorb': {
        target: 'https://localhost:8081',
        changeOrigin: true,
        secure: false, // for self-signed HTTPS
        rewrite: (path) => path.replace(/^\/connectorb/, ''), // remove prefix
      },
      // Broker
      '/brokerAPI': {
        target: 'https://localhost:444',
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/brokerAPI/, ''), // remove prefix
      },

    },
  },
});
