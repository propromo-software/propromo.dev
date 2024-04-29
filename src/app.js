const HyperExpress = require('hyper-express');
const webserver = new HyperExpress.Server();

const herokuRouter = require('./v1/heroku');
const assetRouter = require('./assets');
const {homeHTML, herokuRouteRoot} = require('./routes.js');

webserver.get('/', (request, response) => {
    response.html(homeHTML);
})

webserver.use(herokuRouteRoot, herokuRouter);
webserver.use('', assetRouter);

module.exports = webserver;
