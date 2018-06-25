# parse-err

[![build status](https://img.shields.io/travis/niftylettuce/parse-err.svg)](https://travis-ci.org/niftylettuce/parse-err)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/parse-err.svg)](https://codecov.io/gh/niftylettuce/parse-err)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/niftylettuce/parse-err.svg)](LICENSE)

> Parse errors to provide a consistent metadata object across Browser and Node environments. Made for [Cabin][].


## Table of Contents

* [Install](#install)
* [How does it work](#how-does-it-work)
* [Usage](#usage)
  * [Node](#node)
  * [VanillaJS](#vanillajs)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install parse-err
```

[yarn][]:

```sh
yarn add parse-err
```


## How does it work

This package exports a function that accepts two arguments `(err, props)`.

* `req` (Object) - an HTTP request
* `props` (Array) - a list of properties to cherry-pick from the error object parsed out of `err` (by default all properties are returned; even non-enumerable ones and ones on the prototype object)

This function iterates over the prototype of the error and the error itself to get all non-Function properties and returns these properties as an object.

Normally if you `console.log(err)` it will not show you all fields such as `type`, `statusCode`, or `code` (e.g. [if you're using Stripe][stripe-error]).

In our case, we wanted to store these properties in our logs with [Cabin][].


## Usage

### Node

```js
const parseErr = require('parse-err');

const err = new Error('Oops!');

// just a random example
err.name = 'BeepBoop';
err.code = 100;
err.statusCode = 200;

console.error(parseErr(err));
```

```sh

```

### VanillaJS

```html
<script src="https://unpkg.com/parse-err"></script>
<script type="text/javascript">
  (function() {
    var err = new Error('Oops!');
    err.name = 'BeepBoop';
    err.statusCode = 500;
    console.error(parseErr(err));
  })();
</script>
```


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[stripe-error]: https://github.com/stripe/stripe-node/blob/3c07d851cf897490d8b93dd4457dda0c4c8e667f/lib/Error.js#L33-L45

[cabin]: https://cabinjs.com
