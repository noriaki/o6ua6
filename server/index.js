const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const glob = require('glob');
const nextApp = require('next');
const { resolve } = require('path');

const { connect } = require('./db');

const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = nextApp({ dev });
const defaultRequestHandler = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

// connect -> db(mongo)
app.prepare().then(() => connect()).then(() => {
  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));
  // Parse application/json
  server.use(bodyParser.json());

  // Allows for cross origin domain request:
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  // API routes
  const rootPath = resolve('..');
  glob.sync(`${rootPath}/server/routes/*.js`)
  // eslint-disable-next-line import/no-dynamic-require, global-require
    .forEach(controllerPath => require(controllerPath)(server));

  // Next.js request handling
  const customRequestHandler = (page, req, res) => {
    // Both query and params will be available in getInitialProps({query})
    const mergedQuery = Object.assign({}, req.query, req.params);
    app.render(req, res, page, mergedQuery);
  };

  // Routes
  // server.get('/custom', customRequestHandler.bind(undefined, '/custom-page'));
  server.get('/', customRequestHandler.bind(undefined, '/'));
  server.get('*', defaultRequestHandler);

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(
      `> Ready [${dev ? 'DEV' : 'PROD'}] on http://localhost:${PORT}`
    );
  });
});
