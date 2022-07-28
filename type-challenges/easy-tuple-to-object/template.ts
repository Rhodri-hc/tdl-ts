// type TupleToObject<T extends readonly any[]> = any

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
    [P in T[number]] : P
}

// 1. 返回一个对象
// 2. 遍历 array  T[number]