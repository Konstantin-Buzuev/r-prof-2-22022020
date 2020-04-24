const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'index.jsx'),
  },
  // context: path.resolve(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',//If your page expects to find the bundle files on a different path, you can change this with the publicPath
    filename: 'js/bundle.js',
  },
  mode: 'development',
  // mode: 'production',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: {
      index: './src/index.html',
    },
    //TODO 7 Закоментить contentBase
    // contentBase: path.join(__dirname, 'dist'), //This tells webpack-dev-server to serve the files from the dist directory on localhost:8080
    port: 3000,
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3300',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            [
              "@babel/plugin-proposal-class-properties", {"loose": true},
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', //TODO ?
              hmr: process.env.NODE_ENV === 'development', //TODO ?
            }
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
}
