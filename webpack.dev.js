const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, '/'),
		port: 8081,
		host: '127.0.0.1',
		inline: true,
		hot: true,
	},
});
