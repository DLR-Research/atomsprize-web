const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const PreactRefreshPlugin = require("@prefresh/webpack")

module.exports = (_env, argv) => {
  const mode = argv.mode
  const isProduction = argv.mode === "production"
  const devtool = isProduction ? false : "inline-source-map"

  return [
    {
      entry: "./src/client/index.tsx",
      target: "web",
      mode,
      devtool,
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
          react: "preact/compat",
          "react-dom": "preact/compat"
        },
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
      },
      output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js"
      },
      plugins: [
        new HtmlWebpackPlugin({ template: "src/client/index.html" }),
        new CopyPlugin({ patterns: [{ from: "assets", to: "." }] }),
        new PreactRefreshPlugin()
      ].filter(Boolean),
      devServer: {
        static: {
          directory: path.join(__dirname, "dist")
        },
        compress: true,
        hot: true
      }
    },
    {
      entry: "./src/worker/index.ts",
      mode: "production",
      target: "webworker",
      output: {
        filename: "worker.js",
        path: path.join(__dirname, "dist")
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/
          }
        ]
      }
    }
  ]
}
