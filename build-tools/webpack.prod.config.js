const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const utils = require('./utils')

const pkg = utils.getPackageInfo()
const entry = [utils.rootPathTo('./index')]

const webpackProdConfig = webpackMerge(webpackBaseConfig, {
  entry: {
    [`${pkg.name}.min`]: entry
  },
  output: {
    library: pkg.name,
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',                                   
      amd: 'react-dom'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        ascii_only: true
      },
      compress: {
        drop_console: true,
        warnings: false
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'production'
      )
    })
  ]
})

module.exports = webpackProdConfig
