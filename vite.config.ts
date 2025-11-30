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
    // Ensure React is deduplicated across chunks
    dedupe: ['react', 'react-dom'],
  },
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // React core - MUST stay together (react and react-dom in same chunk)
            // This ensures React loads before other modules that depend on it
            if (id.includes('react') && (id.includes('/react/') || id.includes('/react-dom/') ||
              id.includes('/react/jsx-runtime') || id.includes('/react/jsx-dev-runtime'))) {
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
    // Common chunk strategy
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-router'],
    esbuildOptions: {
      // Ensure React is treated as external dependency correctly
      target: 'esnext',
    },
  },
})
