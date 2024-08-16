// See https://github.com/typicode/json-server#module
import jsonServer from 'json-server';   
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// URL Rewriting Rules
server.use(
  jsonServer.rewriter({
    '/api/products': '/products',
    '/api/cart': '/cart',
    '/blog/:resource/:id/show': '/:resource/:id'
  })
);

// Use default router
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});


// Export the Server API
export default server;