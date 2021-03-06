var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

///npm run run:local

module.exports = {
    context: __dirname,
    entry: {
        //'base': './static/assets/js/ordenes_laboratorio/index',
        'laboratorio': './static/assets/js/laboratorio/index'
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
                exclude: '/node_modules/'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};