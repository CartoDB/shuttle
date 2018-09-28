module.exports = {
  configureWebpack: {
    module: {
      rules: [
        { test: /\.template\.(html|code)$/, use: 'raw-loader' }
      ]
    }
  }
};
