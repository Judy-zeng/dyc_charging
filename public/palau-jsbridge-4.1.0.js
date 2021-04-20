'use strict'

var PalauAPI = {};
var SZJSBridge;
(function(){  
  var uniqueId = 1;
  var responseCallbacks = {};
  var isIOS;
  var userAgent = navigator.userAgent
  if (userAgent.indexOf('Platform') !== -1 && userAgent.indexOf('Palau') !== -1) {
    if (window.webkit) {
      isIOS = true
      window.SZJSBridge = true
    }
  }
  /**
   * 问吧、活动需要的参数
   */
  var config = {};
  /**
   * 回调参数方法
   */
  PalauAPI._handleMessageFromObjC = function (callbackId, responseData) {
      var responseCallback = responseCallbacks[callbackId];
      responseCallback(responseData);
  },
  /**
   * JsBridge
   *
   * @version 4.1.0
   * @author zhongqiang
   */

  /**
   * 用户相关
   * @namespace user
   */
  PalauAPI.user = {
    /**
     * 登陆
     * @memberof user
     * @function login
     * @example
     * // 登陆
     * function cb() {
     *  // @todo
     * };
     *
     * PalauAPI.user.login(cb);
     */
    login: function (responseCallback) {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      if (!isIOS) {
        SZJSBridge.login(callbackId);
      } else {
        window.webkit.messageHandlers.login.postMessage(callbackId);
      }
    },

    /**
     * 获取用户信息
     * @memberof user
     * @function userInfo
     * @returns nickName 用户昵称
     * @returns uid 用户id
     * @returns phoneNumber 用户手机号
     * @returns access_token token
     * @returns avatar 用户头像
     * @example
     * // 获取用户信息
     * PalauAPI.user.userInfo();
     */

    userInfo: function () {
      if (!isIOS) {
        var userInfo = SZJSBridge.getUserInfo();
        return JSON.parse(userInfo);
      } else {
        var param = {
          type: 'palau_callback',
          methodname: 'getUserInfo'
        };
        var result = prompt(JSON.stringify(param));
        return JSON.parse(result);
      }
    },
    /**
     * @memberof user
     * @function refreshToken
     * @example
     * // 刷新token
     * PalauAPI.user.refreshToken();
     */
    refreshToken: function (responseCallback) {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      if (!isIOS) {
        SZJSBridge.refreshToken(callbackId);
      } else {
        window.webkit.messageHandlers.refreshToken.postMessage(callbackId);
      }
    }
  }

  /**
   * 跳转
   * @function dispatch
   * @param {string}      arg1 跳转地址
   * @param {function}    arg2 回调函数
   * @example
   * // 跳转地址
   * var url = '**';
   * // 回调函数
   * var cb = function () {
   *   todo
   * }
   *
   * PalauAPI.dispatch(url, cb);
   */

  PalauAPI.dispatch = function (arg1, arg2) {
    var count = arguments.length;
    switch (count) {
      case 1: {
        if (!isIOS) {
          SZJSBridge.dispatch(arguments[0]);
        } else {
          window.webkit.messageHandlers.dispatch.postMessage(arguments[0]);
        }
      }
      break;
    case 2: {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = arguments[1];
      if (!isIOS) {
        SZJSBridge.dispatchWithCallback(arguments[0], callbackId);
      } else {
        window.webkit.messageHandlers.dispatchWithCallback.postMessage({
          url: arguments[0],
          callback: callbackId
        });
      }
    }
    break;
    }
  }

  /**
   * 返回上一页
   * @function back
   * @example
   * PalauAPI.back();
   */

  PalauAPI.back = function () {
    if (!isIOS) {
      SZJSBridge.pop();
    } else {
      window.webkit.messageHandlers.pop.postMessage(null);
    }
  }
  /**
   * 活动、问吧方法
   */
  var hasOwn = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;
  function _isPlainObject(obj) {
    if (!obj || toStr.call(obj) !== '[object Object]') {
      return false;
    }

    var hasOwnConstructor = hasOwn.call(obj, 'constructor');
    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
      return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for (key in obj) { /**/ }

    return typeof key === 'undefined' || hasOwn.call(obj, key);
  }
  // 对象合并
  function _extend() {
    var options, name, src, copy, copyIsArray, clone;
    var target = arguments[0];
    var i = 1;
    var length = arguments.length;
    var deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    } else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
      target = {};
    }

    for (; i < length; ++i) {
      options = arguments[i];
      // Only deal with non-null/undefined values
      if (options == null) continue;

      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) continue;

        // Recurse if we're merging plain objects
        if (deep && copy && _isPlainObject(copy)) {
          clone = src && _isPlainObject(src) ? src : {};
          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

        // Don't bring in undefined values
        } else if (typeof copy !== 'undefined') {
          target[name] = copy;
        }
      }
    }

    // Return the modified object
    return target;
  }
  /**
   * 设置conf
   * 活动、问吧中有调用
   * @param {Object} conf 
   */
  PalauAPI.setConfig = function(conf) {
    config = _extend(true, {}, config, conf);
  }

  /**
   * view暂停
   * @function viewPause
   * @param {function}    arg 回调函数
   * @example
   * // 回调函数
   * var cb = function () {
   *   todo
   * }
   *
   * PalauAPI.viewPause(cb);
   */

  PalauAPI.viewPause = function (callbackId) {
    var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
    responseCallbacks[callbackId] = responseCallback;
    if (!isIOS) {
      try {
        SZJSBridge.viewPause(callbackId)
      } catch (error) {
        alert('版本过低')
      }
    } else {
      try {
        window.webkit.messageHandlers.viewPause.postMessage(callbackId);
      } catch (error) {
        alert('版本过低')
      }
    }
  }

  /**
   * view返回
   * @function viewResume
   * @param {function}    arg 回调函数
   * @example
   * // 回调函数
   * var cb = function () {
   *   todo
   * }
   *
   * PalauAPI.viewResume(cb);
   */

    PalauAPI.viewResume = function() {
      if (!isIOS) {
        try {
          SZJSBridge.viewResume(cb);
        } catch (error) {
          alert('版本过低')
        }
      } else {
        try {
          window.webkit.messageHandlers.viewResume.postMessage(cb);
        } catch (error) {
          alert('版本过低')
        }
      }
    }

  /**
   * 设备相关
   * @namespace device
   */

  PalauAPI.device = {

    /**
     * 获取设备信息
     *
     * @memberof device
     * @function deviceInfo
     * @returns deviceId 设备唯一id
     * @returns deviceFactory 设备信息
     * @returns deviceName 设备型号
     * @returns platform 设备平台
     * @returns osVersion 系统版本号
     * @returns connectionType 网络类型
     * @returns scrnWidth 屏幕分辨率宽(px)
     * @returns scrnHeight 屏幕分辨率高(px)
     * @example
     * PalauAPI.device.deviceInfo();
     */
    deviceInfo: function () {
      if (!isIOS) {
        var deviceInfo = SZJSBridge.getDeviceInfo();
        return JSON.parse(deviceInfo);
      } else {
        var param = {
          type: 'palau_callback',
          methodname: 'getDeviceInfo'
        };
        var result = prompt(JSON.stringify(param));
        return JSON.parse(result);
      }
    },

    /**
     * 获取设备标识
     *
     * @memberof device
     * @function device
     * @returns {String} 设备id
     * @example
     * PalauAPI.device.device();
     */
    deviceId: function () {
      if (!isIOS) {
        return PalauAPI.device.deviceInfo().deviceId;
      } else {
        var param = {
          type: 'palau_callback',
          methodname: 'getDeviceInfo'
        };
        var result = prompt(JSON.stringify(param));
        var obj = JSON.parse(result);
        return obj.deviceId;
      }
    },

    /**
     * 拨打电话
     *
     * @memberof device
     * @function dial
     * @param  {String | Number}  num 电话号码
     * @example
     * var num = '138********';   //电话号码
     * PalauAPI.device.dial(num);
     */
    dial: function (num) {
      if (!isIOS) {
        SZJSBridge.dial(num);
      } else {
        window.webkit.messageHandlers.dial.postMessage(num);
      }
    }
  }

  /**
   * 分享
   * @function share
   * @param {string}  platform 分享平台('all'为全部平台)
   * @param {string}  title    分享标题
   * @param {string}  content  分享内容
   * @param {string}  url      分享链接
   * @param {string}  image    分享图片
   * @param {string}  responseCallback    回调函数
   * @example
   * var platform = 'all';
   * var title = 'title';
   * var content = 'content';
   * var url = 'url';
   * var image = 'image';
   * var cb = function() {
   *  //@todo
   * };
   *
   * PalauAPI.share('all', title, content, url, image, cb);
   */

  PalauAPI.share = function (platform, title, content, url, image, responseCallback) {
    var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
    responseCallbacks[callbackId] = responseCallback;
    if (!isIOS) {
      SZJSBridge.share(platform, title, content, url, image, callbackId)
    } else {
      window.webkit.messageHandlers.share.postMessage({
        platform: platform,
        title: title,
        content: content,
        url: url,
        image: image,
        callback: callbackId
      });
    }
  }

  /**
   * webview
   * @namespace webview
   */
  PalauAPI.view = {
    /**
     * 获取字体大小
     * @memberof webview
     * @function getFontSize
     * @returns 字体大小
     * @example
     * PalauAPI.view.getFontSize();
     */
    getFontSize: function () {
      if (!isIOS) {
        return SZJSBridge.getFontSize();
      } else {
        var param = {
          type: 'palau_callback',
          methodname: 'getFontSize'
        };
        var result = prompt(JSON.stringify(param));
        // var obj = JSON.parse(result);
        return result;
      }
    },

    /**
     * 设置字体大小
     * @memberof webview
     * @function setFontSize
     * @param {string} size  字体大小（px）
     * @example
     * PalauAPI.view.setFontSize();
     */
    setFontSize: function (size) {
      if (!isIOS) {
        SZJSBridge.setFontSize(size);
      } else {
        window.webkit.messageHandlers.hideHeader.postMessage(size);
      }
    },

    /**
     * 显示原生导航栏
     * @memberof webview
     * @function showHeader
     * @example
     * PalauAPI.view.showHeader();
     */
    showHeader: function () {
      if (!isIOS) {
        SZJSBridge.showHeader();
      } else {
        window.webkit.messageHandlers.showHeader.postMessage(null);
      }
    },

    /**
     * 隐藏原生导航栏
     * @memberof webview
     * @function hideHeader
     * @example
     * PalauAPI.view.hideHeader();
     */
    hideHeader: function () {
      if (isIOS) {
        window.webkit.messageHandlers.hideHeader.postMessage(null);
      } else {
        SZJSBridge.hideHeader();
      }
    },

    /**
     * 显示loading
     *
     * @memberof webview
     * @function showLoading
     * @example
     * PalauAPI.view.showLoading();
     */
    showLoading: function () {
      if (!isIOS) {
        SZJSBridge.showLoading();
      } else {
        window.webkit.messageHandlers.showLoading.postMessage(null);
      }
    },

    /**
     * 隐藏loading
     * @memberof webview
     * @function hideLoading
     * @example
     * PalauAPI.view.hideLoading();
     */
    hideLoading: function () {
      if (!isIOS) {
        SZJSBridge.hideLoading();
      } else {
        window.webkit.messageHandlers.hideLoading.postMessage(null);
      }
    },

    /**
     * 开启缩放
     * @memberof webview
     * @function enableZoom
     * @example
     * PalauAPI.view.enableZoom();
     */
    enableZoom: function (responseCallback) {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      if (!isIOS) {
        SZJSBridge.enableZoom(callbackId);
      } else {
        window.webkit.messageHandlers.enableZoom.postMessage(callbackId);
      }
    }
  }

  /**
   * 媒体展示
   * @namespace media
   */

  PalauAPI.media = {
    /**
     * 点播
     * @memberof media
     * @function playVideo
     * @example
     * PalauAPI.media.playVideo(url);
     */
    playVideo: function (url) {
      if (!isIOS) {
        SZJSBridge.playVideo(url);
      } else {
        window.webkit.messageHandlers.playVideo.postMessage(url);
      }
    },

    /**
     * 录音
     * window.webkit新版 可以传 null 对象 字符串 数字
     * 老版传callbackId
     * @memberof media
     * @function recordAudio
     * @example
     * PalauAPI.media.recordAudio(url);
     */
    recordAudio:function(responseCallback) {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      if (!isIOS) {
        SZJSBridge.recordAudio(callbackId);
      } else {
        window.webkit.messageHandlers.recordAudio.postMessage(callbackId);
      }
    },

    /**
     * 直播
     * @memberof media
     * @function playLive
     * @example
     * PalauAPI.media.playLive(url);
     */
    playLive: function (url) {
      if (!isIOS) {
        SZJSBridge.playLive(url);
      } else {
        window.webkit.messageHandlers.playLive.postMessage(url);
      }
    },

    /**
     * 关闭播放器
     * @memberof media
     * @function closeVideo
     * @example
     * PalauAPI.media.closeVideo();
     */
    closeVideo: function () {
      if (!isIOS) {
        SZJSBridge.closeVideo();
      } else {
        window.webkit.messageHandlers.closeVideo.postMessage(null);
      }
    },

    /**
     * 播放音频
     * @memberof media
     * @function playAudio
     * @example
     * PalauAPI.media.playAudio(url);
     */
    playAudio: function (url) {
      if (!isIOS) {
        SZJSBridge.playAudio(url);
      } else {
        window.webkit.messageHandlers.playAudio.postMessage(url);
      }
    },

    /**
     * 播放本地音频
     * @memberof media
     * @function playLocalAudio
     * @example
     * PalauAPI.media.playLocalAudio(dir, filaName);
     */
    playLocalAudio: function (dir, filaName) {
      if (!isIOS) {
        SZJSBridge.playLocalAudio(dir, filaName);
      } else {
        window.webkit.messageHandlers.playLocalAudio.postMessage({
          directory: dir,
          filename: fileName
        });
      }
    },

    /**
     * 上传视频
     * @memberof media
     * @function uploadVideos
     * @example
     * PalauAPI.media.uploadVideos(maxTime, index);
     */
    uploadVideos: function (maxTime, responseCallback) {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
        responseCallbacks[callbackId] = responseCallback;
      if (!isIOS) {
        SZJSBridge.uploadVideos(maxTime, callbackId);
      } else {
        window.webkit.messageHandlers.uploadVideos.postMessage({
          time: maxTime,
          callback: callbackId
        });
      }
    },

    /**
     * 上传图片
     * @memberof media
     * @function uploadImages
     * @example
     * PalauAPI.media.uploadImages(maxNumber, responseCallback);
     */
    uploadImages: function (maxNumber, responseCallback) {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback; 
      if (!isIOS) {  
        SZJSBridge.uploadImages(maxNumber, callbackId);
      } else {
        window.webkit.messageHandlers.uploadImages.postMessage({
          count: maxNumber,
          callback: callbackId
        });
      }
    },

    /**
     * 浏览图片
     * @memberof media
     * @function viewImages
     * @example
     * PalauAPI.media.viewImages(url, index);
     */
    viewImages: function (url, index) {
      if (!isIOS) {
        SZJSBridge.viewImages(url, index);
      } else {
        window.webkit.messageHandlers.viewImages.postMessage({
          imageUrl: url,
          imageIndex: index
        });
      }
    }
  }

  /**
   * 浏览器
   * @namespace browser
   */

  PalauAPI.browser = {

    /**
     * 获取userAgent
     * 
     * @memberof browser
     * @function userAgent
     * @returns {String} userAgent
     * @example PalauAPI.browser.userAgent()
     */
    userAgent: function() {
      var ua = navigator.userAgent;
      return ua
    },

    /**
     * 环境检测
     * 
     * @memberof browser
     * @function browserEnv
     * @returns {String} 浏览器环境 （wechat, qq, weibo, mobild, windows, mac）
     * @example PalauAPI.browser.browserEnv()
     */
    browserEnv: function() {
      var ua = userAgent.toLowerCase();
      var env;
      if (ua.match(/mobile/i)=="mobile") {
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
          env = 'WeiChat'
        } else if (ua.match(/weibo/i) == "weibo") {
          env = 'Weibo'
        } else if (ua.match(/qq/i) == "qq") {
          env = 'QQ'
        } else {
          env = 'Mobile'
        }
      } else {
        if (ua.match(/windows/i)=="windows") {
          env =  'Windows'
        } else if (ua.match(/mac os/i)=="mac os") {
          env = 'Mac'
        }
      }
      return env;
    },
  }

  /**
   * 支付
   * @function pay
   * @param {string}  paySn paysn
   * @param {string}  responseCallback    回调函数
   * @example
   * var paySN = '12312421312';
   * var cb = function() {
   *  //@todo
   * };
   * PalauAPI.pay(paySN, cb);
   * 
   */
  PalauAPI.pay = function () {
    var count = arguments.length;
    switch (count) {
      case 2: {
        //新版两参数( paySN, responseCallback)
        var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
        responseCallbacks[callbackId] = arguments[1];
        SZJSBridge.pay("all", arguments[0], "0", callbackId);
      }
      break;
    case 4: {
      // 旧版四参数(platform, orderNo, uid, responseCallback)
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = arguments[3];
      SZJSBridge.pay(arguments[0], arguments[1], arguments[2], callbackId);
    }
    break;
    }

  }

  /**
   * 定位
   * @namespace location
   *
   */
  PalauAPI.location = {
    /**
     * 获取定位
     * @memberof location
     * @function requestLocation
     * @param {string}  responseCallback    回调函数
     * @example
     * var responseCallback = function() {
     *  //@todo
     * };
     *
     * PalauAPI.location.requestLocation(responseCallback);
     */
    requestLocation: function (responseCallback) {
      var callbackId = 'palau_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = function (response) {
        responseCallback(JSON.parse(response));
      };
      if (!isIOS) {
        SZJSBridge.requestLocation(callbackId);
      } else {
        window.webkit.messageHandlers.requestLocation.postMessage(callbackId);
      }
    }
  }

  /**
   * @function navigate
   * @param {string}  type      baidu/gaode
   * @param {string}  address   地址
   * @param {string}  lng       经度
   * @param {string}  lat       纬度 
   * @example
   * PalauAPI.navigate('baidu', '', '116', '39');
   */
  PalauAPI.navigate = function(type, address, lng, lat) {
    if (!isIOS) {
      SZJSBridge.navigate(type, address, lng, lat);
    } else {
      window.webkit.messageHandlers.requestLocation.postMessage(type, address, lng, lat);
    }
  }
})()