declare module 'jayjay' {
    interface JayJayOptions {
        rules: JayJayRule[]
    }

    interface JayJayRule {
        name: string,
        condition: (input: any) => boolean,
        encode: (input: any) => any,
        decode: (input: any) => any
    }

    interface JayJay {
        encode: (input: any) => any,
        decode: (input: any) => any
    }

    function jayjay(options: JayJayOptions): JayJay;

    export = jayjay;
}
