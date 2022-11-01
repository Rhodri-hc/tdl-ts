/**
 * typeof
 * 
 * typeof 操作符可以用来获取一个变量或对象的类型。
 */

 interface Person {
    name: string;
    age: number;
  }
  
  const hc: Person = { name: "rhodri", age: 30 };
  type Rho = typeof hc; // type Sem = Person

  const lolo: Rho  = { name: "lolo", age: 5 }


const kakuqo = {
    name: "kakuqo",
    age: 30,
    address: {
      province: '福建',
      city: '厦门'
    }
}

type Kakuqo = typeof kakuqo;
/*
 type Kakuqo = {
    name: string;
    age: number;
    address: {
        province: string;
        city: string;
    };
}
*/

/**
 * 可以用来获取函数对象的类型
 * 
 */

 function toArray(x: number): Array<number> {
    return [x];
  }
  
  type FuncType = typeof toArray; // -> (x: number) => number[]



/**
 * const 断言
 * 
 * 当我们使用 const 断言构造新的字面量表达式时，我们可以向编程语言发出以下信号：
 * 
 *  · 表达式中的任何字面量类型都不应该被扩展；
 *  · 对象字面量的属性，将使用 readonly 修饰；
 *  · 数组字面量将变成 readonly 元组。
 * 
 */

 let x = "hello" as const;
 type X = typeof x; // type X = "hello"
 
 let y = [10, 20] as const;
 type Y = typeof y; // type Y = readonly [10, 20]
 
 let z = { text: "hello" } as const;
 type Z = typeof z; // let z: { readonly text: "hello"; }

 type Data = typeof y[number]; // type Data = 10 | 20

 const locales = [
    {
      locale: "zh-CN",
      language: "中文"
    },
    {
      locale: "en",
      language: "English"
    }
  ] as const;
  
  // type Locale = "zh-CN" | "en"
  type Locale = typeof locales[number]["locale"];



  // 两个注意事项:
  // 1.const 断言只适用于简单的字面量表达式
  // let a = (Math.random() < 0.5 ? 0 : 1) as const; // error

  let b = Math.random() < 0.5 ? 0 as const :  1 as const;

  // 2.const 上下文不会立即将表达式转换为完全不可变

  let arr = [1, 2, 3, 4];

    let foo = {
        name: "foo",
        contents: arr,
    } as const;

    // foo.name = "bar";   // error!
    // foo.contents = [];  // error!

    foo.contents.push(5); // ...works!



    /**
     *  typeof 和 keyof 操作符
     * 
     *  typeof 操作符可以用来获取一个变量或对象的类型。而 keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
     * 
     */
      const COLORS = {
        red: 'red',
        blue: 'blue'
      }
      
      // 首先通过typeof操作符获取Colors变量的类型，然后通过keyof操作符获取该类型的所有键，
      // 即字符串字面量联合类型 'red' | 'blue'
      type Colors = keyof typeof COLORS
      let color: Colors;
      color = 'red'// Ok
      color = 'blue'// Ok
      
      // Type '"yellow"' is not assignable to type '"red" | "blue"'.
    //   color = 'yellow'// Error