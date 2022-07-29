import type { Equal } from '@type-challenges/utils'


export type Includes<T extends readonly any[], U> 
            = T extends [infer First, ...infer Rest] 
              ? Equal<First, U> extends true 
                    ? true
                    : Includes<Rest, U>
              : false


// 知识点
// 1. 用递归实现遍历数组
// 2. ts 的模块规范
//    - 如果有 export/import 的话，那么就是模块
//    - 没有的话，那么就是全局的 ，可以直接在别的模块引用