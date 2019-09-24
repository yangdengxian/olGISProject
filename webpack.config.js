const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//自定义参数，根据serverType选择文件打包
const argv = require('yargs').argv;

module.exports = {
    context: __dirname,
    mode: argv.mode || 'development',
    devtool: 'source-map',
    entry: [
        'babel-polyfill', //js with async/await
        "./mainGeoserver.js",
    ],
    output: {
        path: __dirname + '/build/front/GIS/' + argv.serverType,
        filename: '[name].js',
        sourcePrefix: ''
    },
    node: {
        // Resolve node module use of fs
        fs: "empty"
    },
    module: {
        rules: [{
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/, // 正则表达式，表示.css后缀的文件
                use: [
                    /* {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            minimize: true
                        },
                    }, */
                    'style-loader',
                    'css-loader'
                ], // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            },
            /* {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "file-loader?name=images/[hash:8].[name].[ext]"
            }, */
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
            favicon: './images/ico/favicon.ico', // 添加小图标
            inject: true //自动注入
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: "/",
        // port: 8081,
        host: '0.0.0.0',
        inline: true,
        hot: true,
        //浏览器显示错误信息
        overlay: true,

    },
};