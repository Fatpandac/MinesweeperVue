import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';

const path = require('path');

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      safelist: [...'grid-cols-8 grid-cols-16 grid-cols-30'.split(' ')]
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  server: {
    host: true
  },
  base: '/'
});
