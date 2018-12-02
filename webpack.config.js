const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV === 'development'

const fs = require('fs')

const generateTemplates = () => {
    const files = fs.readdirSync(path.resolve(__dirname, './src'))
    const htmls = files.filter(file => /\.html$/.test(file))

    return htmls.map(template => new HtmlWebpackPlugin({
        filename: template,
        template: path.resolve(__dirname, `./src/${template}`)
    }))
}

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/bundle.js'
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'source-map',
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, './dist'),
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|sass)$/,
                loaders: [
                    isDev ? {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    } : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: isDev
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        ...generateTemplates(),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        })
    ]
}