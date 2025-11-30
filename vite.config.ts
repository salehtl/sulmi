import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // Router
            if (id.includes('@tanstack/react-router')) {
              return 'router-vendor'
            }
            // Three.js core (large library, split separately)
            if (id.includes('node_modules/three')) {
              return 'three-core'
            }
            // React Three Fiber
            if (id.includes('@react-three/fiber')) {
              return 'three-fiber'
            }
            // React Three Drei
            if (id.includes('@react-three/drei')) {
              return 'three-drei'
            }
            // Animation libraries
            if (id.includes('framer-motion') || id.includes('lenis')) {
              return 'animation-vendor'
            }
            // Form libraries
            if (id.includes('@tanstack/react-form')) {
              return 'form-vendor'
            }
            // Other vendor code
            return 'vendor'
          }
        },
      },
    },
    // Enable minification with esbuild (faster, no extra dependency)
    minify: 'esbuild',
    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Chunk size warnings - increased since Three.js is lazy loaded
    // The three-core chunk is ~1MB but only loads when WaitlistForm is rendered
    chunkSizeWarningLimit: 1500,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-router'],
  },
})
