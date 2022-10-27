/**
 * 通过数组操作实现 数值的基本操作加减乘除
 * 
 */

// 基本运算
type _NArray<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _NArray<T, N, [T, ...R]>

export type NArray<T, N extends number> = N extends N 
                                            ? (number extends N ? T[] : _NArray<T, N, []>)
                                            : never;

type NArrayNumber<L extends number> = NArray<number, L>;


/**
* @desc 加法
* @author 张和潮
* @date 2022年10月27日 09:32:48
*/
export type Add<M extends number, N extends number> = [...NArrayNumber<M>, ...NArrayNumber<N>]['length'];

/**
* @desc 减法
* @author 张和潮
* @date 2022年10月27日 09:48:39
*/
export type Subtract<M extends number, N extends number> = 
    NArrayNumber<M> extends [...x: NArrayNumber<N>, ...rest: infer R] ? R['length'] : unknown;


// 主要用于辅助推导乘除法; 否则会因为 Subtract 返回类型为 number | unknown 报错
type _Subtract<M extends number, N extends number> =
    NArrayNumber<M> extends [...x: NArrayNumber<N>, ...rest: infer R] ? R['length'] : -1


/**
* @desc 乘法
* @author 张和潮
* @date 2022年10月27日 09:52:51
*/
type _Multiply<M extends number, N extends number, res extends unknown[]> =
    N extends 0 ? res['length'] : _Multiply<M, _Subtract<N, 1>, [...NArray<number, M>, ...res]>
export type Multiply<M extends number, N extends number> = _Multiply<M, N, []>


/**
* @desc 除法
* @author 张和潮
* @date 2022年10月27日 09:52:55
*/
type _DivideBy<M extends number, N extends number, res extends unknown[]> =
    M extends 0 ? res["length"] : _Subtract<M, N> extends -1 ? unknown : _DivideBy<_Subtract<M, N>, N, [unknown, ...res]>
export type DividedBy<M extends number, N extends number> = N extends 0 ? unknown : _DivideBy<M, N, []>;