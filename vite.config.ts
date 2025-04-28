import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	console.log(`Command: ${command}, Mode: ${mode}`);

	return {
		base: '/',
		plugins: [
            vue(), 
            tailwindcss(),
            AutoImport({
                dts: true,
                resolvers: [ElementPlusResolver()],
                eslintrc: {
					enabled: true
				},
                
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            })
        ],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			},
			extensions: ['.js', '.ts', '.json', '.scss', '.vue', '.svg']
		},
		build: {
			sourcemap: true,
			minify: 'terser', // terser 比 esbuild 更小
			assetsDir: 'static', // 静态资源目录
			terserOptions: {
				compress: {
					drop_console: mode === 'production' // 生产环境去掉 console
				}
			},
			rollupOptions: {
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js', // 适用于代码分割后生成的非入口代码块 比如 动态导入
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 主要针对打包过程中遇到的静态资源文件 图片  样式文件  字体文件
					entryFileNames: 'static/js/[name]-[hash].js', //专门针对入口文件。
					// 分包配置
					manualChunks(id) {
						if (id.includes('axios')) {
							return 'chunk-axios';
						}
						if (id.includes('pinia')) {
							return 'chunk-pinia';
						}
						if (id.includes('element-plus')) {
							return (
								'chunk-element-plus-' +
								id.toString().split('element-plus/')[1].split('/')[0].toString()
							);
						}

						if (id.includes('node_modules')) {
							// 将 node_modules 中的依赖按包名进行分包
							if (id.includes('vue')) {
								return 'vendor-vue';
							}
							return (
								'chunk-' +
								id.toString().split('node_modules/')[1].split('/')[1].toString()
							);
						}
					}
				}
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler'
				}
			}
		},
		server: {
			port: 8080,
			proxy: {
				'/api': {
					target: 'http://localhost:3000', // 目标地址 一般是测试环境
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		}
	};
});
