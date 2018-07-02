const { connect, disconnect } = require('../db');
const Gengo = require('../models/gengo');

connect()
  .then(({ dbName }) => console.log(`Connecting '${dbName}', exec...`))
  .then(() => Gengo.remove())
  .then(() => console.log('Purge Gengo collection'))
  .then(() => Gengo.importFromFile())
  .then(() => console.log('Import completed'))
  .then(() => disconnect())
  .catch(err => console.error(err));
