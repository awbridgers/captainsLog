var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig= new HTMLWebpackPlugin({
  template: __dirname + "/public/index.html",
  filename: "index.html",
  inject: 'body'
});


module.exports={
  entry: __dirname + '/public/index.js',
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude:/node_modules/,
      loader: 'babel-loader'
    },
    {
      test:/\.css$/,
      loader: "style-loader!css-loader"
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
      'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ]
    }
  ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + "/build"

  },
  plugins: [HTMLWebpackPluginConfig]
};
