/*
 * @Author: weisheng
 * @Date: 2025-08-30 18:25:05
 * @LastEditTime: 2025-08-30 18:38:03
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-starter/vite.config.ts
 * 记得注释
 */
import Uni from '@uni-helper/plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniHelperManifest(),
    // https://github.com/uni-helper/vite-plugin-uni-pages
    UniHelperPages({
      dts: 'src/uni-pages.d.ts',
      subPackages: [
        'src/subPages',
      ],
      /**
       * 排除的页面，相对于 dir 和 subPackages
       * @default []
       */
      exclude: ['**/components/**/*.*'],
    }),
    // https://github.com/uni-helper/vite-plugin-uni-layouts
    UniHelperLayouts(),
    // https://github.com/uni-helper/vite-plugin-uni-components
    UniHelperComponents({
      resolvers: [WotResolver()],
      dts: 'src/components.d.ts',
      dirs: ['src/components', 'src/business'],
      directoryAsNamespace: true,
    }),
    Uni(),
    UniPolyfill(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core', 'pinia', 'uni-app', {
        from: 'uni-mini-router',
        imports: ['createRouter', 'useRouter', 'useRoute'],
      }, {
        from: 'wot-design-uni',
        imports: ['useToast', 'useMessage', 'useNotify', 'CommonUtil'],
      }, {
        from: 'alova/client',
        imports: ['usePagination', 'useRequest'],
      }],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store', 'src/utils', 'src/api'],
      vueTemplate: true,
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),
  ],
})
