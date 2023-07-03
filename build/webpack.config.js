const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  entry: './extension/background.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'background.js'
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '..'),
      extraArgs: "--no-typescript",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.rs$/,
        use: [
          {
            loader: 'rust-loader',
            options: {
              wasmBindgen: {
                wasm2es6js: true
              }
            }
          }
        ]
      },
      {
        test: /\.wasm$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'wasm/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.rs', '.wasm']
  },
  mode: 'development'
};