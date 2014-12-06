'use strict';

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'jsx-loader?harmony'
      },
    ]
  }
};
