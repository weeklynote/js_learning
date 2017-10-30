'use strict';
// window对象，全局作用域以及表示浏览器窗口
// 浏览器网页的净宽高
console.log(window.innerWidth + 'X' + window.innerHeight);
// 浏览器窗口的整个宽高
console.log(window.outerWidth + "X" + window.outerHeight);

// navigator对象浏览器的信息
console.log(navigator.appName);
console.log(navigator.appVersion);
console.log(navigator.language);
console.log(navigator.platform);
console.log(navigator.userAgent);
// navigator的信息很容易被用户修改，所以不能用来判断不同的浏览器

// screen屏幕信息
console.log(screen.width);
console.log(screen.height);
console.log(screen.colorDepth);

// location页面url信息
//console.log(location.protocol);
//console.log(location.host);
//console.log(location.port);
//console.log(location.pathname);
//console.log(location.search);
//console.log(location.hash);
// 要加载一个新页面，可以调用location.assign()。如果要重新加载当前页面，调用location.reload()方法非常方便

// document表示当前页面
// document的title属性是从HTML文档中的<title>xxx</title>读取的，但是可以动态改变
document.title = "docoment title";
// 注意js代码的加载与元素定义的顺序，js要想从代码获取元素，必须要放置在元素之后
var menu = document.getElementById('drink-menu');
var drinks = document.getElementsByTagName('dt');
console.log(drinks.length);
var i;
for (i = 0; i < drinks.length; i++) {
    console.log(drinks[i].innerHTML + ',');
}
// 当前页面的cookie
console.log(document.cookie);

// 由于JavaScript能读取到页面的Cookie，而用户的登录信息通常也存在Cookie中，这就造成了巨大的安全隐患，这是因为在HTML页面中引入第三方的JavaScript代码是允许的：
/**
<html>
    <head>
        <script src="http://www.foo.com/jquery.js"></script>
    </head>
    ...
</html>
 /
 /** 
如果引入的第三方的JavaScript中存在恶意代码，则www.foo.com网站将直接获取到www.example.com网站的用户登录信息。
为了解决这个问题，服务器在设置Cookie时可以使用httpOnly，设定了httpOnly的Cookie将不能被JavaScript读取。这个行为由浏览器实现，主流浏览器均支持httpOnly选项，IE从IE6 SP1开始支持。
为了确保安全，服务器端在设置Cookie时，应该始终坚持使用httpOnly。
 /
 
 // history对象
 // JavaScript可以调用history对象的back()或forward ()，相当于用户点击了浏览器的“后退”或“前进”按钮(不推荐使用)

  */
 // 操作DOM
 // 返回ID为'test'的节点：
//var test = document.getElementById('test');

// 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
//var trs = document.getElementById('test-table').getElementsByTagName('tr');

// 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
//var reds = document.getElementById('test-div').getElementsByClassName('red');

// 获取节点test下的所有直属子节点:
//var cs = test.children;

// 获取节点test下第一个、最后一个子节点：
//var first = test.firstElementChild;
//var last = test.lastElementChild;
//////////////////////////////////////////////////////
 var js = document.getElementById("test-p");
 console.log(js.innerHTML);
 var arr = document.getElementsByClassName("c-red c-green")[0].getElementsByTagName("p");
 for(i = 0; i < arr.length; i++){
     console.log(arr[i].innerHTML);
 }
 var haskell = document.getElementsByClassName("c-green")[1].lastElementChild;
 console.log(haskell.innerHTML);
 /////////////////////////////////////////////////////
 // 此外还可以使用querySelector()和querySelectorAll()
 // 通过querySelector获取ID为q1的节点：
//var q1 = document.querySelector('#q1');

// 通过querySelectorAll获取q1节点内的符合条件的所有节点：
//var ps = q1.querySelectorAll('div.highlighted > p');

// 更新Dom
var title = document.getElementById("title_id");
title.innerHTML = "更新Dom";
// title.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
//title.innerText = '<script>alert("Hi_innerText")</script>';  // 不返回隐藏元素的文本
//title.textContent = '<script>alert("Hi_textContent")</script>';  // 返回所有文本
title.style.color = '#ffee00';
title.style.fontSize = '20px';
title.style.paddingTop = '2em';
// 插入Dom
// 如果这个DOM节点是空的，例如，<div></div>，那么，直接使用innerHTML = '<span>child</span>'就可以修改DOM节点的内容，相当于“插入”了新的DOM节点。
// 如果这个DOM节点不是空的，那就不能这么做，因为innerHTML会直接替换掉原来的所有子节点。
// 有两个办法可以插入新的节点。一个是使用appendChild，把一个子节点添加到父节点的最后一个子节点。
/**
<p id="js">JavaScript</p>
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
把<p id="js">JavaScript</p>添加到<div id="list">的最后一项：

var
    js = document.getElementById('js'),
    list = document.getElementById('list');
list.appendChild(js);
*/
var js = document.getElementById('js');
var listt = document.getElementById('list');
// 节点首先会从原先的位置删除，再插入到新的位置
listt.appendChild(js);
// 动态创建一个
var haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'E';
// 在最后位置添加一个子节点
list.appendChild(haskell);
var
    ref = document.getElementById('python'),
    nodef = document.createElement('p');
haskell.id = 'node_f';
haskell.innerText = 'F';
list.insertBefore(haskell, ref);
// 循环一个父节点的所有子节点，可以通过迭代children属性
var
    i, c;
for (i = 0; i < list.children.length; i++) {
    c = list.children[i]; // 拿到第i个子节点
}
// 删除Dom
var self = document.getElementById('to_be_removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
// 遍历一个父节点的子节点并进行删除操作时，要注意，children属性是一个只读属性，并且它在子节点变化时会实时更新。

// 操作表单
var input = document.getElementById("email");
// 用户输入的值
console.log(input.value);
input.value = '12345@example.com';
var mon = document.getElementById('monday');
var tue = document.getElementById('tuesday');
console.log(mon.value); // '1'
console.log(tue.value); // '2'
console.log(mon.checked); // true或者false
console.log(tue.checked); // true或者false
// 提交表单
