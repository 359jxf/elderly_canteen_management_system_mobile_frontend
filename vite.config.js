import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import postCssPxToRem from 'postcss-pxtorem'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import {
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: '@/assets',
      utils: '@/utils',
      api: '@/api'
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      resolvers: [VantResolver()]
    }),
    Components({
      dts: true,
      dirs: ['src/components', 'src/views'], // 按需加载的文件夹
      resolvers: [
        VantResolver(),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver()
      ]
    })
  ],
  // Vite自身已经集成PostCSS，无需再次安装。另外也无需单独创建PostCSS配置文件，已集成到vite.config.js的css选项中
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5,
          propList: ['*']
        })
      ]
    }
  },
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8001'
      }
    }
  }
})
