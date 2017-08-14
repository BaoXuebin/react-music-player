const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.jsx')
    },
    devtool: 'eval-source-map', // 用于开发环境，能够追踪错误信息到具体的源文件
    devServer: {
        contentBase: BUILD_PATH,
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        // 清空 dist 文件夹
        new CleanWebpackPlugin(['dist']),
        // html 模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(ROOT_PATH, 'index.tpl.html')
        })
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
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
