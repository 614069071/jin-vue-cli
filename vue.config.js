const path = require("path");
const Component = require("unplugin-vue-components/webpack");
const TerserPlugin = require("terser-webpack-plugin");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    // proxy: {
    //   "/": {
    //     target: "https://openapi.ttnss.com/",
    //     changeOrigin: true,
    //     pathRewrite: { "^/": "" },
    //     secure: false,
    //   },
    // },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("utils", resolve("src/utils"))
      .set("store", resolve("src/store"))
      .set("views", resolve("src/views"))
      .set("router", resolve("src/router"))
      .set("styles", resolve("src/styles"))
      .set("request", resolve("src/request"))
      .set("components", resolve("src/components"));
  },
  configureWebpack: {
    plugins: [
      Component({
        dirs: ["src/components"],
        // dts: "src/types/vue-components.d.ts",
        directoryAsNamespace: true,
      }),
      // new CompressionPlugin({
      //   algorithm: "gzip",
      //   test: /\.js$|\.css$|\.html$/,
      //   filename: "[path][base].gz",
      //   minRatio: 0.8,
      //   threshold: 10240,
      //   deleteOriginalAssets: false,
      // }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: false,
            },
          },
        }),
      ],
    },
  },
};
