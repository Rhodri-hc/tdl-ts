/**
 * 简易的 Lisp 解释器主要分成两个步骤：
 *  1、解释器 -- 将字符串解析成抽象语法树（AST）
 *     1、词法分析 -- 将字符串解析成一个 Token 数组（可以理解成分解成独立的单词）
 *     2、语法分析 -- 将上面的 Token 数组经过解析生成抽象语法树（AST）
 *  2、求值器 -- 对抽象语法树进行求值得到最后的结果
 *     1、指令
 *        a、声明变量
 *        b、声明函数
 *     2、求值
 *        a、基本运算表达式求值，如: +、-、==、!=
 *        b、条件表达式求值：if
 *        c、函数调用表达式求值，如：（acc 3）
 */

/**
 *  extends 与分支条件
 *  extends 在做运算的时候主要是两个用途：
 *  1、<值> extends <值> ? :  判断两个值是否相等，可以类比 JavaScript 的 <值> === <值> ?:
 *  2、<值> extends <类型> ? : 判断一个值是否属于某个类型，可以类比成 typeof <值> === <类型> ? :
 */

 type Func<T> =
    T extends string 
    ? (
        T extends 'foo' 
           ? 'is string foo'
           : T extends 'bar' 
                ? 'is string bar'
                : 'unexpected string value'
      )
    : T extends number 
        ? (
              T extends 0 
                ? 'is number 0'
                : T extends 1 
                    ? 'is number 1'
                    : 'unexpected number value'
          )
        : 'unexpected value type';


/**
 * 变量声明
 *  1、通过 type T = ... 声明全局变量（ts 文件作用域）
 *  2、通过 A extends infer B 声明局部变量，可以类比纯函数式语言里面的 let B = A in xxx。
 */

 type A = 'hello'; // 声明全局变量
 type B = [A] extends infer T ? (
     T // => 在这个表达式的作用域内，T 都为 [A]
 ) : never  // 声明局部变量


 /**
  * 函数声明与调用
  *   把 TypeScript 的泛型当做函数声明和调用，可以类比 JavaScript 的函数声明
  * 
  */

  type Func1<A extends number, B extends string = 'hello'> = [A, B]
  //     ↑   ↑           ↑     ↑           ↑        ↑           ↑
  // 函数名 参数名    参数类型  参数名       参数类型  默认值      函数体
  type Test = Func1<10, 'world'> // => [10, 'world']
  
//   function Func(A: number, B: string = 'hello') { return [A, B] }
//   const Test = Func(10, 'world') // => [10, 'world']


/**
 * 模式匹配
 * 
 * 我们都知道 extends 后面可以接一个 infer 用来提取变量，一般我们会把跟 JavaScript 的解构拿来做类比，
 * 事实上这个能力叫做模式匹配，他会先做我们上面说的集合的运算，之后结果能匹配才会将里面的结构拆解出来。
 * 
 * 
 * 通过构造一个带类型的新结构来避免 infer 变量的类型丢失
 */
 type OnlyNumber<N extends number> = N;
 type Tmp<A extends number> = { a: A };
 type Test0 = { a: 10 } extends Tmp<infer A> // infer A 只能是 number 类型
     ? OnlyNumber<A> // 不报错
     : never;

