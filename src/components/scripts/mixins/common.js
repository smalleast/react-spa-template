import AppBase, {$app, $api, $qiniu} from 'components/scripts/index';
import Config from '../../../components/services/config';
export default class {
  toCoverImage() {
    const {images} = AppBase.$.memory;
    return images && $qiniu.toAbsImg($app.toArray(images)[0]);
  }

  toQiniuImages(inImageStr) {
    if (!!inImageStr) {
      return $app.toArray(inImageStr).map(imageItem => $qiniu.toAbsImg(imageItem));
    } else {
      return [];
    }
  }

  initFocus(self, inBool) {
    self.state = {
      self: self,
      focus: inBool,
      true: '已关注',
      false: '+关注'
    }
  }

  onFocus(targetMemberId, self) {
    const {focus} = self.state;
    if (!!focus) {
      $api.cancelFocus_100({targetMemberId: targetMemberId}).then(result => {
        self.setState({focus: false});
      });
    } else {
      $api.addFocus_100({targetMemberId: targetMemberId}).then(result => {
        self.setState({focus: true});
      });
    }
  }

  initFavorite(self, inBool) {
    self.state = {
      self: self,
      favorite: inBool,
      true: '取消',
      false: '收藏'
    }
  }

  onFavorite(lotId, self) {
    this.preAction(() => {
      const {favorite} = self.state;
      if (!!favorite) {
        $api.deleteMyLotFavorite_100({lotId}).then(result => {
          AppBase.toast('已取消收藏');
          self.setState({favorite: false});
        });
      } else {
        $api.addMyLotFavorite_100({lotId}).then(result => {
          AppBase.toast('已收藏');
          self.setState({favorite: true});
        });
      }
    });
  }

  preAction(callback, checkPhone) {
    callback && callback();
  }

  _onQrCode() {
    AppBase.$wechat.previewImage(`${Config.IMG_URL}/follow-qr-code_20170504.png`);
  }

  sayHi() {
    console.log('say hi!');
  }
}
