declare module 'jayjay' {
    interface Rule {
        name: string,
        condition: (any) => boolean,
        encode: (any) => any,
        decode: (any) => any
    }

    interface JayJay {
        encode: (any) => any,
        decode: (any) => any
    }

    function jayjay(options: Rule[]): JayJay;

    export = jayjay;
}
