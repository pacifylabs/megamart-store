import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'tailwindcss', '@tailwindcss/vite'],
          utils: ['axios', 'clsx', 'dotenv']
        }
      }
    }
  },
  server: {
    port: 3000
  },
  preview: {
    port: 8080
  }
});

