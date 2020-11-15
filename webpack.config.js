const path = require('path');
const HWP = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: { pretty: true },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(scss|sass)$/,
        use: [

          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`,
            // },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [

          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`,
            // },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff(2)?$)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          outputPath: (url, resourcePath, context) => `fonts/${url}`,
          useRelativePath: true,
        },
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        exclude: [path.resolve(__dirname, 'src/fonts')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img',
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HWP({
      filename: 'index.html',
      template: './src/index.pug',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPugPlugin(),
  ],
};
