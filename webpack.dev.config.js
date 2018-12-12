/**
 * create by yanle
 * create time 2018/12/11 下午4:19
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,         // 端口号
        historyApiFallback: true,
        host: '127.0.0.1'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        /*options: {
                            // minimize: true,
                            // modules: true,
                        }*/
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: false,
                            localIdentName: '[path][name]_[local]_[hash:base64:5]'
                        },
                        // loader: 'file-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    }
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);