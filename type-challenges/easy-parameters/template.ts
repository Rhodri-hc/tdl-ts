// type MyParameters<T extends (...args: any[]) => any> = any

type MyParameters<T extends (...args: any[]) => any> 
                = T extends ( ...args: infer P ) => any ? P : never;