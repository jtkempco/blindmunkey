var webpack = require("webpack");
var path = require('path');
require("babel-core/register");
require("babel-polyfill");

const DIST_DIR = path.resolve(__dirname, "assets/js/");
const SRC_DIR = path.resolve(__dirname, "react/src/");

module.exports = {
	entry: ['babel-polyfill', SRC_DIR + '/index.js'],
	output: {
		path: DIST_DIR,
		filename: 'blindbuilder.js'
	},
    module: {
		rules: [
    		{
				test: /\.js?$/,
				include: SRC_DIR,
				use: {
					loader: 'babel-loader',
					options: {
    					presets: ['react', 'env'],
						plugins: ['transform-object-rest-spread', 'react-html-attrs', 'transform-class-properties']
					}
    			}
    		}
        ]
    }	
}