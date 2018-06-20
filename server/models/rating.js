const mongoose = require('mongoose');

const { Schema } = mongoose;

const ratingSchema = new Schema({
  score: { type: Number, default: 1500 },
  rd: { type: Number, default: 200 },
  vol: { type: Number, default: 0.06 },
});

const Rating = mongoose.model('Rating', ratingSchema);
Rating.ratingSchema = ratingSchema;

module.exports = Rating;
