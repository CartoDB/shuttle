module.exports = {
  configureWebpack: {
    module: {
      rules: [
        { test: /\.template\.(html|js)$/, use: 'raw-loader' }
      ]
    }
  }
};
