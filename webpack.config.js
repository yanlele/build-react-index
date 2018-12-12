/**
 * create by yanle
 * create time 2018/12/11 下午4:19
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');  // 安装本地webpack的时候，会给我们带上，所以不用单独安装
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = {
    entry: {
        app: [
            "react-hot-loader/patch",
            path.join(__dirname, './src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'],
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',       //这里应该用chunkhash替换hash, 但是会跟 --hot 冲突，无奈的妥协
        chunkFilename: '[name].[chunkhash].js',
        publicPath : '/'
    },

    devtool: 'cheap-module-source-map',

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",     // 用于缓存打包编译结果， 提升下次编译速度
                    options: {
                        cacheDirectory: true,
                    }
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
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
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
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
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../img',
                                    outputPath: 'img',
                                }
                            }
                        }
                    },
                    {
                        loader: 'img-loader'
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 50,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../fonts',
                                    outputPath: 'fonts',
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[contenthash:5].css',                   // 输出路径
            allChunks: true
        }),

        /*new PurifyCSS({
            paths: glob.sync([ // 传入多文件路径
                path.resolve(__dirname, './src/index.html'), // 处理根目录下的html文件
                path.resolve(__dirname, './src/!*.js') // 处理src目录下的js文件
            ])
        }),*/

        new HtmlWebpackPlugin({
            filename: 'index.html',         // 打包之后的文件名
            template: path.join(__dirname, 'src/index.html')
        }),

        // 提取公共代码
        new webpack.optimize.CommonsChunkPlugin({               // 提取三方生成的代码, 包括模块代码
            names: [ 'vendor'],
            minChunks: Infinity
        }),

        new UglifyJSPlugin(),

        new webpack.DefinePlugin({                              // 指定三方模块的运行环境
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.HashedModuleIdsPlugin(),                    // 优化缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ]
};