// type Length<T> = any

type Length<T extends readonly any[]> = T['length']