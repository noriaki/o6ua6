const { join } = require('path');
const { readFileSync } = require('fs');
const mongoose = require('mongoose');
const { yomiSchema } = require('./yomi');
const Rating = require('./rating');

const identifier = require('./concerns/identifier');
const random = require('./concerns/findRandom');

const { Schema } = mongoose;
const { ratingSchema } = Rating;

const gengoSchema = new Schema({
  identifier: { type: String, required: true, unique: true },
  surface: { type: String, required: true, unique: true },
  yomi: [yomiSchema],
  rating: { type: ratingSchema, default: () => new Rating() },
});

gengoSchema.pre('validate', function setIdentifier(next) {
  const nextIdentifier = identifier(this.surface);
  if (this.identifier !== nextIdentifier) {
    this.identifier = nextIdentifier;
  }
  next();
});

const Gengo = mongoose.model('Gengo', gengoSchema);
Gengo.gengoSchema = gengoSchema;

// @async
Gengo.random = random;

// @async
Gengo.import = function importGengo(list = {}) {
  const gengos = Object.keys(list);
  const operations = gengos.map((surface) => {
    const yomis = list[surface];
    return {
      insertOne: {
        document: { surface, yomi: yomis.map(name => ({ name })) },
      },
    };
  });
  return this.bulkWrite(operations);
};
// @async
Gengo.importFromFile = function importGengoFromFile() {
  const filepath = join(__dirname, '..', '..', 'data', 'OnyomiGengoMap.json');
  const list = JSON.parse(readFileSync(filepath, 'utf8'));
  return this.import(list);
};

module.exports = Gengo;
