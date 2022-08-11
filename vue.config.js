const path = require('path');
const Component = require('unplugin-vue-components/webpack');
const TerserPlugin = require('terser-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const resolve = (dir) => path.resolve(__dirname, dir);

const git = new GitRevisionPlugin();
const version = { BRANCH: git.branch(), VERSION: git.version(), COMMITHASH: git.commithash(), TIME: Date() };

isProd && fs.writeFile('./public/version', JSON.stringify(version), (err) => err && console.log('err', err));

const quicks = [
  { key: '@', value: 'src' },
  { key: 'utils', value: 'src/utils' },
  { key: 'store', value: 'src/store' },
  { key: 'views', value: 'src/views' },
  { key: 'assets', value: 'src/assets' },
  { key: 'router', value: 'src/router' },
  { key: 'styles', value: 'src/styles' },
  { key: 'request', value: 'src/request' },
  { key: 'components', value: 'src/components' },
];

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
  chainWebpack: (config) => {
    quicks.forEach(({ key, value }) => config.resolve.alias.set(key, resolve(value)));
  },
  configureWebpack: {
    plugins: [
      Component({
        dirs: ['src/components'],
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
