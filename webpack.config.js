const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'src/app.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'development',
    module: {
        rules: [{
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimize: true
    }
}