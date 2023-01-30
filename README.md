# parse-err

[![build status](https://github.com/cabinjs/parse-err/actions/workflows/ci.yml/badge.svg)](https://github.com/cabinjs/parse-err/actions/workflows/ci.yml)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/cabinjs/parse-err.svg)](LICENSE)

> Parse errors to provide a consistent metadata object across Browser and Node environments. Made for [Cabin][].


## Table of Contents

* [Install](#install)
* [How does it work](#how-does-it-work)
* [Usage](#usage)
  * [Node](#node)
  * [VanillaJS](#vanillajs)
  * [Bundler](#bundler)
* [Supported Platforms](#supported-platforms)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install parse-err
```


## How does it work

This package exports a function that accepts two arguments `(err, props)`.

* `req` (Object) - an HTTP request
* `props` (Array) - a list of properties to cherry-pick from the error object parsed out of `err` (by default all properties are returned; even non-enumerable ones and ones on the prototype object)

This function iterates over the prototype of the error and the error itself to get all non-Function properties and returns these properties as an object.

Normally if you `console.log(err)` it will not show you all fields such as `type`, `statusCode`, or `code` (e.g. [if you're using Stripe][stripe-error]).

In our case, we wanted to store these properties in our logs with [Cabin][].

**As of v1.0.0 it now parses `err.errors` Array too – which adds support for packages such as [maybe-combine-errors][] and [combine-errors][].  This is useful if you combine multiple errors into one Error object, and subsequently set a property of `err.errors = errors` where `errors` is an Array of the errors combined.**


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
{ name: 'BeepBoop',
  message: 'Oops!',
  stack: 'BeepBoop: Oops!\n    at Object.<anonymous> (/Users/user/Projects/parse-err/test.js:3:13)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)\n    at Function.Module.runMain (module.js:693:10)\n    at startup (bootstrap_node.js:188:16)\n    at bootstrap_node.js:609:3',
  code: 100,
  statusCode: 200 }
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

### Bundler

If you are using [browserify][], [webpack][], [rollup][], or another bundler, then you can follow the same usage as [Node](#node) above.


## Supported Platforms

* Node: v6.x+
* Browsers (see [.browserslistrc](.browserslistrc)):

  ```sh
  npx browserslist
  ```

  ```sh
  and_chr 107
  and_ff 106
  and_qq 13.1
  and_uc 13.4
  android 107
  chrome 107
  chrome 106
  chrome 105
  edge 107
  edge 106
  edge 105
  firefox 107
  firefox 106
  firefox 105
  firefox 102
  ios_saf 16.1
  ios_saf 16.0
  ios_saf 15.6
  ios_saf 15.5
  ios_saf 14.5-14.8
  kaios 2.5
  op_mini all
  op_mob 72
  opera 92
  opera 91
  safari 16.1
  safari 16.0
  safari 15.6
  samsung 19.0
  samsung 18.0
  ```


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


##

[npm]: https://www.npmjs.com/

[stripe-error]: https://github.com/stripe/stripe-node/blob/3c07d851cf897490d8b93dd4457dda0c4c8e667f/lib/Error.js#L33-L45

[cabin]: https://cabinjs.com

[maybe-combine-errors]: https://www.npmjs.com/package/maybe-combine-errors

[combine-errors]: https://www.npmjs.com/package/combine-errors

[browserify]: https://github.com/browserify/browserify

[webpack]: https://github.com/webpack/webpack

[rollup]: https://github.com/rollup/rollup
