const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const PreactRefreshPlugin = require('@prefresh/webpack')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (_env, argv) => {
  const mode = argv.mode
  const isProduction = argv.mode === 'production'
  const devtool = isProduction ? false : 'inline-source-map'

  return {
    entry: './src/client/index.tsx',
    target: 'web',
    mode,
    devtool,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
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
      !isProduction && new PreactRefreshPlugin(),
      !isProduction && new HtmlWebpackPlugin({ template: 'src/client/index.html' }),
      new CopyPlugin({ patterns: [{ from: 'assets', to: '.' }] }),
      process.env.ANALYZE_BUNDLE && new WebpackBundleAnalyzer
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      compress: true,
      hot: true
    }
  }
}
