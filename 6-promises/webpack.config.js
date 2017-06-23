const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: ['babel-polyfill','./src/ui-framework.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.bundle.min.js'
	},
	module: {
		rules: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
      		sourceMap: true,
		}),
	]
};