const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//自定义参数，根据serverType选择文件打包
const argv = require('yargs').argv;

// The path to the cesium source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
    context: __dirname,
    mode: argv.mode || 'development',
    devtool: 'source-map',
    entry: [
        'babel-polyfill', //js with async/await
        // "./test/vectorTileLayer.js",
        "./mainCesium.js",
    ],
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        // Needed by Cesium for multiline strings
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: "empty"
    },
    resolve: {
        alias: {
            // Cesium module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
    module: {
        unknownContextCritical: false,
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
    // Split cesium into a seperate bundle
    optimization: {
        splitChunks: {
            name: 'cesium',
            chunks: function(module) {
                return module.context && module.context.indexOf('cesium') !== -1;
            },
            minChunks: 1
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
            favicon: './src/ol/images/ico/favicon.ico', // 添加小图标
            inject: true //自动注入
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('/')
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: "/",
        host: '0.0.0.0',
        inline: true,
        hot: true,
        //浏览器显示错误信息
        overlay: true
    },
};