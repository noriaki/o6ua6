const identifier = str => (
  encodeURIComponent(str)
    .replace(/%/g, '')
    .toLowerCase()
    .split('')
    .reverse()
    .join('')
);

module.exports = identifier;
