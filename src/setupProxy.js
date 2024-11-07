const { createProxyMiddleware } = require('http-proxy-middleware');

//source https://dev.to/codeofrelevancy/how-to-set-up-a-proxy-server-in-react-dealing-with-cors-87e
//https://stackoverflow.com/questions/31394043/rewriting-path-with-http-proxy-middleware
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://anwendungen.pharmnet-bund.de',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/lieferengpassmeldungen'
      }
    })
  );
};