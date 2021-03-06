module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    devServer: {
        // port: port,
        overlay: {
            warning: false,
            errors: true
        },
        proxy: {
            '/api': {
                // target: 'http://tcharge.loverain.top',
                target: 'http://120.55.83.24:666',
                changeOrigin: true
            }
        }
    },
    lintOnSave: false,
    runtimeCompiler: true,
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    resources: './src/assets/style/theme.scss',

                    // Or array of paths
                    // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
                })
                .end()
        })
    }
}
