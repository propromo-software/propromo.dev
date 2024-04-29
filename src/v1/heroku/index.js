const HyperExpress = require('hyper-express');
const herokuRouter = new HyperExpress.Router();
const Heroku = require('./heroku');
require('dotenv').config();

herokuRouter.get('/drop-and-create-tables', async (request, response) => {
  const passphrase = request?.headers?.authorization?.split('Bearer ')[1] ?? '';

  const validPassphrase = process.env.DEV_ACCESS_PASSPHRASE === passphrase;

  if (!validPassphrase) {
    response.status(401);
    response.send('Unauthorized');
    return;
  }

  const result = await Heroku.dropAndCreateTables();
  response.status(200);
  response.send(result);
  return;
})

module.exports = herokuRouter;
