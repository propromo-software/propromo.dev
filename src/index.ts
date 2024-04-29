
import { webserver } from "./app";

// Activate webserver by calling .listen(port, callback);
webserver
  .listen(80)
  .then((socket) => console.log('Webserver started on port 80'))
  .catch((error) => console.log('Failed to start webserver on port 80'));
