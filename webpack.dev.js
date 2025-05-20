const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const ReactRefreshTypeScript = require('react-refresh-typescript')

module.exports = merge(
  { ...common },
  {
    output: {
      path: path.resolve(__dirname, 'dist'),
      pathinfo: false,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].js',
      publicPath: '/'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  jsx: 'react-jsxdev'
                },
                transpileOnly: true,
                experimentalWatchApi: true,
                getCustomTransformers: () => ({
                  before: [ReactRefreshTypeScript()]
                })
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      runtimeChunk: true
    },
    cache: {
      type: 'filesystem',
      store: 'pack'
    },
    devtool: 'inline-source-map',
    devServer: {
      devMiddleware: {
        publicPath: '/',
        writeToDisk: true
      },
      client: {
        logging: 'info',
        overlay: {
          errors: true,
          warnings: false
        },
        progress: true
      },
      static: {
        directory: path.join(__dirname, 'public')
      },
      historyApiFallback: true,
      port: 3000
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          enabled: false,
          files: './src/**/*.{ts,tsx,js,jsx}',
          options: {
            fix: true
          }
        },
        typescript: {
          memoryLimit: 4096,
          profile: true
        }
      }),
      new ReactRefreshWebpackPlugin({
        overlay: false
      }),
      new Dotenv({
        path: './.env.local',
        safe: true,
        systemvars: true
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: './template.dev.html'
      })
    ]
  }
)
