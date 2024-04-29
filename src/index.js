const webserver = require('./app');
require('dotenv').config();

webserver
  .listen(process.env.PORT || 80)
  .then((socket) => console.log('Webserver started on http://localhost:80'))
  .catch((error) => console.log('Failed to start webserver on http://localhost:80'));
