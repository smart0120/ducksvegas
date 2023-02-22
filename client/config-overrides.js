const { ProvidePlugin } = require('webpack');

module.exports = function(config, env) {
  config.resolve.fallback = {
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    // "crypto-browserify": require.resolve("crypto-browserify"),
    "crypto": require.resolve("crypto-browserify")
  };
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.m?[jt]sx?$/,
          enforce: "pre",
          use: ["source-map-loader"]
        },
        {
          test: /\.m?[jt]sx?$/,
          resolve: {
            fullySpecified: false
          }
        }
      ]
    },
    plugins: [
      ...config.plugins,
      new ProvidePlugin({
        process: "process/browser"
      })
    ],
    ignoreWarnings: [/Failed to parse source map/]
  };
};
