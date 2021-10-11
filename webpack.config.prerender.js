const path = require('path')

module.exports = {
  entry: './scripts/prerenderFromTemplate.ts',
  target: 'node',
  output: {
    filename: 'prerender.js',
    path: path.join(__dirname, 'dist'),
    globalObject: 'this',
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  }
}
