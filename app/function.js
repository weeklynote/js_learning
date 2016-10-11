/**
 * Created by liujin on 2016/10/10.
 */
'use strict';
function area_of_circle(x){
    return 3.1415926 * x * x;
}
console.log('r = 10:' + area_of_circle(10));
// 函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回
// 如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined。

var my_abs = function(x){
    if(x >= 0){
        return x;
    }else{
        return -x;
    }
};// 注意这里的分号
console.log('my_abs...' + my_abs(-1111));
console.log('my_abs...' + my_abs(322111));
// JavaScript允许传入任意个参数而不影响调用
console.log('my_abs...' + my_abs(44444, '111111'));
// 传入的参数比定义的少也没有问题
console.log('my_abs...' + my_abs()); // 此时abs(x)函数的参数x将收到undefined，计算结果为NaN,可以对参数进行检查

// arguments, 只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。arguments类似Array但它不是一个Array
function arg(x){
    console.log('parammeter:' + x);
    for(var i = 0; i < arguments.length; i++){
        console.log('argument ' + arguments[i]);
    }
}
arg(10, 20, 30);
// 利用arguments，可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值

// rest参数
function foo(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    // 拿到多余的参数
    console.log(rest);
}
foo(1, 2, 3, 4, 5, 6);
// 改进型
//function efoo(a, b, ...rest) {
//    console.log('a = ' + a);
//    console.log('b = ' + b);
//    console.log(rest);
//}
//efoo(1, 2, 3, 4, 7, 8, 9);

// JavaScript默认有一个全局对象window
var course = 'Learn JavaScript';
console.log(course); // 'Learn JavaScript'
console.log(window.course); // 'Learn JavaScript'

// 命名空间
// 减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中

// 绑定到对象上的函数称为方法
var person = {
    name:'hhhhh',
    birth:1991,
    age:function (){
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
console.log('person age:' + person.age());
// this是一个特殊变量，它始终指向当前对象
// 如果以对象的方法形式调用，person.age()，该函数的this指向被调用的对象，也就是person，这是符合我们预期的。
var birth = -1;
//function getAge() {
//    var y = new Date().getFullYear();
//    return y - this.birth; // 运行出错
//}

//person = {
//    name: '小明',
//    birth: 1990,
//    age: getAge
//};

//console.log(person.age()); // 25, 正常结果
//console.log(getAge()); // 运行出错
//// 如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window
//
//// apply
//console.log(person.age());
//console.log(getAge.apply(person, []));

// 装饰器
var count = 0;
var oldParseInt = parseInt;
window.parseInt = function (){
  count++;
    return oldParseInt.apply(null, arguments);
};
parseInt('10');
parseInt('20');
parseInt('50');
console.log(count);

// 高阶函数，JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数
function add(x, y, f){
    return f(x) + f(y);
}
console.log(add(-5, 6, Math.abs));
// map
var f = function (x) {
    return x * x;
};
var arr =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
console.log(arr.map(f));
console.log(arr.map(String));

// reduce
var ss = '1111';
console.log(ss.split(''));
console.log(ss.split('').map(function (x){
    return x * 1;
}));
console.log(ss.split('').map(function (x){
    return x * 1;
}).reduce(function (x, y){
    return 10 * x + y;
}));

// filter,把Array的某些元素过滤掉，然后返回剩下的元素
console.log(arr.filter(function (x){
    return x % 2 !== 0;
}));

arr = ['Google', 'Apple', 'Microsoft'];
console.log(arr.sort());
arr = ['Google', 'apple', 'Microsoft'];
console.log(arr.sort());
// 忽略大小写
console.log(arr.sort(function (s1, s2){
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    if(s1 < s2){
        return -1;
    }
    if(s1 > s2){
        return 1;
    }
    return 0;
}));
arr = [10, 20, 1, 2];
console.log(arr.sort());
console.log(arr.sort(function (x, y){
    if (x < y){
        return -1;
    }
    if(x > y){
        return 1;
    }
    return 0;
}));
// sort()方法会直接对Array进行修改，它返回的结果仍是当前Array

// 闭包
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}
// 如果不需要立刻使用函数求值，而是在后面的代码中，根据需要再计算，可以不返回求和的结果，而是返回求和的函数！
var f = lazy_sum([1,2,3,4,5]);
console.log(f());
// 当调用lazy_sum()时，每次调用都会返回一个新的函数，即使传入相同的参数
var f1 = lazy_sum([1, 2, 3, 4, 5]);
var f2 = lazy_sum([1, 2, 3, 4, 5]);
console.log(f1 === f2);
// 注意到返回的函数在其定义内部引用了局部变量arr，所以，当一个函数返回了一个函数后，其内部的局部变量还被新函数引用
// 另一个需要注意的问题是，返回的函数并没有立刻执行，而是直到调用了f()才执行
function counts() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = counts();
var f1 = results[0];
console.log(f1()); // 16
var f2 = results[1];
console.log(f2());// 16
var f3 = results[2];
console.log(f3());// 16
// 原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16
function countss() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        // 创建一个匿名函数并立刻执行
        arr.push((function (n) {
            return function (){
                return n * n;
            };
        })(i));
    }
    return arr;
}
results = countss();
f1 = results[0];
console.log(f1());
f2 = results[1];
console.log(f2());
f3 = results[2];
console.log(f3());
// 理论上讲，创建一个匿名函数并立刻执行可以这么写,function (x) { return x * x } (3);
// 由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来：
console.log((function (x) { return x * x }) (13));
// 理解闭包的强大功能
// 面向对象的程序设计语言里，比如Java和C++，要在对象内部封装一个私有变量，可以用private修饰一个成员变量
// 在没有class机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量
function create_counter(initial){
    var x = initial || 0;
    return {
      inc : function (){
          x = x + 1;
          return x;
      }
    }
}
var counter = create_counter();
console.log(counter.inc());
console.log(counter.inc());
console.log(counter.inc());
counter = create_counter(100);
console.log(counter.inc());
console.log(counter.inc());
console.log(counter.inc());
// 结论：闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来
// 闭包还可以把多参数的函数变成单函数的函数
function make_pow(n){
    return function (x){
      return Math.pow(x, n);
    };
}
var pow2 = make_pow(2);
var pow3 = make_pow(3);
console.log(pow2(3));
console.log(pow3(10));

// 实现不需要0、1、2、3这些数字和+、-、*、/这些符号的四则运算
var zero = function (f){
    return function (x){
        return x;
    }
};
var one = function(f){
    return function (x){
        return f(x);
    }
};
// 加法
function add(m, n){
    return function (f){
        return function (x){
            return m(f)(n(f)(x));
        }
    }
}
// 乘法
function multi(m, n){
    return function (f){
        return function (x){
            return m(n(f))(x);
        }
    }
}
var two = add(one, one);
var three = add(two, one);
(three(function (){
    console.log('print 3 times...');
}))();
var six = multi(two, three);
(six(function (){
    console.log('print 6 times...');
}))();
// TODO

// 箭头函数
var fn = x => x * x;
console.log(fn(81));
fn = x => {
  if(x > 0){
      return x * x;
  }  else{
      return -x * x;
  }
};
console.log(fn(-10));
console.log(fn(9));
// 参数不是一个，就需要用括号()括起来
fn = (x, y) => x * x + y * y;
console.log(fn(3, 4));
// 如果返回是对象
fn = (x) => ({
   foo : x
});
console.log(fn(22222));
// 箭头函数内部的this是词法作用域，由上下文确定。
var obj = {
  birth : 1990,
    getAge: function (){
        var fn = () => new Date().getFullYear() - this.birth;
        return fn();
    }
};
console.log(obj.getAge());

obj = {
  birth : 1990,
    getAge : function (year){
        var fn = (y) => y - this.birth;
        // this在箭头函数中已经按照词法作用域绑定了，所以，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略
        return fn.call({birth:2000}, year);
    }
};
console.log(obj.getAge(2019));

// generator
function * fib(max){
    var t, a = 0, b = 1, n = 1;
    while(n < max){
        yield a;
        t = a + b;
        a = b;
        b = t;
        n++;
    }
    return a;
}
var fibo = fib(5);
// next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，
// 然后“暂停”。返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。
console.log(fibo.next());
console.log(fibo.next());
console.log(fibo.next());
console.log(fibo.next());
console.log(fibo.next());
for(var x of fib(3)){
    console.log(x);
}

function * next_id(){
    var id = 0;
    while(++id){
        yield id;
    }
}
var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 100; x ++) {
    if (g.next().value !== x) {
        pass = false;
        console.log('测试失败!');
        break;
    }
}
if (pass) {
    console.log('测试通过!');
}
