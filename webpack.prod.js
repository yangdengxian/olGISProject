const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, '/'),
		port: 8081,
		host: '127.0.0.1',
		inline: true,
		hot: true,
	},
});
