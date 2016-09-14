const path = require('path');
const webpack = require('webpack');

console.log(__dirname);

module.exports = {
  defaultRoot: path.join(__dirname, 'docs_src'),
  webpackConfig: {
    devtool: 'eval',
    plugins: [
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: [
            path.join(__dirname, 'lib'),
          ],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /.png|gif$/,
          loader: 'url-loader?limit=8192',
        },
        {
          test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)$/,
          loader: 'url-loader?limit=8192',
        },
      ],
    },
    resolve: {
      root: path.resolve('src'),
    },
  },
};
