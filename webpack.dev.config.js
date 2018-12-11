/**
 * create by yanle
 * create time 2018/12/11 下午4:19
 */

const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,         // 端口号
        historyApiFallback: true,
        host: '127.0.0.1'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader?cacheDirectory=true",     // 用于缓存打包编译结果， 提升下次编译速度
                    options: {
                        cacheDirectory: true,
                    }
                },
                include: path.join(__dirname, 'src')
            }
        ]
    }
};