const mongoose = require('mongoose');

const connect = async ({ env } = { env: process.env.NODE_ENV }) => {
  let uri;
  if (process.env.MONGODB_URI) {
    uri = process.env.MONGODB_URI;
  } else {
    if (env === undefined) {
      throw new Error('Cannot resolve dbName, NODE_ENV not defined');
    }
    const map = { development: '_dev', test: '_test', production: '' };
    const dbName = `o6ua6_next${map[env]}`;
    uri = `mongodb://localhost:27017/${dbName}`;
  }
  mongoose.Promise = Promise;
  await mongoose.connect(uri);
  mongoose.connection.on(
    'error', console.error.bind(console, 'mongodb connection error:')
  );
  return { mongoose, dbName: mongoose.connection.name };
};

const disconnect = () => mongoose.disconnect();

module.exports = {
  connect,
  disconnect,
};
