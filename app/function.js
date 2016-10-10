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
var arr =  [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
}))