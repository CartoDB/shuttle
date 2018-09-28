module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/shuttle/' : '/',
  outputDir: 'docs',
  configureWebpack: {
    module: {
      rules: [
        { test: /\.template\.(html|code)$/, use: 'raw-loader' }
      ]
    }
  }
};
