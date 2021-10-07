const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/checkout.js'),
  output: {
    filename: `worker.js`,
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new webpack.EnvironmentPlugin(['STRIPE_SECRET_KEY'])
  ]
}
