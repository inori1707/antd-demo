const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
const webpackBaseConfig = require('./webpack.base.config')
const utils = require('./utils')

const pkg = utils.getPackageInfo()
const entry = [utils.rootPathTo('./index')]

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
  entry: {
    [`${pkg.name}`]: entry
  },
  resolve: {
    alias: {
      [pkg.name]: utils.rootPathTo('./index'),
      site: utils.rootPathTo('./site')
    }
  },
  externals: {
    'react-router-dom': 'ReactRouterDOM'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: [
                      'last 2 versions',
                      'Firefox ESR',
                      '> 1%',
                      'ie >= 9',
                      'iOS >= 8',
                      'Android >= 4'
                    ]
                  })
                ],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: [
                      'last 2 versions',
                      'Firefox ESR',
                      '> 1%',
                      'ie >= 9',
                      'iOS >= 8',
                      'Android >= 4'
                    ]
                  })
                ],
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  devtool: 'source-map',
  plugins: [new CSSSplitWebpackPlugin({ size: 4000 })]
})

module.exports = webpackDevConfig
