const test = require('tape');
const jayjay = require('./index.js');

const R = {
    NULL: {
        name: 'null',
        condition: value => value === null,
        encode: () => 'null',
        decode: () => null
    },
    UNDEFINED: {
        name: 'undefined',
        condition: value => value === undefined,
        encode: () => 'undefined',
        decode: () => undefined
    },
    DATE: {
        name: 'date',
        condition: value => value instanceof Date,
        encode: value => value.getTime(),
        decode: value => new Date(value)
    }
};

const { encode, decode } = jayjay({rules: [R.NULL, R.UNDEFINED, R.DATE]});

test('null', t => {
    const input = null;
    const output = decode(encode(input));

    t.equal(output === null, true, 'output is null');
    t.end();
});

test('undefined', t => {
    const input = undefined;
    const output = decode(encode(input));

    t.equal(output === undefined, true, 'output is undefined');
    t.end();
});

test('date', t => {
    const input = new Date();
    const output = decode(encode(input));

    t.equal(output instanceof Date, true, 'output is a date');
    t.equal(output.getTime(), input.getTime(), 'output is same date as input');
    t.end();
});

test('infinity', t => {
    t.test('plus', t => {
        const input = Infinity;
        const output = decode(encode(input));

        t.equal(output === Infinity, true, 'output is plus infinity');
        t.end();
    });

    t.test('minus', t => {
        const input = -Infinity;
        const output = decode(encode(input));

        t.equal(output === -Infinity, true, 'output is minus infinity');
        t.end();
    });
});

test('nan', t => {
    const input = NaN;
    const output = decode(encode(input));

    t.equal(isNaN(output), true, 'output is nan');
    t.end();
});

test('boolean', t => {
    t.test('true', t => {
        const input = true;
        const output = decode(encode(input));

        t.equal(output === true, true, 'output is true');
        t.end();
    });

    t.test('false', t => {
        const input = false;
        const output = decode(encode(input));

        t.equal(output === false, true, 'output is false');
        t.end();
    });
});

test('array', t => {
    const input = [null, undefined, new Date()];
    const output = decode(encode(input));

    t.equal(output instanceof Array, true, 'output is array');
    t.equal(output[0] === null, true, 'output preserves null');
    t.equal(output[1] === undefined, true, 'output preserves undefined');
    t.equal(output[2] instanceof Date, true, 'output preserves date');
    t.equal(output[2].getTime(), input[2].getTime(), 'output preserves date');
    t.end();
});

test('object', t => {
    const input = {null: null, undefined: undefined, date: new Date()};
    const output = decode(encode(input));

    t.equal(typeof output  === 'object', true, 'output is object');
    t.equal(output.null === null, true, 'output preserves null');
    t.equal(output.undefined === undefined, true, 'output preserves undefined');
    t.equal(output.date instanceof Date, true, 'output preserves date');
    t.equal(output.date.getTime(), input.date.getTime(), 'output preserves date');
    t.end();
});

test('deep', t => {
    const input = {
        outter: [{
            inner: [{null: null, undefined: undefined, date: new Date()}]
        }]
    };
    const output = decode(encode(input));

    t.equal(typeof output  === 'object', true, 'output is object');
    t.equal(output.outter[0].inner[0].null === null, true, 'output preserves null');
    t.equal(output.outter[0].inner[0].undefined === undefined, true, 'output preserves undefined');
    t.equal(output.outter[0].inner[0].date instanceof Date, true, 'output preserves date');
    t.equal(output.outter[0].inner[0].date.getTime(), input.outter[0].inner[0].date.getTime(), 'output preserves date');
    t.end();
});
