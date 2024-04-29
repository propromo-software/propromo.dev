const HyperExpress = require('hyper-express');
const webserver = new HyperExpress.Server();
const herokuRouter = require('./v1/heroku');

webserver.get('/', (request, response) => {
    response.send('Development Server');
})

webserver.use('/v1/heroku', herokuRouter);

module.exports = webserver;
