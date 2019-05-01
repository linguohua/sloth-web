// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/lobby': {
        target: 'http://localhost:4001/',
        changeOrigin: true
      }
    }
  }
}