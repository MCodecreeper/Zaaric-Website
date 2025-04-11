import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './', // Ensures correct relative paths for assets
    build: {
        outDir: 'dist', // Build output in 'dist' folder
        assetsDir: 'assets', // Assets in 'assets' folder
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'framer-motion'], // Split vendor deps
                    animations: ['gsap'], // Separate animation libs
                },
            },
        },
    },
    optimizeDeps: {
        exclude: ['framer-motion', 'gsap'], // Exclude from pre-optimization
    },
    assetsInclude: ['**/*.woff2'], // Recognize WOFF2 files
});