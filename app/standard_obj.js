'use strict';
console.log(typeof 123); // 'number'
console.log(typeof NaN); // 'number'
console.log(typeof 'str'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof Math.abs); // 'function'
console.log(typeof null); // 'object'
console.log(typeof []); // 'object'
console.log(typeof {}); // 'object'
console.log(new Number(234));
console.log(new String('str'));
console.log(new Boolean(true));

// 如果我们在使用Number、Boolean和String时，没有写new,Number()、Boolean和String()被当做普通函数，把任何类型的数据转换为number、boolean和string类型（注意不是其包装类型）
var n = Number('123'); // 123，相当于parseInt()或parseFloat()
console.log(typeof n); // 'number'

var b = Boolean('true'); // true
console.log(typeof b); // 'boolean'

var b2 = Boolean('false'); // true! 'false'字符串转换结果为true！因为它是非空字符串！
console.log(typeof b2)
var b3 = Boolean(''); // false
console.log(typeof b3)
var s = String(123.45); // '123.45'
console.log(typeof s); // 'string'

/*
总结一下，有这么几条规则需要遵守：

不要使用new Number()、new Boolean()、new String()创建包装对象；

用parseInt()或parseFloat()来转换任意类型到number；

用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；

通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；

typeof操作符可以判断出number、boolean、string、function和undefined；

判断Array要使用Array.isArray(arr)；

判断null请使用myVar === null；

判断某个全局变量是否存在用typeof window.myVar === 'undefined'；

函数内部判断某个变量是否存在用typeof myVar === 'undefined'。
*/
console.log(123..toString());
console.log((123).toString());

// Date
var now = new Date();
console.log(now.getFullYear()); // 2016年份
console.log(now.getMonth()); // 10，月份
console.log(now.getDate()); // 12，号
console.log(now.getDay()); // 3, 表示星期三
console.log(now.getHours()); // 23, 24小时制
console.log(now.getMinutes()); // 18, 分钟
console.log(now.getSeconds()); // 秒
console.log(now.getMilliseconds()); // 毫秒数
console.log(now.getTime()); // 以number形式表示的时间戳

// 创建一个指定日期和时间的方法是解析一个符合ISO 8601格式的字符串：
var d = Date.parse('2015-06-24T19:49:22.875+08:00');
// 但它返回的不是Date对象，而是一个时间戳。不过有时间戳就可以很容易地把它转换为一个Date：
var d = new Date(1435146562875);
console.log(d.toLocaleString()); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
console.log(d.toUTCString()); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时