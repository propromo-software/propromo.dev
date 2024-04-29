import HyperExpress from 'hyper-express';
export const webserver = new HyperExpress.Server();

// Create GET route to serve 'Hello World'
webserver.get('/', (request, response) => {
    response.send('Hello World');
})

// Activate webserver by calling .listen(port, callback);
webserver
  .listen(80)
  .then((socket) => console.log('Webserver started on port 80'))
  .catch((error) => console.log('Failed to start webserver on port 80'));
