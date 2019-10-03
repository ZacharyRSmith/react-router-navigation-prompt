const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'es'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  plugins: [
    new CopyPlugin([
      // copy the main source file to the `es/index.js.flow` to add
      // a way to consume flow types for the end users
      {
        from: 'src/index.js',
        to: 'index.js.flow',
        toType: 'file'
      }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react',
    'react-router-dom': 'commonjs react-router-dom'
  }
};
