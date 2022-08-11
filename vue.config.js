const path = require('path');
const Component = require('unplugin-vue-components/webpack');
const TerserPlugin = require('terser-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const resolve = (dir) => path.resolve(__dirname, dir);
const isProd = process.env.NODE_ENV === 'production';
const git = new GitRevisionPlugin();
const version = { BRANCH: git.branch(), VERSION: git.version(), COMMITHASH: git.commithash(), TIME: Date() };

isProd && fs.writeFile('./public/version', JSON.stringify(version), (err) => err && console.log('err', err));

const quicks = [
  { k: '@', v: 'src' },
  { k: 'utils', v: 'src/utils' },
  { k: 'store', v: 'src/store' },
  { k: 'views', v: 'src/views' },
  { k: 'assets', v: 'src/assets' },
  { k: 'router', v: 'src/router' },
  { k: 'styles', v: 'src/styles' },
  { k: 'request', v: 'src/request' },
  { k: 'components', v: 'src/components' },
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
    quicks.forEach(({ k, v }) => config.resolve.alias.set(k, resolve(v)));
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
