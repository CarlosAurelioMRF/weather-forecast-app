const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/app/main/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash:8].js',
    sourceMapFilename: '[name].[fullhash:8].map',
    chunkFilename: '[id].[fullhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.join(__dirname, 'src'),
      'react-is': path.resolve(__dirname, 'node_modules', 'react-is'),
      globalize$: path.resolve(__dirname, "node_modules/globalize/dist/globalize.js"),
      globalize: path.resolve(__dirname, "node_modules/globalize/dist/globalize"),
      cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
      cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr")
    }
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '/src/app/presentation/styles/images/[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }]
      }
    ]
  }
}
