(function () {
  const glob = require('glob');
  const path = require('path');
  const config = require('./webpack.config');
  const nx = require('next-js-core2');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const webpack = require('webpack');
  const devVersionRE = /([\d.]+)/g;
  const argv = require('yargs').argv;

  let entries = require('webpack-entries');
  let baseEntries = entries(config.baseEntryPath);


  let webpackPlugins = [
    new webpack.ProvidePlugin({
      nxt: 'next-js-core2',
      'React': 'react',
      'ReactDOM': 'react-dom',
      'PropTypes': 'prop-types',
      'classNames': 'classnames',
      'objectAssign': 'object-assign'
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name]-[chunkhash:6].css')
  ];

  module.exports = {
    baseEntries: baseEntries,
    plugins: webpackPlugins,
    node: {
      fs: "empty"
    },
    module: {
      preloaders: [{
        test: /\.scss/,
        loader: 'import-glob-loader'
      }],
      loaders: [
        {
          test: /config\.js/,
          loader: 'webpack-replace',
          query: {
            replace: [
              {
                from: '__BUILD_VERSION__',
                to: devVersionRE
              }, {
                from: '__BUILD_ENV__',
                to: argv.env || 'test'
              }
            ]
          }
        },
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass!import-glob-loader')
        },
        {
          test: /\.(gif|jpg|png)\??.*$/,
          loader: 'url-loader?limit=8096&name=images/[name].[ext]'
        },
        {
          test: /\.(woff|svg|eot|ttf)\??.*$/,
          loader: 'url-loader?limit=8096&name=fonts/[name].[ext]'
        },
        {
          test: /\.(html|tpl)$/,
          loader: 'html-loader?minimize=false'
        },
        {
          test: /\.js|jsx$/,
          loaders: ['react-hot'],
          include: path.join(__dirname, 'js')
        },
        {
          test: /\.hbs$/,
          loader: "handlebars"
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.scss'],
      alias: {
        PropTypes: path.resolve(__dirname, '../node_modules/prop-types'),
        classNames: path.resolve(__dirname, '../node_modules/classnames'),
        objectAssign: path.resolve(__dirname, '../node_modules/object-assign'),
        'next-js-core2': path.resolve(__dirname, '../node_modules/next-js-core2/dist/next-js-core2.js'),
        node_modules: path.join(__dirname, '../node_modules'),
        components:
          path.join(__dirname, '../', config.dirs.src, '/components'),
        modules:
          path.join(__dirname, '../', config.dirs.src, '/modules'),
        images:
          path.join(__dirname, '../', config.dirs.src, '/assets/images'),
        vendor:
          path.join(__dirname, '../', config.dirs.src, '/vendor')
      }
    }
  }
  ;

}());
