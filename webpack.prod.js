const DuplicatePackageCheckerPlugin = require('@cerner/duplicate-package-checker-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(
  { ...common },
  {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()]
    },
    optimization: {
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`
      },
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'node_vendors',
            chunks: 'all'
          },
          components: {
            name: 'common',
            test: /[\\/]src[\\/]app[\\/]presentation[\\/]components[\\/]/,
            chunks: 'all',
            minSize: 0
          },
          store: {
            name: 'store',
            test: /[\\/]src[\\/]store[\\/]/,
            chunks: 'all',
            minSize: 0
          },
          pages: {
            name: 'pages',
            test: /[\\/]src[\\/]app[\\/]presentation[\\/]pages[\\/]/,
            chunks: 'all',
            minSize: 0
          },
          application: {
            name: 'pages',
            test: /[\\/]src[\\/]app[\\/]application/,
            chunks: 'all',
            minSize: 0
          }
        }
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true
        })
      ]
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled'
      }),
      new Dotenv({
        path: './.env',
        safe: true,
        systemvars: true
      }),
      new HtmlWebpackPlugin({
        template: './template.prod.html',
        favicon: './public/images/favicon.png',
        cache: true
      }),
      new DuplicatePackageCheckerPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'public/locales', to: 'locales' },
          { from: 'public/images', to: 'images' },
        ]
      })
    ]
  }
)
