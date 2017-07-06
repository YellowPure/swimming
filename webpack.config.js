var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');

var isDev = process.env.NODE_ENV == 'dev';
var isPro = process.env.NODE_ENV == 'production';

var config = {
	entry: {
		app: [
			// 'webpack-dev-server/client?http://localhost:8080/dist/',
			path.resolve(__dirname, './src/index.js')
		]
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/dist/' 
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        }),
				exclude: /node_modules/
			},
			{ test: /\.js$/, loader: 'babel-loader?cacheDirectory', exclude: /node_modules/ },
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'url-loader?limit=1&name=images/[name].[ext]',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
        alias: {
            'phaser': phaser,
            'pixi.js': pixi,
            'p2': p2,
        }
    },
	externals: {
        jquery: 'window.$'
    },
	plugins: [
		new webpack.DefinePlugin({
	      	isDev: isDev,
	      	isPro: isPro
	    }),
		// 全局jquery（可以为外部依赖）
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
		new ExtractTextPlugin("[name].min.css"),
		new HtmlWebpackPlugin({
			chunks: ['app'],
			hash: false,
			template: path.resolve(__dirname, './index.html'),
			filename: path.resolve(__dirname, './dist/index.html'),
			minify: {
                removeComments: false,
                collapseWhitespace: false
            }
		})
	],
	devServer: {
		port: '8888',
        disableHostCheck: true
	}
}

if(process.env.NODE_ENV == 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
            // 删除所有的注释
            comments: false,
            // 在UglifyJs删除没有用到的代码时不输出警告
            compress: {
                warnings: false
            },
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            minimize: true,
            except: ['$super', '$', 'exports', 'require']
        })
	);
}

module.exports = config;
