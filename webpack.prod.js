const common = require('./webpack.common');
const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,{
    target: "web",
    mode: 'production',
    output: {
        publicPath: "/zm-cinema/"
    },
    devtool: "source-map",
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "build/index.html",
            inject: 'body',
            template: "./src/index-template.html",
        }),
    ]
})