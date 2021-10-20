const path = require('path')
const svgToMiniDataURI = require('mini-svg-data-uri')

module.exports = {
  entry: './src/prerender.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'prerender.js',
    globalObject: 'this',
    library: 'prerender_atomsprize',
    libraryTarget: 'umd'
  },
  mode: 'production',
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
      {
        test: /\.svg/,
        type: 'asset/inline',
        generator: {
          dataUrl: content => {
            content = content.toString()
            return svgToMiniDataURI(content)
          }
        }
      }
    ]
  }
}
