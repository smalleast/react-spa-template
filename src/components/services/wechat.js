/**
 * Created by dcpai on 2017/7/17.
 */
import Api from './api';
import Config from './config';
import Wxsdk from 'react-wxsdk';
import {Toast} from 'antd-mobile';

export default class Wechat {
  static sign(showMenu) {
    Api.weChat('get', {url: window.location.href.split('#')[0]}, 'js_api_config').then((resp) => {
      Wxsdk.config(nx.mix(resp.data, {debug: false}));
    }, function (error) {
      // alert('error:' + nx.stringify(error));
    });
  }


  static settingShare() {
    Wxsdk.wx.ready(() => {
      ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        .forEach((shareItem) => {
          Wxsdk.wx[shareItem]({
            title: '逻辑分享家',
            imgUrl: 'http://zhulogic-formal.oss-cn-hangzhou.aliyuncs.com/market_icon/icon%20copy.png',
            link: window.location.href.split('#')[0].replace('count','sharecount'),
            desc: '软装定制需求一键分享,收益大不同',
            success: function () {
              //已分享
            },
            cancel: function (res) {
              Toast.fail('已取消');
            },
            fail: function (res) {
              Toast.fail('分享失败');
            }
          })
        });
    });
  }

  static previewImage(inCurrent, inItems) {
    const current = Config.IMG_SERVER + '/' + (nx.isNumber(inCurrent) ? inItems[inCurrent] : inCurrent);
    const items = inItems || [current];
    Wxsdk.previewImage({
      current: current,
      urls: Wechat.isAbsolutePath(items)
    });
  }

  static isAbsolutePath(inItems) {
    return inItems.map((item, index) => {
      return Config.IMG_SERVER + '/' + item;
    })
  }

  static updateTitle(title) {
    Wxsdk.updateTitle(title);
  }

  static wxResToUrls(inRes) {
    return inRes.map((item) => {
      return item.localId
    });
  }

  static toImageUrl(inUrl) {
    if (!nx.isString(inUrl)) {
      return inUrl.localId;
    }
    return inUrl;
  }

  static chooseToUpload(inChooseOptions, inUploadOptions) {
    return Wxsdk.syncChooseImageToUpload(inChooseOptions, inUploadOptions);
  }

  static chooseImages(inChooseOptions) {
    return Wxsdk.syncChooseImage(inChooseOptions);
  }

  static uploadImage(localId) {
    return Wxsdk.syncUploadImage({localId: localId});
  }

  static uploadImages(localIds) {
    return Wxsdk.syncUploadImages(localIds, {isShowProgressTips: 0});
  }

  static downloadImage(serverId) {
    return Wxsdk.syncDownloadImage({serverId: serverId, isShowProgressTips: 1});
  }

  static getImageData(localId) {
    return Wxsdk.syncGetLocalImageData({localId: localId});
  }
}
