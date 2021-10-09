const path = require("path")

module.exports = {
  entry: "./src/worker/index.ts",
  mode: "production",
  target: "webworker",
  output: {
    filename: "worker.js",
    path: path.join(__dirname, "dist")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".html"],
    fallback: {
      path: false,
      http: false,
      https: false,
      fs: false,
      os: false
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        type: "asset/source"
      }
    ]
  }
}
