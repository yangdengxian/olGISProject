const webpack = require('webpack');
const path = require('path');
// const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './main.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			},

			{
				test: /\.css$/, // 正则表达式，表示.css后缀的文件
				use: ['style-loader', 'css-loader'], // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					name: './images/[name].[ext]',
					limit: 8192,
				},
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]',
				},
			},
		],
	},
};
