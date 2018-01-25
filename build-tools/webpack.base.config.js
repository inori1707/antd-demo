const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const chalk = require('chalk')
const autoprefixer = require('autoprefixer')
const babelConfig = require('./babel.config')
const utils = require('./utils')

const pkg = utils.getPackageInfo()

module.exports = {
    devtool: 'source-map',

    output: {
      path: utils.rootPathTo('./dist/'),
      filename: '[name].js'
    },

    resolve: {
      modules: ['node_modules', utils.rootPathTo('../node_modules')],
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': utils.rootPathTo('./src/')
      }
    },

    node: [
      'child_process',
      'cluster',
      'dgram',
      'dns',
      'fs',
      'module',
      'net',
      'readline',
      'repl',
      'tls'
    ].reduce((acc, name) => Object.assign({}, acc, { [name]: 'empty' }), {}),

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: babelConfig
        },
        {
          test: /\.scss$/,
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
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true
      }),
      new CaseSensitivePathsPlugin(),
      new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`),
      new webpack.ProgressPlugin((percentage, msg, addInfo) => {
        const stream = process.stderr
        if (stream.isTTY && percentage < 0.71) {
          stream.cursorTo(0)
          stream.write(`📦  ${chalk.magenta(msg)} (${chalk.magenta(addInfo)})`)
          stream.clearLine(1)
        } else if (percentage === 1) {
          console.log(chalk.green('\nwebpack: bundle build is now finished.'))
        }
      })
    ]
  }
