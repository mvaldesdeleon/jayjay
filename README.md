# jayjay

Encodes JavaScript values as JavaScript values.

# Use

```
const jayjay = require('jayjay');
```

## **jayjay(opts)**

Creates a new encoder/decoder

Available `opts` are:

* `opts.rules` array of rules to use

Rules are objects with the following members:

* `name` string, should be unique within the `rules` array
* `condition` fn(value) -> boolean, checks if the rule applies
* `encode` fn(value) -> \*, encodes the value
* `decode` fn(\*) -> value, decodes the value

Returns an object with two members:

* `encode` fn(\*) -> \*, encodes javascript values into javascript values
* `decode` fn(\*) -> \*, decodes javascript values into javasctipt values

# Examples

See `test.js` to get started.

# Install
With [npm](https://npmjs.org) do:

```
npm install jayjay
```

# License

MIT
