module.exports = {
  "lintOnSave": false,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {   //这里解决开发环境的跨域问题， 生产环境的跨域问题需要再nginx服务器解决
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 http://localhost:8088/
        target: 'http://localhost:8088/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}