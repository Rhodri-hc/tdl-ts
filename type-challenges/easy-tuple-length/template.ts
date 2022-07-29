// type Length<T> = any

type Length<T extends readonly any[]> = T['length']

// tuple 类型即定长定长的数组