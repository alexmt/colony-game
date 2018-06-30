'use strict;';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const config = {
    mode: 'production',
    entry: './src/ui/index.tsx',
    output: {
        filename: '[name].[chunkhash].js',
        path: __dirname + '/../../dist/ui',
        publicPath: '/',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader?configFileName=./src/ui/tsconfig.json',
            }, {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!raw-loader!sass-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!raw-loader'
            },
        ]
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/ui/index.html'
        }),
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
            }
        }
    }
};

if (isProd) {
    config
        .plugins
        .push(new UglifyJsPlugin());

}

module.exports = config;
