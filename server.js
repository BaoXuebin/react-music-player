const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = new express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
// 监听端口
const port = 3000;

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
// 热更新
app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
    console.log(`app listening on port ${port}!\n`);
});
