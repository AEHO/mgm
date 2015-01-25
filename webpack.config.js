'use strict';

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!sass-loader?indentedSyntax=sass'
      },
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
