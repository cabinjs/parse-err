const isError = require('iserror');

// We want to support parsing other fields than the standard:
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors>
// <https://github.com/stripe/stripe-node/blob/3c07d851cf897490d8b93dd4457dda0c4c8e667f/lib/Error.js#L33>
const parseErr = (err, fields = []) => {
  if (!isError(err)) {
    throw new Error('`err` must be an Error');
  }

  if (!Array.isArray(fields)) {
    throw new TypeError('`fields` must be an Array');
  }

  const keys = {};
  const arr = new Set([
    ...Object.getOwnPropertyNames(Object.getPrototypeOf(err)),
    ...Object.getOwnPropertyNames(err)
  ]);
  for (const key of arr) {
    if (typeof err[key] !== 'function') {
      keys[key] = err[key];
    }
  }

  if (!keys.name && err.constructor.name) {
    keys.name = err.constructor.name;
  }

  //
  // recursively call parseErr on err.errors if they are errors
  // this is a common approach to combine multiple errors into one error
  // and then add a property called `errors` to the err object with the array of errors
  // (e.g. packages such as `combine-errors` and `maybe-combine-errors` use this approach)
  //
  if (Array.isArray(err.errors)) {
    keys.errors = err.errors.map((e) => {
      if (isError(e)) {
        return parseErr(e, fields);
      }

      return e;
    });
  }

  return Array.isArray(fields) && fields.length > 0
    ? keys.filter((key) => fields.includes(key))
    : keys;
};

module.exports = parseErr;
