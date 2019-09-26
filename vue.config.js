module.exports = {
    outputDir: 'static',
    pages: {
        index: {
            // page 的入口
            entry: 'examples/main.js',
            // 模板来源
            template: 'public/index.html',
            // 输出文件名
            filename: 'index.html'
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/sass/_variables.scss";`
            }
        }
    },
    runtimeCompiler: true,
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:8091',
                changeOrigin: true,
                autoRewrite: true,
                ws: false,
            },
		},
        port: 8088,
        disableHostCheck: true
    },
    configureWebpack:(config) => {//es6兼容
        config.entry.app = ['babel-polyfill','./src/main.js'];
    }
}