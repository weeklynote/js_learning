/**
 * Created by liujin on 2016/10/9.
 */
'use strict';
// Number
// JavaScript不区分整数和浮点数，统一用Number表示，以下都是合法的Number类型
var num = 123;
num = 0.123;
num = 1.2345;
num = -99;
num = NaN
num = Infinity;

// 字符串， 单引号'或双引号"括起来的任意文本
// 如果'本身也是一个字符，那就可以用""括起来，比如"I'm OK"包含的字符是I，'，m，空格，O，K这6个字符。
// 如果字符串内部既包含'又包含"可以用转义字符\来标识，比如：'I\'m \"OK\"!';
// ASCII字符可以以\x##形式的十六进制表示
// 用\u####表示一个Unicode字符
// 模板字符串
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
alert(message);

var s = 'welcome';
s.length;
s[0];
s[1];
s[8];// undefined 超出范围的索引不会报错，但一律返回undefined
// 字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果：
var ss = 'Test';
alert(ss); // s仍然为'Test'

s = 'Hello';
s.toUpperCase();
s.toLowerCase();
s.indexOf('e');
s.substring(0, 5);


// 布尔值，true或false

// &&

// ||

// !非运算

// 比较运算符
// ==比较，自动转换数据类型再比较，很多时候，会得到非常诡异的结果
// ===比较，不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较
// 因此要始终坚持使用===比较
// NaN这个特殊的Number与所有其他值都不相等，包括它自己，唯一能判断NaN的方法是通过isNaN()函数
// 比较两个浮点数的大小，只能计算他们差值的绝对值是否小于某个阈值

// null和undefined
/*
 *
 * null表示一个“空”的值，它和0以及空字符串''不同，0是一个数值，''表示长度为0的字符串，而null表示“空”。
 * undefined表示“未定义”
 * 大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。
 *
 */

// 数组,可以包括任意数据类型
var arr = [1, 2, 3, 'hello', null, true];
arr[0];
arr[1];
arr[5];
arr = new Array(1, 2, 3); // 出于代码的可读性，建议使用[]
arr = [1, 2, 3];
arr.length; // 3
arr.length = 6; // arr变为[1,2,3,undefined,undefined,undefined]
arr.length = 2; // arr变为[1, 2]
// 如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化：
arr = [1, 2, 3];
arr[5] = 'x';
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']
arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 返回0
arr.indexOf('30'); // 返回2
arr.indexOf(30); // 未找到返回-1
arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // ['A', 'B', 'C']
arr.slice(3); // ['D', 'E', 'F', 'G']
// 如果不给slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个Array
var copy = arr.slice(); // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
copy === arr; // false
// push和pop,push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉：
arr = [1, 2];
arr.push('A', 'B'); // [1, 2, 'A', 'B']
arr.pop(); // 返回'B'
arr.pop();
arr.pop();
arr.pop(); // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
// unshift和shift,往Array的头部添加若干元素，使用unshift()方法，shift()方法则把Array的第一个元素删掉
arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
arr; // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
arr; // []
// sort
arr = ['B', 'C', 'A'];
arr.sort(); // ['A', 'B', 'C']
// reverse
arr = ['1', '2', '3'];
arr.reverse(); // ['3', '2', '1']
// splice，可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// concat，当前的Array和另一个Array连接起来，并返回一个新的Array，可以接收任意多个元素或数组
arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
// join，当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：
arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'
// 如果Array的元素不是字符串，将自动转换为字符串后再连接。


// 对象,键都是字符串类型，值可以是任意数据类型。
var obj = {
    name:'hello',
    age:25,
    city:'beijing',
    hasCar:false
};
obj.name;
obj.age;

// strict模式
// JavaScript在设计之初，为了方便初学者学习，并不强制要求用var申明变量。这个设计错误带来了严重的后果：如果一个变量没有通过var申明就被使用，那么该变量就自动被申明为全局变量：
var i = 10; // i现在是全局变量
// 在同一个页面的不同的JavaScript文件中，如果都不用var申明，恰好都使用了变量i，将造成变量i互相影响，产生难以调试的错误结果。
// 使用var申明的变量则不是全局变量，它的范围被限制在该变量被申明的函数体内，同名变量在不同的函数体内互不冲突。



