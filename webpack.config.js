var path = require("path");

module.exports = {
  //...
  entry: path.resolve(__dirname, "src", "client", "index.js"),
  output: {
    publicPath: "/",
    path: resolve(__dirname, "..", "build", "client"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};
