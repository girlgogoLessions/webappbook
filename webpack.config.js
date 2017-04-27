const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
	context: path.resolve(__dirname,'./html'),
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	entry: {
		'static/script/pages/book': './static/script/pages/book.js',
		'static/script/pages/category': './static/script/pages/category.js',
		'static/script/pages/channel': './static/script/pages/channel.js',
		'static/script/pages/index': './static/script/pages/index.js',
		'static/script/pages/reader': './static/script/pages/reader.js',
		'static/script/pages/rank': './static/script/pages/rank.js',
		'static/script/pages/search': './static/script/pages/search.js',
		'vendor': ['vue','jquery']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.js$/,
				use: [
					
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'view/index.html',
			template: 'view/index.html',
			chunks: ['vendor', 'static/script/pages/index']
		}),
		new HtmlWebpackPlugin({
			filename: 'view/book.html',
			template: 'view/book.html',
			chunks: ['vendor', 'static/script/pages/book']
		}),
		new HtmlWebpackPlugin({
			filename: 'view/category.html',
			template: 'view/category.html',
			chunks: ['vendor', 'static/script/pages/category']
		}),
		new HtmlWebpackPlugin({
			filename: 'view/female.html',
			template: 'view/female.html',
			chunks: ['vendor', 'static/script/pages/channel']
		}),
		new HtmlWebpackPlugin({
			filename: 'view/male.html',
			template: 'view/male.html',
			chunks: ['vendor', 'static/script/pages/channel']
		}),
		new HtmlWebpackPlugin({
			filename: 'view/rank.html',
			template: 'view/rank.html',
			chunks: ['vendor', 'static/script/pages/rank']
		}),
		new HtmlWebpackPlugin({
			filename: 'view/reader.html',
			template: 'view/reader.html',
			chunks: ['vendor', 'static/script/pages/reader']
		}),
		new HtmlWebpackPlugin({
			filename: 'view/search.html',
			template: 'view/search.html',
			chunks: ['vendor', 'static/script/pages/search']
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			cache: true,
			names: ['vendor'],
			filename: 'static/script/common.js'
		}),
		new CopyWebpackPlugin([
			{
				from: "view/include/*.html"
			},
			{
				from: "static/img/*.png"
			}
		]),
		new ExtractTextPlugin({
			filename:  function (getPath) {
				return getPath('static/css/[name].css').replace('css/js', 'css');
			},
			allChunks: true
		})
	],
	resolve: {
		extensions: ['.js', 'vue', '.json', '.sass', 'scss', '.ejs', '.css'],
		alias: {
			'vue': 'vue/dist/vue.min.js'
		}
	}
};
