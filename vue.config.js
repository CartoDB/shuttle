module.exports = {
  outputDir: 'docs',
  configureWebpack: {
    module: {
      rules: [
        { test: /\.template\.(html|code)$/, use: 'raw-loader' }
      ]
    }
  }
};
