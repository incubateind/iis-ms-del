const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'app.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'assets'),
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new WebpackNotifierPlugin({ alwaysNotify: true })
    ]
}
