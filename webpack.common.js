const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.jsx')
    },
    devtool: 'cheap-module-eval-source-map', // 用于开发环境，能够追踪错误信息到具体的源文件
    devServer: {
        contentBase: BUILD_PATH,
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0'
    },
    plugins: [
        // 清空 dist 文件夹
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        // html 模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(ROOT_PATH, 'index.tpl.html')
        })
    ],
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loaders: 'babel-loader',
                include: APP_PATH
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
