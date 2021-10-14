const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  target: 'webworker',
  mode: 'production',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist')
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
