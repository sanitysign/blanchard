const webpack = require('webpack');
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = env => {
  env.dev ? console.log(`\x1b[36m`, `Development Mode`) : env.serve ? console.log(`\x1b[36m`, `Server Mode. No main.css`) : console.log(`\x1b[36m`, `Production Mode`)

  const pluginsBase = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery',
    })
  ]

  const pluginsExtract = [
    new MiniCssExtractPlugin({
      filename: "styles/main.css"
    })
  ]

  return {
    entry: {
      main: path.resolve(__dirname, './src/scripts/main.js'),
    },
  
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'scripts/[name].js',
      // publicPath: 'http://localhost:8080/',
      publicPath: 'C:/AlphaFolder/Work/Skillbox/blanchard/dist/',
    },
  
    devtool: env.serve ? 'inline-cheap-module-source-map' : 'source-map' ,
  
    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      watchContentBase: true,
      hot: true,
      open: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            {
              loader: env.serve ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                // modules: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: env.prod ? [
                    autoprefixer({
                      cascade: false,
                      overrideBrowserslist: [ "> 1%", "ie 10"]
                    })
                  ] : []
                }
              }
            },
            {
              loader: 'sass-loader',
            },
          ]
        },
        {
          test: /\.(png|jpeg|jpg|gif|svg|webp)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '../img',
                outputPath: 'img',
                name: '[name].[ext]'
              },
            }
          ]
        },
        {
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '../fonts',
                outputPath: 'fonts',
                name: '[name].[ext]'
              },
            }
          ]
        }
      ]
    },
  
    optimization: {
      minimizer: [
        '...',
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
      usedExports: true,
      // splitChunks: {
      //   chunks: 'all',
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name(module) {
      //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //         return `npm.${packageName.replace('@', '')}`;
      //       },
      //     },
      //   },
      // },
    },
  
    plugins: env.serve ? pluginsBase : pluginsBase.concat(pluginsExtract)
  }
}