// type First<T extends any[]> = any

// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
// type First<T extends any[]> = T extends [infer First, ...infer Rest] ? First : never
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]



// 知识点
// 1. extends 类型条件判断
// 2. 获取 tuple 的 length 属性  indexed
// 3. extends union  判断的规则
// 4. inter 的使用(推断)