const express = require('express');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.common.js');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = new express();
// 监听端口
const port = 3000;

app.use('/', connectHistoryApiFallback());
app.use('/', express.static('dist'));

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        },
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    }));

    // 热更新
    app.use(webpackHotMiddleware(compiler));
}

app.listen(port, () => {
    console.log(`app listening on port ${port}!\n`);
});
