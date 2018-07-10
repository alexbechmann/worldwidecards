const path = require('path');

module.exports = {
  webpack: (config, env) => {
    config.resolve.alias.src = path.resolve(__dirname, './src/');
    config.module.rules.push({
      test: /\.(tsx|ts)?$/,
      loader: 'prettier-loader',
      exclude: /node_modules/,
    })
    return config;
  },
  jest: (config) => {
    config.modulePaths = ['src/'];
    return config;
  }
}