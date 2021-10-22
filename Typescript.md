# Typescript

## Intro

| words         | translation |
| ------------- | ----------- |
| workarounds   | 变通方法    |
| mitigation    | 减轻        |
| Inference     | 推论        |
| Literal       | 字面的      |
| Alias`ˈālēəs` | 别名        |
| Lint          | 可疑段落    |

<img src="/Users/xufei/Library/Application Support/typora-user-images/image-20211021211418067.png" alt="image-20211021211418067" style="zoom: 33%;" />

<img src="/Users/xufei/Library/Application Support/typora-user-images/image-20211021211921325.png" alt="image-20211021211921325" style="zoom: 33%;" />

+ avoid logical error

+ find potential error
+ complied to js

## Install

| **`sudo npm i -g typescript`**                          | **install ts**    |
| ------------------------------------------------------- | ----------------- |
| **`tsc test.ts`**                                       | **compile to js** |
| **`npx create-react-app my-app --template typescript`** | **react**         |
|                                                         |                   |

## Sample

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
    <!-- defer延迟执行不写报错 -->
  <script src="test.js" defer></script>
</head>
<body>
  <input type='number' id='num1' placeholder="Number 1" />
  <input type='number' id='num2' placeholder="Number 2" />
  <button>Add!</button>
</body>
</html>
```

```ts
const button = document.querySelector("button");
//!确保永远不为null
const input1 =  document.getElementById("num1")! as HTMLInputElement;
const input2 =  document.getElementById("num2")! as HTMLInputElement;

function add(num1:number, num2:number) {
  return num1+num2;
}

button.addEventListener('click',function(){
  console.log(add(+input1.value, +input2.value))
})
```

## Core Syntax & Features

### Core Types

TypeScript infers **types of variables when there is no explicit information available** in the form of type annotations

<img src="/Users/xufei/Library/Application Support/typora-user-images/image-20211021232125066.png" alt="image-20211021232125066" style="zoom:33%;" />

```ts
//enum自增, 默认从0开始，这里设置为2
enum Direction {
  Up = 2,
  Down,
  Left,
  Right
}

//ts core types
const person: {
  name: string,
  age: number,
  hobbies: string[],
  role: [number, string],//tuple
  direction: number
} = {
  name: 'sad',
  age: 30,
  hobbies: ['shooting', 'cookings', 'hiking'],
  role: [2, 'author'],
  direction: Direction.Up
}

//any[] or number[] 
let arr: string[];
let un: undefined;
arr = ['sports', 'cookings']
```

### Union & Literal Types

+ by using literal types you can allow an exact value which a string, number, or boolean must have.

```ts
function combine(
  a: number | string,
  b: number | string,
  resultType: 'as-num' | 'as-text' //literal types
) {
  let result;
  if (typeof a === 'number' && typeof b === 'number' || resultType === 'as-num') {
    return result = +a + +b;
  } else {
    return result = a.toString() + b.toString()
  }
}
console.log(combine(1, 2, 'as-num'));
console.log(combine('wocao', 2, 'as-text'));
console.log(combine('cao', 'ni', 'as-text'))
```

### Type Aliases

+ create a new name for a type. [primitives, unions, tuples, and any other types.]

```ts
type Combinable = {name:string};
type Combinable2 = string | number;
type Combinable3 ='as-num' | 'as-text'  
let newNum: Combinable2 = 2
```

### Function Types

+ return types: `void 表示没有任何类型,可以返回null和undefined`

```ts
function add(n1:number, n2:number):number {
  return n1+n2;
}
function printRes(n:number):void {
  console.log(n);
}
//integrated
function integrated(n1:number, func:(s:string)=>void) {
  const res = n1*2;
  func(res.toString())
}

integrated(1,(res)=>{console.log(res)});


//Function type
let caseFunc: Function;
let caseFunc2: ()=>number;//no parameters and return a number
let caseFunc3: (a:number,b:number)=>number;//2 parameters and return a number

caseFunc3 = add;
//caseFunc = 5;报错
//caseFunc2 = printRes;报错
```

### Unkown Type	

+ can't assign Unknown to any other type, (any) type can.
+ 一个从来不会有返回值的函数（如：如果函数内含有 `while(true) {}`）；
+ 一个总是会抛出错误的函数（如：`function foo() { throw new Error('Not Implemented') }`，`foo` 的返回类型是 `never`）；

```ts
//比any好，确保用用户再赋值后检查一遍，安全返回值
let userInput: unknown;
let userName: string;
if (typeof userInput==='string'){
  userName = userInput
}
```

### Never Type	

+ The `never` type represents the type of values that never occur.For instance, `never` is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns. 

+  [void never return a value]

  ```ts
  // Function returning never must not have a reachable end point
  function error(message: string): never {
    throw new Error(message);
  }
  ```

## Compiler

| **`tsc test.ts -w`** | **watch mode single file** |
| -------------------- | -------------------------- |
| **`tsc --init`**     | **tsc initial**            |
| **`tsc`**            | **compile all**            |
| **`tsc -w `**        | **watch mode project**     |

### Tsconfig

+ Exclude: tsc will not complie. support RegExp
+ Include: tsc will only compile
+ CompilerOptions: 

| **`"tartget":"es5/6"`**         | Language version                         |
| ------------------------------- | ---------------------------------------- |
| **`"lib":["dom","es7"]`**       | **引入函数和方法，不写就是target默认的** |
| **`"sourceMap": true`**         | **在浏览器sources里也可以调试和显示ts**  |
| **`"outDir": "./dist" `**       | **编译后js文件存放文件夹**               |
| **`"rootDir": "./src" `**       | **编译前ts文件存放文件夹**               |
| **`"removeComments": true `**   | **清除注释**                             |
| **`"noEmitOnError": true `**    | **有错误不编译所有ts**                   |
| **`"noImplicitAny": true `**    | **所有参数需要类型，变量无关**           |
| **`"strictNullChecks": true `** | **不检查Null类型**                       |
| **`"noUnusedLocals": true `**   | **检测未使用参数**                       |
| **`"removeComments": true `**   | **清除注释**                             |
| **`"removeComments": true `**   | **清除注释**                             |

```json
{
  "compilerOptions": {
     ...
  },
  "exclude":[
    "node modules",// default
    "test.ts",
    "*.dev.ts",//以.dev.ts结尾的文件
    "**/*.dev.ts"//文件夹下以.dev.ts结尾的文件
  ],
  "include":[
    "test.ts"
  ]//写了就只tsc这几个，一般不需要写
}
```

