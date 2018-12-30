const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['./src/index.js']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].js',
  },

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
};