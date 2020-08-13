
const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    target: "web",
    mode: 'development',
    output: {
        path: path.join(__dirname, 'src/public'),
        filename: 'bundle-front.js'
    },
    devtool: "source-map",
    devServer: {
        host: 'localhost',
        port: 8000,
        historyApiFallback: true,
        contentBase: './',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./src/index-template.html",
            filename: "./index.html",
        }),
    ]
})