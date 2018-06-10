const mongoose = require('mongoose');
const { yomiSchema } = require('./yomi');
const Rating = require('./rating');
const identifier = require('./concerns/identifier');

const { Schema } = mongoose;
const { ratingSchema } = Rating;

const gengoSchema = new Schema({
  identifier: { type: String, required: true, unique: true },
  surface: { type: String, required: true, unique: true },
  yomi: [yomiSchema],
  rating: { type: ratingSchema, default: () => new Rating() },
});

gengoSchema.pre('validate', function setIdentifier(next) {
  this.identifier = identifier(this.surface);
  next();
});

const Gengo = mongoose.model('Gengo', gengoSchema);
Gengo.gengoSchema = gengoSchema;

module.exports = Gengo;