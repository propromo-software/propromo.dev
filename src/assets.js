const HyperExpress = require("hyper-express");
const assetRouter = new HyperExpress.Router();
const LiveDirectory = require("live-directory");
require('dotenv').config();

const assetPath = process.env.DEV_MODE === "true" ? "./src/static/" : "./build/static/";
const LiveAssets = new LiveDirectory(assetPath, {
  static: true,
  filter: {
    keep: {
      extensions: ["png"],
    },
    ignore: (path) => {
      return path.startsWith(".");
    },
  },

  cache: {
    max_file_count: 250,
    max_file_size: 1024 * 1024,
  },
});

assetRouter.get("/assets/*", (request, response) => {

  const path = request.path.replace("/assets/", "");
  const file = LiveAssets.get(path);

  if (file === undefined) return response.status(404).send();

  const fileParts = file.path.split(".");
  const extension = fileParts[fileParts.length - 1];

  const content = file.content;
  if (content instanceof Buffer) {
    return response.type(extension).send(content);
  }

  return response.type(extension).stream(content);
});

module.exports = assetRouter;
