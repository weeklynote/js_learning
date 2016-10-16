'use strict';
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
console.log(JSON.stringify(xiaoming));

console.log(JSON.stringify(xiaoming), null, '  ');
// 第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，可以传入Array
console.log(JSON.stringify(xiaoming, ['name', 'skills'], '  '));

// 传入一个函数，这样对象的每个键值对都会被函数先处理
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}
console.log(JSON.stringify(xiaoming, convert, '  '));

// 给对象定义一个toJSON()的方法，直接返回JSON应该序列化的数据
xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};
console.log(JSON.stringify(xiaoming));

// 反序列化
console.log(JSON.parse('[1,2,3,true]'));
console.log(JSON.parse('{"name":"小明","age":14}'));
console.log(JSON.parse('true'));
console.log(JSON.parse('123.45'));

// JSON.parse()还可以接收一个函数，用来转换解析出的属性
console.log(JSON.parse('{"name":"小明","age":14}', function (key, value) {
    // 把number * 2:
    if (key === 'name') {
        return value + '同学';
    }
    return value;
})); 











