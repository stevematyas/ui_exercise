const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [path.resolve(__dirname, './src/index.js')],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|png)$/,
        use: 'file-loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './solution'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './solution'),
    },
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'UI Exercise - Emmnanuel Marcha',
    }),
  ],
};