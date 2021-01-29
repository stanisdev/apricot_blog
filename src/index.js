'use strict';

const App = require('./services/app');
const config = require('./config');

(async () => {
  const app = new App(config);
  await app.build();
  await app.listen();
})();