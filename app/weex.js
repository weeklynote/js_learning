var weex = require('weex-html5')；
function weexInit() {
  function getUrlParam (key) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)')
    var match = location.search.match(reg)
    return match && match[1]
  }

  var loader = getUrlParam('loader') || 'xhr'
  var page = getUrlParam('page')

  // 需要指定一个jsonp回调函数名称，如果没有则用默认值'weexJsonpCallback'
  var JSONP_CALLBACK_NAME = 'weexJsonpCallback'

  window.weex.init({
    jsonpCallback: JSONP_CALLBACK_NAME,
    appId: location.href,
    source: page,
    loader: loader,
    rootId: 'weex'
  })
}
weexInit()