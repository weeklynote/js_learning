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
 // 如果一个函数创建的目的是希望结合new来调用，那么它被称为构造器函数。按照约定，他们被保存在以大写格式命名的变量里。不推荐这样使用！！！
 
 /**
 
    Apply调用模式
    
    JavaScript是一门函数式的面向对象编程语言，因此函数可以拥有方法。
    apply方法让我们构建一个参数数组传递给调用函数。它也允许我们选择this的值。apply方法接收两个参数：第一个是要绑定给this的值；第二个是一个参数数组。
 
 */
 var array = [3, 4];
 var sum = add.apply(null, array);
 document.writeln("apply invocation add fun " + sum);
 var statusObject = {
     status : "A-OK"
 };
 /**
 
    尽管statusObject没有继承自Quo.prototype，但是我们可以在statusObject上调用get_status方法，因为我们把statusObject绑定到get_status方法的this上啦
 
 */
 var status = Quo.prototype.get_status.apply(statusObject);
 document.writeln(status)
 
 /** 
 
    参数
    
    当函数被调用时会得到一个免费配送的参数，那就是arguments数组。函数可以同伙此参数访问所有它被调用时传递给它的参数列表，包括那些没有被分配给函数声明时定义的形式参数的多余参数。
    这使得编写一个无须指定参数个数的函数成为可能：
 
 */
 /**
 
    构造一个将大量的值相加的函数
    函数内部的变量sum不会与函数外部定义的sum产生冲突
 
 */
 var sum = function (){
     var i, sum = 0;
     for(i = 0; i < arguments.length; i++){
         sum += arguments[i];
     }
     return sum;
 }
 document.writeln(sum(4, 5, 6, 7, 8, 9, 10));
 /** 

    这不是一个特别有用的模式，下文会看到如何给数组添加一个相似的方法达到同样的效果。
    而且这是一个设计错误，arguments并不是一个真正的数组。它只是一个类似数组，拥有一个length属性，但它没有任何数组方法。
    下文将会展示这个设计错误导致的后果。

 */
 
 /**
 
    返回
    
    当一个函数被调用时，它从第一个语句开始执行，并在遇到关闭函数体的}时结束。然后函数会把控制权交给调用该函数的程序。
    return语句可以用来使函数提前返回。当return被执行时，函数立即返回而不再执行余下的语句。
    一个函数总是会返回一个值。如果没有执行返回值，则返回undefined。
    如果在函数调用时在前面加上了new前缀，且返回值不是一个对象，则返回this(该新对象)。
 
 */
 
 /**
 
    异常
    
    JavaScript提供了一套异常处理机制。异常是干扰程序的正常流程的不寻常(并非完全是出乎意料的)的事故。
    当发现这样的事故时，需要抛出异常。
 
 */
 var add2 = function (a, b){
     if((typeof a !== 'number') || (typeof b !== 'number')){
         throw {
             name : 'TypeError',
             message : 'add needs numbers'
         };
     }
     return a + b;
 }
 // throw语句会中断函数的执行。
 var try_it = function (){
     try{
         add2('serve');
     }catch(e){
         document.writeln("try_it exceptions:" + e.name + ";" + e.message);
     }
 };
 try_it();
 
 // 扩充类型的功能
 Function.prototype.method = function (name, func){
     // 保险的方法是没有该方法时才添加它
     if(!this.prototype[name]){
        this.prototype[name] = func;
     }
     return this;
 };
 // 增加一个integer方法改善取整的操作
 Number.method('integer', function (){
    return Math[this < 0 ? 'ceil' : 'floor'](this); 
 });
 document.writeln("Math floor integer " + Math.floor(-1.123));
 document.writeln("Math floor integer " + Math.floor(10 / 3));
 document.writeln("Number method integer " + (10 / 3).integer());
 // 增加一个移除字符串首尾空白的方法
 String.method('trim', function (){
     return this.replace(/^\s+|\s+$/g, "");
 });
 document.writeln('"' + " neat   " + '"');
 document.writeln('"' + " neat   ".trim() + '"');
 
 // 递归
 
 var hanoi = function (disc, src, aux, dst){
     if(disc > 0){
         hanoi(disc - 1, src, dst, aux);
         document.writeln("Move disc " + disc + ' from ' + src + " to " + dst);
         hanoi(disc - 1, aux, src, dst);
     }
 }
 hanoi(5, "Src", "Aux", "Dst");
 
 var walk_the_Dom = function walk(node, func){
     func(node);
     node = node.firstChild;
     while(node){
         walk(node, func);
         node = node.nextSibling;
     }
 }
 
 /**
 
    尾递归优化
    
    如果一个函数返回自身递归调用的结果，那么调用的过程会被替换为一个循环，它可以显著的提高性能。
    遗憾的是，JavaScript并没有提供尾递归优化。
    同时需要注意的是深度递归函数可能会因为堆栈溢出而运行失败。
 
 */
 var factorial = function factorial(i, a){
     a = a || 1;
     if(i < 2){
         return a;
     }
     return factorial(i - 1, a * i);
 };
 document.writeln(factorial(4, 4));
 
 /** 

    作用域
    
    作用域减少了名称冲突，并且提供了自动内存管理。
    实际上JavaScript并不支持块级作用域。
    函数中的参数和变量在函数外部是不可见的，而在一个函数内部任何位置定义的变量，在该函数内部任何地方都可见。
 
 */
 
 var foo = function (){
     var a = 3, b = 5;
     document.writeln("1 a = " + a + " b = " + b);
     var bar = function (){
         var b = 7, c = 11;
         a += b + c;
         document.writeln("2 a = " + a + " b = " + b + " c = " + c);
     }
     document.writeln("3 a = " + a + " b = " + b);
     bar();
 };
 foo();
 
 // 闭包
 // 内部函数可以拥有比外部函数更长的生命周期。
 var myObject1 = (function (){
     var value = 0;
     return {
       increment : function (inc){
         value += (typeof inc === 'number' ? inc : 1);  
       },
       getValue : function (){
           return value;
       }
     };
 }());
 myObject1.increment(3);
 document.writeln(myObject1.getValue());
 
 // quoo被设计成无须使用new来使用，所以名字也没有首字母大写
 var quoo = function (status){
     return {
         // get_status方法返回的不是status参数的副本，而是参数本身
         get_status : function (){
            return status;
         }
     }
 };
 document.writeln(quoo("amazed").get_status());

 var fade = function (node){
     var level = 1;
     var step = function (){
       var hex = level.toString(16);
       node.style.background = '#FFFF' + hex + hex;
       if(level < 15){
           level += 1;
           // 只要fade的内部函数需要，变量就会持续保留
           setTimeout(step, 100);
       }
     };
     setTimeout(step, 100);
 };
 // HTML的<body>标签
 fade(document.body);
 
 // 理解内部函数能访问外部函数的实际变量而无须复制很重要
 // 糟糕的例子
 var add_the_handlers = function (nodes){
     var i;
     for(i = 0; i < nodes.length; i++){
         nodes[i].onclick = function (){
             alert(i);
         };
     }
 };
 // 结束糟糕的例子
 // add_the_handlers(document.body.childNodes);
 // add_the_handlers函数本身是想传递给每个事件处理器唯一值(i)。但是未达到目的，因为事件处理器函数绑定了变量i，而不是函数在构建时的变量i。
 
 // 以下是改进版
 var add_the_handlerss = function (nodes){
     var helper = function (i){
         // 加一个参数e是为了获取传入的事件
         return function (e){
           document.writeln(e.toString());
           alert(i);  
         };
     }
     var i;
     for(i = 0; i < nodes.length; i++){
         // 应当避免在循环中创建函数，他可能会带来无谓的计算，还会引起混淆
         // 可以像上面的例子在循环外创建一个辅助函数
         nodes[i].onclick = helper(i);
     }
 }
 add_the_handlerss(document.body.childNodes);
 
 /** 
 
    回调
    
    


*/ 

 /** 
 
    模块
    
    请好好理解一下下面的deentityify例子。☆☆☆☆☆
    
    涉及到()运算符以及变量存储初始化问题。
    模块的一般形式是：一个定义是有变量和函数的函数；利用闭包创建可以访问是有变量和函数的特权函数；最后返回这个特权函数。
    
    模块模式可以摒弃全局变量的使用。它促进了信息隐藏和其他优秀的设计实践。
    
    模块模式可以产生安全的对象。

*/
String.method('deentityify', function (){
    var entity = {
        quot : '"',
        lt : "<",
        gt : ">"
    };
    document.writeln('&lt;&quot;&gt; entity....');
    return function (){
        return this.replace(/&([^&;]+);/g, function (a, b) {
            var r = entity[b];
            return (typeof r === 'string' ? r : a);
        });
    };
}());
document.writeln('&lt;&quot;&gt;'.deentityify());
document.writeln('&lt;&lt;&quot;&gt;&gt;'.deentityify());

var serial_maker = function (){
    var prefix = "";
    var seq = 0;
    return {
      set_prefix : function (p){
          prefix = String(p);
      },
      set_seq : function (s){
          seq = s;
      },
      gensym : function(){
          var result = prefix + seq;
          seq += 1;
          return result;
      }
    };
};
var seqer = serial_maker();
seqer.set_prefix("Q");
seqer.set_seq(10000);
var unique = seqer.gensym();
document.writeln(unique);

// 级联 链式调用

/** 

    柯里化
    
    函数也是值，从而我们可以把函数与传递给其他参数相结合，产生新的函数。
    

 */
 Function.method("curry", function(){
    var slice = Array.prototype.slice;
    var args = slice.apply(arguments), that = this;
    return function(){
      return that.apply(null, args.concat(slice.apply(arguments)));  
    };
 });
 var add1 = add.curry(1);
 document.writeln(add1(6));

 /**
 
    记忆
    
    函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。
    JavaScript的对象和数组要实现这种优化是非常方便的。
    
 
 
 */
 var fibonacci_count = 0;
 var fibonacci = function (n){
     fibonacci_count++;
   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);  
 };
 
 // 这样实现是可以的，但是fibonacci函数做了很多无谓的操作
 for(var i = 0; i <= 10; i++){
     document.writeln('//' + i + ': ' + fibonacci(i));
 }
 document.writeln('11 times fibonacci invoke takes ' + fibonacci_count);
 
 // 修订版 
 var fibonaccis_count = 0;
 var fibonaccis = function (){
     var memo = [0, 1];
     var fib = function (n){
         var result = memo[n];
         if(typeof result !== 'number'){
             fibonaccis_count++;
             result = fib(n - 1) + fib(n - 2);
             memo[n] = result;
         }
         return result;
     }
     return fib;
 }();
 for(var i = 0; i <= 10; i++){
     document.writeln('//' + i + ': ' + fibonaccis(i));
 }
 
 document.writeln('11 times fibonaccis invoke takes ' + fibonaccis_count);
 
 var memoizer = function (memo, formula){
   var recur = function (n){
       var result = memo[n];
       if(typeof result !== 'number'){
           result = formula(recur, n);
           memo[n] = result;
       }
       return result;
   };
    return recur;
 };
 var fibo = memoizer([0, 1], function (recur, n){
     return recur(n - 1) + recur(n - 2);
 })
 document.writeln(fibo(11));
 var factor = memoizer([1, 1], function (recur, n){
     return n * recur(n -1 );
 });
 document.writeln(factor(3));
 
 /** 
 
    继承
    
    JavaScript是一门基于原型的语言，这意味着对象直接从其他对象继承。
    

 */
 
 /**
 
    伪类
    
    不直接让对象从其他对象继承，反而插入了一个中间层，通过构造器函数产生对象。
    当一个函数对象被创建时，Function构造器产生的函数对象会运行类似这样的代码：
    this.prototype = {constructor : this};
    新函数对象被赋予一个prototype属性，它的值就是一个包含constructor属性且属性值为该新函数的对象。
    prototype对象就是存放继承特征的地方。
    因为JavaScript语言没有提供一种方法确定哪个函数是打算用来做构造器的，所以每个函数都会得到一个prototype对象。
    
    当使用new前缀去调用一个函数时，函数执行的方式会被修改。
 
 */
 
 var Mammal = function (name){
     this.name = name;
 };
 Mammal.prototype.get_name = function (){
     return this.name;
 };
 Mammal.prototype.says = function (){
     return this.saying || '';
 }
 var myMammal = new Mammal('Herb the Mammal');
 document.writeln(myMammal.get_name());
 
 var Cat = function (name){
     this.name = name;
     this.saying = "meow";
 }
 
 // 替换Cat.prototype为一个新的Mammal实例
 Cat.prototype = new Mammal();
 Cat.prototype.purr = function (n) {
     var i, s = '';
     for(i = 0; i < n; i++){
         if(s){
             s += '-';
         }
         s += 'r';
     }
     return s;
 };
 Cat.prototype.get_name = function (){
     return this.says() + " " + this.name + " " + this.says();
 };
 var myCat = new Cat('Henrietta');
 var says = myCat.says();
 var ppurr = myCat.purr(5);
 var name = myCat.get_name();
 document.writeln(says);
 document.writeln(ppurr);
 document.writeln(name);
 
 // 伪类模式本意是向面向对象靠拢，但看起来有点格格不入。我们可以隐藏一些细节，定义一个inherits方法实现：
 Function.method("inherits", function (Parent){
     this.prototype = new Parent();
     return this;
 });
 
 var Dog = function (name){
     this.name = name;
     this.saying = "Bos";
 }.inherits(Mammal).method('wow', function (n){
     var i, s = '';
     for(i = 0; i < n; i++){
         if(s){
             s += '-'
         }
         s += "wangwang";
     }
     return s;
     
 }).method('get_name', function (){
     return this.says() + " " + this.name + " " + this.says();
 });
// TODO
 var dog = new Dog('Giwawa');
 document.writeln(dog.says());
 document.writeln(dog.wow(5));
 /**
    使用
    .method('get_name', function (){
     return this.says() + " " + this.name + " " + this.says();
 });
 
 */
 // 调用Mammal的get_name方法
 document.writeln(dog.get_name());
 /**
    使用
     Dog.prototype.get_name = function (){
     return this.says() + " 2 " + this.name + " 2 " + this.says();
 };
 */
 // 调用Dog的get_name方法
 document.writeln(dog.get_name());
 /**
 
    "伪类"形式给不熟悉JavaScript的程序员提供便利，但是它隐藏了改语言的真实本质。借鉴类的标识法可能误导程序员去编写过于深入与复杂的层次结构。
    许多复杂的类层次结构产生的原因就是静态类型检查的约束。
    JavaScript完全摆脱了那些约束。
    在基于类的语言中，类继承是代码重用的唯一方式。而JavaScript有更多且更好的选择。
 
 */
 
 /**
 
    对象说明符
    
    有时候，构造器要接受一大串参数。这种情况下记住参数的顺序非常困难。
    在这种情况下，如果我们在编写构造器时让它接受一个简单的对象说明符，可能会更加友好。
    那个对象包含了将要构建的对象规格说明。
 
 */
 // 与其这样写：
 /** var myObject = maker(f, l, m, c, s); */
 // 不如这么写：
 /** 

    var myObject = maker({
        first : f,
        middle : m,
        last : l,
        state : s,
        city : c
    });

 */
 /**
 
    现在参数可以按照任意顺序排列，如果构造器会聪明地使用默认值，一些参数可以忽略掉，并且代码也更容易阅读。
    这种形式的写法可以和JSON格式的数据一起工作。
 
 */
 
 /** 

    在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。
    基于原型的继承相比基于类的继承在概念上更为简单：
    
    一个新对象可以继承一个旧对象的属性。

 */
 var myMammal = {
     name : 'Herb the Mammal',
     get_name : function (){
           return this.name;
     },
     says : function (){
         return this.saying || '';
     }
 };
 // 一旦有了一个想要的对象，可以利用Object.create方法构造出更多的实例来。
 var myPig = Object.create(myMammal);
 myCat.name = "Hemrietta";
 myCat.saying = "12345678";
 myCat.purr = function (n){
     var i, s = '';
     for(i = 0; i < n; i++){
         if(s){
             s += '-'
         }
         s += "mypig";
     }
     return s;
 };
 myCat.get_name = function (){
     return this.says() + " " + this.name + " " + this.says();
 };
 /**
 
    这是一种差异化继承。可以利用这种特性来表示内部作用域继承外部作用域的表达上。
 
 */
 
 /** 

    函数化
    
    到此为止，我们所使用的继承模式的一个弱点就是没法保护隐私。对象的所有属性都是可见的。
    可以使用应用模块模式
    
    从构造一个生成对象的函数开始，包括四个步骤：
    1.创建一个新对象。可以构造一个对象字面量，或者它可以和new前缀连用去调用一个构造器函数，或者可以使用Object.create方法去构造一个已经存在的对象的新实例。
    或者调用任意一个会返回一个对象的函数。
    2.有选择的定义私有实例变量和方法
    3.给这个新对象扩充方法。这些方法有特权去访问参数，以及在第2步中通过var语句定义的变量。
    4.返回那个新对象。

 */
 /** 
 
    伪代码模板
    
    var constructor = function (spec, my){
       var that, 其他的私有实例变量;
       my = my || {};
       把共享的变量和函数添加到my中
       that = 一个新对象;
       添加给that的特权方法
       return that;
    };
    
    spec对象包含构造器需要构造一个新实例的所有信息。spec的内容可能会被复制到私有变量中，或者被其他函数改变，或者方法可以在需要的时候访问spec的信息。
    
    my对象是一个为继承链中的构造器提供秘密共享的容器。my对象可以选择性的使用，如果没有传入一个my对象，会创建一个my对象。
    
    生命该对象私有的实例变量和方法。通过简单的声明变量就可以做到。构造器的变量和内部函数变成了该实例的私有成员。内部函数可以访问spec、my、that，以及其他私有变量。
    
    接下来给my对象添加共享的秘密成员，通过赋值语句来实现：
    my.member = value;
    
    现在我们喉罩一个新对象并把它赋值给that。可以使用对象字面量，可以使用new运算符调用一个伪类构造器，可以在一个原型对象上使用Object.create方法，或者可以调用另一个函数化的构造器，传给它一个spec对象和my
    对象。my对象允许其他的构造器分享我们放到my中的资料。其他构造器可能也会把自己可分享的秘密成员放进my对象里，以便我们的构造器可以利用它。
    
    接下来扩充that，加入组成该对象接口的特权方法。我们可以分配一个新的函数成为that的成员方法。或者把函数定义为私有方法，然后再把它们分配给that。
    var methodical = function (){};
    that.methodical = methodical;
    
    分两步去定义methodical的好处是，如果其他方法想要调用methodical，它们可以直接调用methodical而不是that.methodical()。如果该实例被破坏或篡改，甚至that.methodical被替换掉了，调用methodical的方法同样会继续工作，因为它们私有的methodical不受该实例被修改的影响。
    
    最后，返回that。
    
    接下来应用这个模式，此处不需要my，但会使用spec对象。
 
 */
 
 var mammalF = function (spec){
     var that = {};
     that.get_name = function (){
         return spec.name;
     }
     that.says = function (){
         return spec.saying || "default mammalF says";
     }
     return that;
 }
 var fMammal = mammalF({name : "Herbbbbbb"});
 document.writeln(fMammal.get_name());
 document.writeln(fMammal.says());
 /**
 
    在伪类模式里，构造器函数Cat不得不重复构造mammalF已经完成的工作。在函数化 模式中就不再需要了，因为构造器Cat将会调用构造器mammalF，让mammalF去做对象创建中的大部分工作，所以Cat只需要关注自身的差异即可。
 
 */
 var catF = function (spec){
     spec.saying = spec.saying || 'mwow';
     var that = mammalF(spec);
     that.purr = function (n){
         var i, s = '';
         for(i = 0; i < n; i++){
             if(s){
                 s += "-";
             }
             s += "r";
         }
         return s;
     };
     that.get_name = function (){
       return that.says() + "-" + spec.name + "-" + that.says();  
     };
     return that;
 };
 var fCat = catF({name : 'Heriettatttttt'});
 document.writeln(fCat.get_name());
 document.writeln(fCat.purr(4));
 /** 

    函数化模式给我们提供了处理父类方法的方法。我们会构造一个superior方法，它取得一个方法名并返回调用那个方法的函数。
    该函数会调用原来的方法，尽管属性已经变化了。

 */
 
 Object.method('superior', function (name){
     var that = this;
     var method = that[name];
     return function(){
         return method.apply(that, arguments);
     };
 });
 
 var coolCat = function (spec){
   var that = catF(spec);
   var super_get_name = that.superior('get_name');
   that.get_name = function (){
       return "like " + super_get_name() + " baby";
   };
   return that;
 };
 var myCoolCat = coolCat({name : "Bix"});
 document.writeln(myCoolCat.get_name());
 /** 

    函数化模式有很大的灵活性。它相比伪类模式不仅带来的工作更少，还让我们得到更多的封装和信息隐藏，以及访问父类方法的能力。
    如果对象的所有状态都是私有的，那么该对象就成为一个"防伪"对象。该对象的属性可以被替换或删除，但该对象的完整性不会受到损害。
    如果我们用函数化的模式创建一个对象，并且该对象的所有方法都不使用this或that，那么该对象就是持久性的。
    一个持久性对象就是一个简单功能函数的集合。
    一个持久性的对象不会入侵。访问一个持久性的对象时，除非有方法授权，否则攻击者不能访问对象的内部状态。

 */
 
 /**
 
    部件
    
    我们可以从一套部件中把对象组装出来。例如，我们可以构造一个给任何对象添加简单时间处理特性的函数。
    它会给对象添加一个on方法、fire方法和一个私有的事件注册表对象，如下：
 
 */
 
 var eventuality = function (that){
     var registry = {};
     that.fire = function (event){
        var array, func, handler, i, type = (typeof event === 'string' ? event : event.type);
        if(registry.hasOwnProperty(type)){
             array = registry[type];
             for(i = 0; i < array.length; i++){
                 handler = array[i];
                 // 每个处理程序包含一个方法和一组可选的参数
                 // 如果该方法是一个字符串形式的名字，那么寻找该函数。
                 func = handler.method;
                 if(typeof func === 'string'){
                     func = this[func];
                 }
                 func.apply(this, hand.parameters || [event]);
             }
        }
        return this;
     };
     that.on = function (type, method, parameters){
         var handler = {method : method,
            parameters : parameters
         };
         if(registry.hasOwnProperty(type)){
             registry[type].push(handler);
         }else{
             registry[type] = [handler];
         }
         return this;
     };
     return this;
 };
 
 /** 

    可以在任何单独的对象上调用eventuality，授予它事件处理方法。
    一个构造器函数可以从一套部件中把对象组装起来，JavaScript的弱类型在此处是一个巨大的优势，因为我们无需花费精力去了解对象在类型系统中的继承关系。

 */
 
 /**  

    数组
    
    JavaScript中的数组是一种类数组特性的对象。它把数组的下标转换成字符串，用其作为属性。它明显比一个真正的数组慢，但它使用起来更方便。

 */
 
 /** 

    数组字面量
    
    数组字面量提供了一种非常方便地创建新数组的表示法。
    数组字面量允许出现在任何表达式可以出现的地方。数组的第一个值将获取属性名为‘0’，第二个值将获取属性名‘1’，依次类推。

 */
 
 var empty = [];
 var numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
 document.writeln(empty[1])
 document.writeln(numbers[1]);
 document.writeln(empty.length);
 document.writeln(numbers.length);
 
 // 对象字面量
 var number_object = {
     '0' : "zero",
     '1' : "one",
     '2' : "two",
     '3' : "three",
     "4" : "four",
     '5' : "five",
     '6' : 'six',
     '7' : "seven",
     '8' : "eight",
     '9' : 'nine'
 };
 /**
 
    numbers和number_object都是包含10个属性的对象，并且属性有相同的名字和值。
    但是numbers继承自Array.prototype，而number_object继承自Object.prototype，所以numbers继承了大量有用的方法。同时numbers还存在一个length属性，而number_object没有。
    
    在大多数语言中，一个数组中的所有元素 都要求时相同的类型。但是JavaScript允许数组包含混合类型的值。
 
 */
 
 var misc = ['string', 98.6, true, false, null, undefined, ['nested', 'array'], {obj : true}, NaN, Infinity];
 document.writeln(misc.length);
 
 /**  

    长度
    
    每个数组都有一个length属性。和大多数其他语言不同，JavaScript数组的length属性是没有上界的。
    如果你用大于或等于当前length的数字作为下标存储一个元素，那么length值会被增大以容纳新元素，不会发生数组越界错误。
    
    length属性的值是这个数组的最大整数属性名加1.它不一定等于数组里的属性的个数。

 */
 
 var myArray = [];
 document.writeln(myArray.length);
 myArray[1001] = true;
 document.writeln(myArray.length);
 
 /**
 
    []后置下标运算符把它所含的表达式转换成一个字符串，如果该表达式有toString方法，就使用该方法的值。这个字符串被用作属性名。如果这个字符串看起来
    像一个大于等于这个数组当前的length且小于4294967295，那么这个数组的length就会被重新设置新的下标加1。
    
    你也可以直接设置length的值。设置更大的length不会给数组分配更多的空间。而把length设小将导致所有下标大于等于新的length的属性被删除。
    
 */
 numbers.length = 3;
 document.writeln(numbers);
 
 /**
 
    通过把下标指定为一个数组的当前length，可以附加一个新的元素到该数组的尾部：
 
 */
 
 numbers[numbers.length] = "4";
 document.writeln(numbers);
 /**
 
    有时用push方法可以更方便地完成同样的事情。
 
 */
 numbers.push("5");
 document.writeln(numbers);
 
 /**
 
    删除

    由于Javascript的数组其实就是对象，所以delete运算符可以用来从数组中移除元素。
    
 */
 delete numbers[4];
 document.writeln(numbers);
 /**
 
    不幸的是，那样会在数组中留下一个空间。这是因为排在被删除元素之后的元素保留着它们最初的属性。而你通常想要的是递减后面每个元素的属性。
    幸运的是，JavaScript数组有一个splice方法。他可以对数组进行处理，删除一些元素并将它们替换为其他的元素。第一个参数是数组中的序号，第二个参数是要删除的元素
    个数。任何额外的参数会在序号那个点的位置被插入到数组中：
 
 */
 numbers.splice(3, 2);
 document.writeln(numbers);
 /**
 
    需要注意的是被删除属性后面的每个属性必须移除，并且以一个新的键值重新插入，这对于大型数组来说可能效率不高。
 
 */
 /**
 
    枚举
    
    因为Javascript的数组是对象，所以for in语句可以用来遍历一个数组的所有属性。遗憾的是，for in语句无法保证属性的顺序，而大多数要遍历数组的场合都期望按照阿拉伯数组顺序
    产生元素。此外，从原型链中得到意外属性的问题依旧存在。
    
    此时可以使用常规的for语句来代替。
 
 */
 var f;
 for(i = 0; i < numbers.length; i++){
   document.writeln(numbers[i]);  
 };
 
 /**
 
    容易混淆的地方
    
    在JavaScript中一个常见的错误就是在该使用数组的地方使用对象；在该使用对象的地方使用数组。其实规则很简单，当属性名是小而连续的整数时，
    你应该使用数组；否则使用对象。
    
    Javascript本身对于数组和对象的区别是混乱的。typeof运算符报告数组的类型是‘object’，这没有任何意义。
    
    我们可以定义自己的is_array函数来弥补这个缺陷：
 
 */
 
 var is_array = function (value){
   return value && typeof value === 'object' && value.constructor == Array;  
 };
 // 这种做法在识别不同的窗口或帧里构造的数组时会失败，有一个更好的方式去判断一个对象是否是数组。
 var isArray = function (){
     return Object.prototype.toString.apply(value) === '[object Array]';
 };
 
 /**
 
    方法

    JavaScript提供了一套数组可用的方法。这些方法是被储存在Array.prototype中的函数中。
    
    同理，可以对数组进行扩展。
 
 */
 
 Array.method('reduce', function (f, value){
     var i;
     for(i = 0; i < this.length; i++){
         value = f(this[i], value);
     }
     return value;
 });
 
 /**
 
    通过给Array.prototype扩充一个函数，每个数组都继承了这个方法。
 
 */
 
 var data = [4, 6, 8, 10];
 var add = function (a, b){
   return a + b;  
 };
 document.writeln(data.reduce(add, 0));
 var mult = function (a, b){
   return a * b;  
 };
 document.writeln(data.reduce(mult, 1));
 
 /**
 
    因为数组就是对象，所以我们可以直接给一个单独的数组添加方法：
 
 */
 data.total = function (){
   return this.reduce(add, 0);  
 };
 data.push(100);
 document.writeln(data.total());
 
 /**
 
    因为字符串‘total’不是整数，所以给数组增加一个‘total’属性不会改变length。
 
 */
 
 Array.dim = function (length, initial){
   var a = [];
    for(i = 0; i < length; i++){
        a[i] = initial;
    }
    return a;
 };
 var dimTest = Array.dim(10, 11);
 document.writeln(dimTest);
 /**
 
    JavaScript没有多维数组，但像大多数类C语言一样，它支持元素作为数组的数组。
 
 */
 var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
 ];
 document.writeln(matrix[2][1]);
 
 /**
 
    正则表达式
    
    JavaScript有很多特性都是借鉴其他语言。语法借鉴自Java，函数借鉴自Schema，原型继承借鉴自Self。而正则表达式则借鉴自Perl。
    
    正则表达式是一门简单语言的语法规范。它应用在一些方法中，对字符串中的信息进行查找、替换和提取操作。可处理正则表达式的方法有regexp.exec、regexp.test、string.match、string.replace、string.search和string.split。
    
    通常来说，JavaScript中的正则表达式相较于等效的字符串处理有着明显的性能优势。
    
    正则表达式起源于对形式语言的数学研究。
    
    在JavaScript中，正则表达式的语法是对Perl版本的改进和发展，它非常接近于贝尔实验室最初提出的构想。
    
    正则表达式的书写规则出奇的复杂，不仅难以阅读，而且修改时充满危险。
    
    在JavaScript中，正则表达式必须写在一行中。
 
 */
 
 var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = "http://www.ora.com:80/goodparts?q#fragment";
var result = parse_url.exec(url);
var names = ['url', 'schema', "slash", 'host', 'port', 'path', 'query', 'hash'];
for(i = 0; i < names.length; i++){
    document.writeln(names[i] + ':' + result[i]); 
}
/**

    以下的内容忽略正则表达式的内容，因为其语法比较复杂，不容易记忆，使用时进行查阅即可

*/

/**

    方法

    Array的concat(item...)产生一个新的数组，它包含一份Array的浅复制并把一个或多个参数item附加在其后。如果参数item是一个数组，那么它的每个元素会被分别添加。
    
    它的功能类似Array的push(item...)方法。
*/
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
document.writeln(c);
/**

    Array的join方法把Array构造成一个字符串。它先把Array中的每个元素构成一个字符串，接着用一个separator分隔符把他们连接在一起。
    
    默认的separator是逗号','。要想做到无间隔的连接，可以使用空字符串作为separator。
    
    如果你想把大量的字符串片段组装成一个字符串，把这些片段放到一个数组中并用join方法连接起来通常比用+元素运算符连接这些片段要快。

*/
var d = ['a', 'b', 'c'];
d.push('d');
var e = d.join('');
document.writeln(e);
/**

    Array的pop方法使得数组可以像堆栈一样工作。pop方法移除Array中的最后一个元素并返回该元素。如果数组是empty，它会返回undefined。

*/
 var f = ['a', 'b', 'c', 'aaaaaaaaddddddd'];
 document.writeln(f.pop());
 /**
 
    POP可以像这样实现：
    Array.method('pop', function (){
       return this.splice(this.length - 1, 1)[0]; 
    });
 
 */
 /**
 
    Array的push(item...)把一个或多个参数item加到一个数组的尾部。和concat方法不同的是，它会修改Array，如果参数item是一个数组，它会把参数数组作为单个元素整个添加到数组中，并返回这个数组的新长度值。
 
 */