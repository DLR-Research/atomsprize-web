const path = require('path')

module.exports = {
  entry: './src/worker/index.ts',
  mode: 'development',
  devtool: "cheap-module-source-map", // avoid "eval": Workers environment doesn’t allow it
  target: 'webworker',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        type: 'asset/source'
      }
    ]
  }
}
