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

test('basic', (t) => {
  const customError = new CustomError();
  t.is(parseErr(customError).foo, 'beep');
});

test('err.errors parsing', (t) => {
  const err = new Error('foo');
  const uhOh = new Error('uh oh');
  err.errors = ['beep', uhOh];
  t.deepEqual(parseErr(err), {
    name: 'Error',
    message: 'foo',
    stack: err.stack,
    errors: [
      'beep',
      {
        name: 'Error',
        message: 'uh oh',
        stack: uhOh.stack
      }
    ]
  });
});
