declare module 'jayjay' {
    interface JayJayOptions {
        rules: JayJayRule[]
    }

    interface JayJayRule {
        name: string,
        condition: (any) => boolean,
        encode: (any) => any,
        decode: (any) => any
    }

    interface JayJay {
        encode: (any) => any,
        decode: (any) => any
    }

    function jayjay(options: JayJayOptions): JayJay;

    export = jayjay;
}
