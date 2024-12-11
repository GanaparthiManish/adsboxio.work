import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // Use aliases for cleaner imports
      },
    },
    define: {
      'process.env': env,
    },
    build: {
      outDir: 'dist', // Use 'dist' for build output
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Increase the warning limit
    },
    publicDir: 'public', // Ensure `public` is not used as output
  };
});
