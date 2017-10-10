document.writeln('hello world!');

/**
    下面的值被当做假(falsy)
    . false
    . null
    . undefined
    . 空字符串
    . 数字0
    . 数字 NaN
    其他所有的值都被当做真，包括字符串"false"

*/

// method定义新方法
Function.prototype.method = function (name, func){
    this.prototype[name] = func;
    return this;
}

/**
    对象字面量
    
    需要注意的是JavaScript不强制要求引号扩住属性名。
    所以括住first_name、last_name不是必须的，但是如果是first-name、last-name则是必须的，因为JavaScript的连接符(-)是不合法的。
*/
var stooge = {
    "first_name" : "Jerome",
    "last_name" : "Howard"
}

document.writeln(stooge.first_name);
document.writeln(stooge["first_name"]);
// 尝试一个不存在的成员属性会返回undefined
document.writeln(stooge.second_name);

// 对象字面量可嵌套
var flight = {
    airline : "Oceanic",
    number : 815,
    departure : {
        IATA : "SYD",
        time : "2017-10-10",
        city : "Sydney"
    },
    arrival : {
        IATA : "LAX",
        time : "2017-11-11",
        city : "Los Angeles"
    }
    
}

// 可以使用||运算符来填充默认值
document.writeln(stooge.second_name || "(none)");
document.writeln(flight.status || "unkown");

// undefined
document.writeln(flight.equipment);
// throw "TypeError"
// document.writeln(flight.equipment.model)
// 使用&&运算符避免"TypeError"
document.writeln(flight.equipment && flight.equipment.model);

document.writeln(flight.departure.IATA);

// 如果对象里面有属性，更新会替换以前的值；如果没有该属性会新增属性到对象
stooge.first_name = "John";
document.writeln(stooge.first_name);
document.writeln("stooge.middle_name is " + stooge.middle_name);
stooge.middle_name = "welcome";
document.writeln("After update. stooge.middle_name is " + stooge.middle_name);

// 会包含原型链中的属性
for(myvar in stooge){
    if(stooge.hasOwnProperty(myvar)){
        document.writeln("for each in stooge property " + myvar + " and value is " + stooge[myvar]);
    }
}

// 对象通过引用来传递，它们永远不会被复制
var x = stooge;
x.nickname = "Jacky";
document.writeln("stooge.nickname is " + stooge.nickname);

// 原型 Prototype
/** 

    每一个对象都连接到一个原型对象，并且可以从中继承属性。所有通过对象字面量创建的对象都连接到Object.prototype，它是JavaScript的标配对象
    当你创建一个对象时，你可以选择某个对象作为其原型。
  
 */
 
 // 给Object增加一个create方法，用来创建使用原对象作为其原型的新对象
 if(typeof Object.beget !== 'function'){
     Object.create = function(o){
         var F = function(){};
         F.prototype = 0;
         return new F();
     }
 }
 
 /** 
 
    原型连接在更新时不起作用，只有在检索值的时候才被用到。如果尝试获取的属性在该对象中不存在，那么会试着从原型对象中回去属性值。如果原型对象还没有该属性，
    那么在从它的原型开始查找，以此类推，直到该过程最终到达Object.prototype
    原型关系是动态关系，如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。
    
 */
 
 // 查看属性的类型
 document.writeln("stooge.first_name type is " + (typeof stooge.first_name));
 document.writeln("stooge.first_name type is " + (typeof 123456));
 document.writeln("stooge.first_name type is " + (typeof stooge));
 document.writeln("stooge.first_name type is " + (typeof stooge.staus));
 document.writeln("stooge.first_name type is " + (typeof stooge.toString));
 
 // 原型链中的任何属性都会产生值，一般来说获取对象自身信息时，关注的更多是数据。可以丢弃值为函数的类型或者使用hasOwnProperty方法，这个方法不会检查原型链，只会检查对象本身。
 
 // 删除属性,delete运算符
 var F = function(){};
 F.prototype = stooge;
 var another_stooge = new F();
 stooge.del = "delete operator";
 document.writeln("stooge del property is " + stooge.del);
 delete stooge.del;
 document.writeln("after delete stooge del property is " + stooge.del);
 another_stooge.nickname = "Mode";
 document.writeln("another_stooge.nickname property is " + another_stooge.nickname);
 // another_stooge也定义了nickname属性，删除该属性会让原型链中的属性透现出来
 delete another_stooge.nickname;
 document.writeln("another_stooge.nickname property is " + another_stooge.nickname);
 
 // 函数对象
 // 没有给函数命名的函数被称为匿名函数
 var add = function (a, b){
     return a + b;
 };
 
 // 函数调用
 /** 
    
   每个函数接收两个附加的参数：this和arguments。
   this的值取决于调用的模式：方法调用模式、函数调用模式、构造器调用模式、apply调用模式
   实参与形参的个数不匹配时不会导致运行时错误；实参个数多了，超出的参数值会被忽略；如果实参的个数少了，那么缺失的参数被替换为undefin。
   不对参数的类型进行检查，任何类型的值都可以传递。

 */
 
 // 方法调用模式
 var myObject = {
     value : 0,
     increment : function (inc){
         this.value += (typeof inc === 'number' ? inc : 1);
     }
 };
 myObject.increment();
 document.writeln("myObject increment default:" + myObject.value);
 myObject.increment(2);
 document.writeln("myObject increment 2:" + myObject.value);
 
 // 函数调用模式
 // 当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用：
 document.writeln("add function result:" + add(10, 11));
 // 在此模式下，this被绑定到全局对象。这个特性使得外部函数不能使用内部函数帮助完成它的工作，因为内部函数的this没有被绑定到外部函数变量中。
 
 // ?????
 myObject.double = function (){
     var that = this;
     document.writeln("myObject double function this reference:" + this.value);
     var helper = function (){
         that.value = add(that.value, that.value);
     };
     helper();
 }
 myObject.double();
 document.writeln("myObject double value:" + myObject.value);
 
 // 构造器调用模式
 var Quo = function (string){
     this.status = string;
 }
 Quo.prototype.get_status = function(){
     return this.status;
 }
 var myQuo = new Quo("confused");
 document.writeln("Quo status is " + myQuo.get_status());
 document.writeln("Quo status is " + Quo.staus);