const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://raid2earn.ducksvegas.com/',
      changeOrigin: true,
    })
  );
};