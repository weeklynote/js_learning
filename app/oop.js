'use strict';
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

var xiaoming = {
    name: '小明'
};
// 把xiaoming的原型指向了对象Student，看上去xiaoming仿佛是从Student继承下来的
xiaoming.__proto__ = Student;
console.log(xiaoming.run());

var Bird = {
    fly: function () {
        console.log(this.name + ' is flying...');
    }
};

xiaoming.__proto__ = Bird;
console.log(xiaoming.fly());

var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run();
console.log(xiaoming.__proto__ === Student);

// 当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性
// 如果没有找到，就到其原型对象上找，如果还没有找到，
// 就一直上溯到Object.prototype对象，最后，如果还没有找到，就只能返回undefined

function hhh(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
// new一个函数
var xiaoming = new hhh('小明');
console.log(xiaoming.name);
console.log(xiaoming.hello());
// 如果不写new，这就是一个普通函数，它返回undefined。
// 如果写了new，它就变成了一个构造函数，它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this;
// console.log(xiaoming.constructor === Student.prototype.constructor);
// console.log(Student.prototype.constructor === Student);
// console.log(Object.getPrototypeOf(xiaoming) === Student.prototype);
// console.log(xiaoming instanceof Student);
// 让所有的Cat对象有一个name属性，并共享一个方法say
function Cat(name) {
    this.name = name;
}
Cat.prototype.say = function () {
    return 'Hello, ' + this.name + '!';
};
function BlueCat(name){
    Cat.call(this, name);
    // 调用Student构造函数，绑定this变量
    this.color = 'blue';
}
// 原型链new PrimaryStudent() ----> PrimaryStudent.prototype ----> Object.prototype ----> null

// 空函数
function F() {}
// 把F的原型指向Cat的原型
F.prototype = Cat.prototype;
// 把BlueCat的原型指向一个新的F对象，F对象的原型正好指向Cat的原型
BlueCat.prototype = new F();
// 将BlueCat原型的构造函数修复为BlueCat
BlueCat.prototype.constructor = BlueCat;
BlueCat.prototype.getColor = function (){
  return this.color;
};
var little = new BlueCat('baby');
console.log(little.name);
console.log(little.color);
// 验证原型
console.log(little.__proto__ === BlueCat.prototype);
console.log(little.__proto__.__proto__ == Cat.prototype);
// 验证继承关系
console.log(little instanceof Cat);
console.log(little instanceof BlueCat);

// 封装一下继承的方法来实现
function inherits(Child, Parent){
    var F = function (){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

function BlackCat(name){
    Cat.call(this, name);
    this.price = 10000;
}

inherits(BlackCat, Cat);
BlackCat.prototype.getPrice = function (){
  return this.price;
};
var black = new BlackCat('black');
console.log(black.name);
console.log(black.getPrice());

