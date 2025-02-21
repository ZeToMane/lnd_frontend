import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue() // this tells Vitest/Vite how to handle .vue files
    ],
    test: {
        globals: true,
        environment: 'jsdom', // This simulates a browser-like environment
    },
})
