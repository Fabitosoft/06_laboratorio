var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

///npm run run:local

module.exports = {
    context: __dirname,
    entry: {
        'base': './static/assets/js/ordenes_laboratorio/index'
    },
    output: {
        path: path.resolve('./static/assets/bundles/'),
        filename: "[name].js"
        //filename: "[name]-[hash].js"
    },
    plugins: [],
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['env', "stage-1", 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};