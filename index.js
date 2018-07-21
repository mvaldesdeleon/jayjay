const JAYJAY_KEY = '__J__a__Y__j__A__y__';

module.exports = function(options = {}) {
    const isObject = value => typeof value === 'object';
    const isArray = value => value instanceof Array;
    const objectMap = (object, map) => Object.entries(object).reduce((object, [key, value]) => (object[key] = map(value), object), {});

    const wrap = (name, value) => ({[JAYJAY_KEY]: name, value});
    const unwrap = input => ({name: input[JAYJAY_KEY], value: input.value});

    const rules = options.rules || [];
    const rulesMap = {};

    for (let rule of rules) rulesMap[rule.name] = rule;

    function matchEncode(input) {
        for (let rule of rules) {
            const { name, encode, condition } = rule;

            if (condition(input)) {
                return { name, encode };
            }
        }

        return {};
    }

    function matchDecode(name) {
        const rule = rulesMap[name];

        if (rule) return { name, decode: rule.decode };
        else return {};
    }

    function encode(input) {
        if (isArray(input)) {
            return input.map(encode);
        } else if (isObject(input)) {
            const { name, encode: transform } = matchEncode(input);

            if (name) return wrap(name, transform(input, encode));
            else return objectMap(input, encode);
        } else {
            const { name, encode: transform } = matchEncode(input);

            if (name) return wrap(name, transform(input, encode));
            return input;
        }
    }

    function decode(input) {
        if (isArray(input)) {
            return input.map(decode);
        } else if (isObject(input)) {
            const { name, value } = unwrap(input);

            if (name) {
                const { decode: transform } = matchDecode(name);

                return transform(value);
            } else {
                return objectMap(input, decode);
            }
        } else {
            return input;
        }
    }

    return {
        encode,
        decode
    };
};
