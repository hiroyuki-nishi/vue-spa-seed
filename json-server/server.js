const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});

router.render = (req, res) => {
  // ステータスコードを設定
  res.status(500).jsonp({
    error: "PUI PUI"
  });
}
