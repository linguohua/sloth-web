// vue.config.js
module.exports = {
  publicPath:"/webax/",
  devServer: {
    proxy: {
      '/lobby': {
        target: 'http://localhost:4001/',
        changeOrigin: true
      }
    }
  }
}