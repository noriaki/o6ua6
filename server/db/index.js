const mongoose = require('mongoose');

const connect = async ({ env } = { env: process.env.NODE_ENV }) => {
  const map = { development: '_dev', test: '_test', production: '' };
  const LOCAL_MONGODB_URI = `mongodb://localhost:27017/o6ua6_next${map[env]}`;
  const dbName = process.env.MONGODB_URI || LOCAL_MONGODB_URI;
  mongoose.Promise = Promise;
  await mongoose.connect(dbName);
  mongoose.connection.on(
    'error', console.error.bind(console, 'mongodb connection error:')
  );
  return mongoose;
};

const disconnect = () => mongoose.disconnect();

module.exports = {
  connect,
  disconnect,
};
