const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const PreactRefreshPlugin = require('@prefresh/webpack')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const svgToMiniDataURI = require('mini-svg-data-uri')

module.exports = (_env, argv) => {
  const mode = argv.mode
  const isProduction = argv.mode === 'production'
  const devtool = isProduction ? false : 'inline-source-map'

  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    target: 'web',
    mode,
    devtool,
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
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime'
      }
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'bundle.js'
    },
    plugins: [
      !isProduction && new webpack.HotModuleReplacementPlugin(),
      !isProduction && new PreactRefreshPlugin(),
      !isProduction && new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
      new CopyPlugin({ patterns: [{ from: 'assets', to: '.' }] }),
      process.env.ANALYZE_BUNDLE && new WebpackBundleAnalyzer()
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      proxy: [
        {
          context: ['/badge', '/share', '/stats'],
          target: `http://localhost:${process.env.FASTPRIZE_WORKER_PORT || 8787}`
        }
      ],
      compress: true,
      hot: true
    }
  }
}
