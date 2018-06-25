// <https://lacke.mn/reduce-your-bundle-js-file-size/>
// // <https://github.com/lodash/babel-plugin-lodash/issues/221>
const isError = require('lodash/isError');
const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');
const pick = require('lodash/pick');
const isFunction = require('lodash/isFunction');

// we want to support parsing other fields than the standard:
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors>
// <https://github.com/stripe/stripe-node/blob/3c07d851cf897490d8b93dd4457dda0c4c8e667f/lib/Error.js#L33>
const parseErr = (err, fields = []) => {
  if (!isError(err)) throw new Error('`err` must be an Error');
  if (!isArray(fields)) throw new Error('`fields` must be an Array');

  const keys = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(err))
    .concat(Object.getOwnPropertyNames(err))
    .forEach(key => {
      if (!isFunction(err[key])) keys[key] = err[key];
    });

  if (!keys.name && err.constructor.name) keys.name = err.constructor.name;

  return isArray(fields) && !isEmpty(fields) ? pick(keys, fields) : keys;
};

module.exports = parseErr;
