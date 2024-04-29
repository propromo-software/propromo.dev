import HyperExpress from 'hyper-express';
export const webserver = new HyperExpress.Server();

// Create GET route to serve 'Hello World'
webserver.get('/', (request, response) => {
    response.send('Hello World');
})
