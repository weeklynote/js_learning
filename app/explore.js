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
