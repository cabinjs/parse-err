const test = require('ava');

const parseErr = require('..');

class CustomError extends Error {
  constructor(...params) {
    super(params);
    Error.captureStackTrace(this, CustomError);
    Object.defineProperty(this, 'foo', {
      value: 'beep',
      enumerable: false
    });
  }
}

test('basic', t => {
  const customError = new CustomError();
  t.is(parseErr(customError).foo, 'beep');
});
