// webpack 配置信息
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
    devtool: 'inline-source-map', // 用于开发环境，能够追踪错误信息到具体的源文件
    devServer: {
        contentBase: BUILD_PATH
    },
    plugins: [
        // 清空 dist 文件夹
        // new CleanWebpackPlugin(['dist']),
        // html 模板
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, 'index.tpl.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js',
        publicPath: '/'
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
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
