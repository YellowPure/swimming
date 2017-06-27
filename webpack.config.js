var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        })
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("app.css"),
		new HtmlWebpackPlugin({
			chunks: ['app'],
			template: './index.html',
			minify:{    //压缩HTML文件
		        removeComments:true    //移除HTML中的注释
		    }
		})
	],
}

if(process.env.NODE_ENV == 'production') {
	config.plugins.push(
		new UglifyJSPlugin()
	);
}

module.exports = config;
