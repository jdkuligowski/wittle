const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  entry: '/src/index.js',
  output: {
    path: path.resolve('./dist/'),
    filename: '[name]-[hash].js',
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' })
  ],
  mode: 'development',
  module: {
    rules: [{ test: /\.(js|jsx)$/, use: 'raw-loader' }],
  },
}