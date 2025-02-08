import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// 动态获取端口，默认 3000 或环境变量 PORT
const DEFAULT_PORT = process.env.PORT || 3000;

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production'; // 判断是否是生产环境

    return {
        // 动态设置基础路径
        base: isProduction ? '/static/' : '/',

        // 构建配置
        build: {
            outDir: isProduction ? 'static' : 'dev-static', // 生产环境与开发环境区分输出目录
            assetsDir: 'assets', // 静态资源存放目录
        },

        // 模块解析配置
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'), // 使用 @ 作为 src 的路径别名
            },
        },

        // 插件配置
        plugins: [vue()], // 使用 Vue 插件

        // 本地开发服务器配置
        server: {
            port: DEFAULT_PORT, // 动态端口设置，默认为 3000
            open: true, // 启动开发服务器时自动打开浏览器
        },
    };
});
