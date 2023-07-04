const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: false,
  entry: {
    background: path.join(__dirname, 'src', 'background.ts'),
    content: path.join(__dirname, 'src', 'content.ts'),
    popup: path.join(__dirname, 'src', 'popup.ts'),
    options: path.join(__dirname, 'src', 'options.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
  ],
  mode: 'development',
};