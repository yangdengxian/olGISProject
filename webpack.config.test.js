const webpack = require('webpack');
const path = require('path');
//自定义参数，根据serverType选择文件打包
const argv = require('yargs').argv;
// console.log(argv);

// const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: argv.mode || 'development',
    devtool: 'source-map',
    entry: './mainTest.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
    },
    module: {
        rules: [{
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/, // 正则表达式，表示.css后缀的文件
                use: ['style-loader', 'css-loader'], // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
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
    /* plugins: [
        new uglify()
    ] */
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 7777,
        host: '0.0.0.0',
        inline: true,
        hot: true,
        //浏览器显示错误信息
        overlay: true
    },
};