const jp = require('japanese');

const initialOfYomi = yomi => jp.romanize(yomi).slice(0, 1);

module.exports = initialOfYomi;
