'use strict';

// 两种定义正则表达式的方式
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');
// RegExp对象的test()方法用于测试给定的字符串是否符合条件
console.log(re1.test('ABC-001'));
console.log(re2.test('ABC-001'));

var s = 'ab    c';
console.log(s.split(''));
console.log(s.split(/\s+/));

var re = /^(\d{3})-(\d{3,8})$/;
console.log(re.exec('010-12345'));
console.log(re.exec('010 12345'));














































































