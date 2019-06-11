const isError = require('iserror');

// we want to support parsing other fields than the standard:
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors>
// <https://github.com/stripe/stripe-node/blob/3c07d851cf897490d8b93dd4457dda0c4c8e667f/lib/Error.js#L33>
const parseErr = (err, fields = []) => {
  if (!isError(err)) throw new Error('`err` must be an Error');
  if (!Array.isArray(fields)) throw new Error('`fields` must be an Array');

  const keys = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(err))
    .concat(Object.getOwnPropertyNames(err))
    .forEach(key => {
      if (typeof err[key] !== 'function') keys[key] = err[key];
    });

  if (!keys.name && err.constructor.name) keys.name = err.constructor.name;

  return Array.isArray(fields) && fields.length !== 0
    ? keys.filter(key => fields.indexOf(key) !== -1)
    : keys;
};

module.exports = parseErr;
