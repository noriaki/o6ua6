const mongoose = require('mongoose');

const { Schema } = mongoose;

const yomiSchema = new Schema({
  name: String,
  initial: String,
  votingCount: Number,
});

const Yomi = mongoose.model('Yomi', yomiSchema);
Yomi.yomiSchema = yomiSchema;

module.exports = Yomi;
