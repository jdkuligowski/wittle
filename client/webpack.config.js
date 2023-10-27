const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist/'),
    filename: '[name]-[hash].js',
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' })
  ],
  mode: 'development',
  module: {
    // rules: [{ test: /\.(js|jsx)$/, use: 'raw-loader' }],
    // rules: [{ test: /\.(js|jsx)$/, use: 'babel-loader' }],
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader', // Injects styles into DOM
        'css-loader',   // Translates CSS into CommonJS
        'sass-loader'   // Compiles Sass to CSS
      ],
    }],
  },
  resolve: {
    fallback: {
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
    },
  },
}