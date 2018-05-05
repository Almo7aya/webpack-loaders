const path = require('path');
const webpack = require('webpack');

const glob = require('glob');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCssPlugin = require('purifycss-webpack');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/app.js')
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new PurifyCssPlugin({
            paths: glob.sync(path.join(__dirname, 'dist/index.html'))
        }),
        function () {
            this.plugin('done', stats => {
                console.log(stats);
            });
        }
    ],
    module: {
        rules: [{
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: [{
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    'img-loader',
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true
    }
}