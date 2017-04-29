var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'link.js',
        library: 'cdxEditorLink'
    },
    module: {
        rules: [
            {
                test : /\.(png|jpg|svg)$/,
                use : "file-loader?name=[path][name].[ext]"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: 1,
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ])
            },
            {
                test: /\.js$/,
                use : [{
                    loader: 'babel-loader',
                    options: {
                        presets : ['es2015']
                    }
                },
                {
                    loader: "eslint-loader",
                    // options: {
                    //     fix: true
                    // }
                }]
            }
        ]
    },
    plugins : [

        /** Extract CSS */
        new ExtractTextPlugin({
            filename: 'link.css',
            allChunks: true
        })

        /** Uglify JS bundle */
        // new webpack.optimize.UglifyJsPlugin({
        //     /** Disable warning messages. Cant disable uglify for 3rd party libs such as html-janitor */
        //     compress: {
        //         warnings: false
        //     }
        // }),

        /** Block biuld if errors found */
        // new webpack.NoErrorsPlugin()

    ],
    watch: true,

    watchOptions: {
        aggregateTimeOut: 50
    }
};