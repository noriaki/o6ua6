const mongoose = require('mongoose');
require('mongoose-query-random');

/* eslint-disable no-underscore-dangle */
mongoose.Query.prototype.__random = mongoose.Query.prototype.random;
const defailtOptions = { limit: 1, excepts: [], unique: true };
const random = function findRandom({ limit, excepts, unique } = {}) {
  const query = this;
  const fLimit = limit === undefined ? defailtOptions.limit : limit;
  const fExcepts = excepts === undefined ? defailtOptions.excepts : excepts;
  const fUnique = unique === undefined ? defailtOptions.unique : unique;
  return new Promise((resolve, reject) => {
    const callback = (err, docs) => (err ? reject(err) : resolve(docs));
    if (fExcepts.length === 0) {
      query.where().__random(fLimit, fUnique, callback);
    } else {
      query
        .where('identifier').nin(fExcepts)
        .__random(fLimit, fUnique, callback);
    }
  });
};
/* eslint-enable no-underscore-dangle */
module.exports = random;
