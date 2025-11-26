import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  return {
    plugins,
    base: "/",
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react'],
            'utils-vendor': ['axios', 'clsx']
          }
        }
      }
    },
    server: {
      port: 3000,
      open: true
    },
    preview: {
      port: 8080,
      open: true
    }
  };
});