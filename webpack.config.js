const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",

  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  plugins:[
    new HtmlWebPackPlugin({
      template: path.resolve( __dirname, "public/index.html" ),
      filename: "index.html",
      favicon: "./public/favicon.ico"
    })
  ],
  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    }]
  },
};
