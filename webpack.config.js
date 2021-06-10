const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

const src = path.resolve(__dirname, "src");

module.exports = {
  entry: path.resolve(src, "index.ts"),
  output: {
    filename: "index.js",
    publicPath: "/",
    library: "react-promised-state",
    libraryTarget: "commonjs",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["ts", "tsx", "js", "jsx"],
      exclude: ["node_modules", "webpack.config.js", "dist", ".vscode"],
    }),
  ],
};
