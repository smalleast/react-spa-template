(function () {
  const Utils = {
    downloadLink: function () {
      const {type, id} = nx.hashlize();
      let btn1 = document.querySelector("a.btnOpenApp");
      let btn2 = document.querySelector("a.btnOpenApp2");

      let options = [];
      if (typeof btn1 === 'object') {
        options.push({
          mlink: 'https://aytzol.mlinks.cc/AdKh',
          button: btn1,
          params: {
            id: id,
            type: type
          }
        })
      }
      if (typeof btn2 === 'object') {
        options.push({
          mlink: 'https://aytzol.mlinks.cc/AdKh',
          button: btn2,
          params: {
            id: id,
            type: type
          }
        })
      }
      if (options.length > 0) {
        new Mlink(options);
      }
    },
    download: function () {
      let IOS_APP = 'http://itunes.apple.com/cn/app/da-cang/id1080860264?ls=1&mt=8';
      let Android_APP = 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.dcpai.auction';
      let PC_URL = 'http://www.zhulogic.com/';

      function init() {
        if (Utils.browser.env.weixin) {
          window.location.href = Android_APP;
        } else if (Utils.browser.env.ios) {
          window.location.href = IOS_APP;
        } else if (Utils.browser.env.android) {
          window.location.href = Android_APP;
        } else {
          window.location.href = PC_URL;
        }
      }

      init();
    },
    browser: {
      env: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: u.match(/\sQQ/i) == " qq", //是否QQ
          ios8: u.indexOf('OS 8') > -1//判断是否ios8
        };
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    getLocationSearch: function () {
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
          // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
          query_string[pair[0]] = arr;
          // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }

      return query_string;
    },
  };

  module.exports = Utils;
}());
