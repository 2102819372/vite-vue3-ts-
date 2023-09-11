import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 代理规则
      '/api': {
        target: 'http://117.172.29.137:10087/', // 目标服务器的地址
        changeOrigin: true, // 开启代理时，在服务器端会虚拟一个服务器接收请求，然后在这个服务器上转发请求，而不是直接对目标服务器发起请求
        rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写，移除路径中的/api
      },
    },
  },
});
