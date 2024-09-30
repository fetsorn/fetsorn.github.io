import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), basicSsl()],
    build: {
        outDir: './public'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    publicPath: process.env.NODE_ENV === "production" ? "/whale-mission/" : "/",
    base: './'
});
