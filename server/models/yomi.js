const mongoose = require('mongoose');

const initialOfYomi = require('./concerns/initialOfYomi');

const { Schema } = mongoose;

const yomiSchema = new Schema({
  name: { type: String, required: true, unique: true },
  initial: { type: String, required: true, unique: true },
  votingCount: {
    type: Number,
    default: 0,
  },
});

yomiSchema.pre('validate', function setInitial(next) {
  const nextInitial = initialOfYomi(this.name);
  if (this.initial !== nextInitial) { this.initial = nextInitial; }
  next();
});

const Yomi = mongoose.model('Yomi', yomiSchema);
Yomi.yomiSchema = yomiSchema;

module.exports = Yomi;
